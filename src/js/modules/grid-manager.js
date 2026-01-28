// Grid Manager Module
// Handles the TV guide grid generation, scrolling, and channel row management

import { TV_GUIDE_CONFIG } from './config.js';

export class GridManager {
    constructor(programmingManager) {
        this.programmingManager = programmingManager;
        this.channelData = [];
        this.currentFocusIndex = 0;
        this.focusInterval = null;
    }

    async loadChannelData() {
        try {
            console.log('Loading channel data...');
            // Load data from JSON file
            const response = await fetch('src/data/channels.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (!data.channels || !Array.isArray(data.channels) || data.channels.length === 0) {
                throw new Error('Invalid or empty channel data');
            }
            
            this.channelData = data.channels;
            console.log('Loaded', this.channelData.length, 'channels from JSON');
            
            // Update programs with current time context
            this.updateProgramTimes();
            this.populateGrid();
        } catch (error) {
            console.warn('Failed to load channels.json, using generated data:', error);
            // Fallback to generated data
            try {
                this.channelData = this.programmingManager.generateChannelData();
                console.log('Using fallback generated data with', this.channelData.length, 'channels');
                this.populateGrid();
            } catch (fallbackError) {
                console.error('Failed to generate fallback data:', fallbackError);
                // Last resort - create minimal data to prevent empty grid
                this.createMinimalChannelData();
            }
        }
    }

    createMinimalChannelData() {
        console.log('Creating minimal channel data as last resort...');
        this.channelData = [
            {
                number: 2,
                call: "WMAR",
                network: "ABC",
                category: "broadcast",
                programs: [
                    { title: "Programming", startTime: "8:00 PM", duration: 30, category: "entertainment" },
                    { title: "News", startTime: "8:30 PM", duration: 30, category: "news" },
                    { title: "Show", startTime: "9:00 PM", duration: 30, category: "entertainment" }
                ]
            },
            {
                number: 4,
                call: "WJZ",
                network: "CBS", 
                category: "broadcast",
                programs: [
                    { title: "Evening News", startTime: "8:00 PM", duration: 30, category: "news" },
                    { title: "Prime Time", startTime: "8:30 PM", duration: 30, category: "entertainment" },
                    { title: "Late Show", startTime: "9:00 PM", duration: 30, category: "talk" }
                ]
            }
        ];
        this.populateGrid();
    }

    updateProgramTimes() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        
        // Calculate the current 30-minute block
        const baseSlot = Math.floor(currentMinutes / 30);
        
        this.channelData.forEach(channel => {
            channel.programs.forEach((program, index) => {
                // Calculate new start time for each program slot
                const slotOffset = index * 30; // 30 minutes apart
                const totalMinutes = (currentHour * 60) + (baseSlot * 30) + slotOffset;
                const programHour = Math.floor(totalMinutes / 60) % 24;
                const programMinutes = totalMinutes % 60;
                
                // Format time as 12-hour format
                const hour12 = programHour > 12 ? programHour - 12 : programHour === 0 ? 12 : programHour;
                const ampm = programHour >= 12 ? 'PM' : 'AM';
                const minuteStr = programMinutes.toString().padStart(2, '0');
                
                program.startTime = `${hour12}:${minuteStr} ${ampm}`;
                program.slotIndex = index;
            });
        });
    }

    populateGrid() {
        const gridContent = document.getElementById('gridContent');
        if (!gridContent) {
            console.error('Grid content element not found');
            return;
        }

        // Store current content as backup before clearing
        const currentContent = gridContent.innerHTML;
        
        try {
            console.log('Populating grid with', this.channelData.length, 'channels');
            gridContent.innerHTML = '';

            // Create enough cycles for seamless scrolling
            // We need enough content so that when animation loops, it appears continuous
            for (let cycle = 0; cycle < 6; cycle++) {
                // Add logo row before each cycle
                const logoRow = this.createLogoRow();
                gridContent.appendChild(logoRow);
                
                this.channelData.forEach((channel, index) => {
                    const row = this.createChannelRow(channel, index);
                    gridContent.appendChild(row);
                });
            }
            
            console.log('Grid populated successfully');
            
        } catch (error) {
            console.error('Error populating grid:', error);
            // Restore previous content if population fails
            gridContent.innerHTML = currentContent;
        }
    }

    createChannelRow(channel, index) {
        const row = document.createElement('div');
        row.className = 'grid-row';
        
        // Add category-based styling based on channel type and program content
        if (channel.category === 'premium' || 
            (channel.programs[0] && channel.programs[0].category === 'movie')) {
            row.classList.add('premium-row');
            row.classList.add('movie-row');
        } else if (channel.programs[0] && channel.programs[0].category === 'sports') {
            row.classList.add('sports-row');
        } else if (channel.programs[0] && channel.programs[0].category === 'news') {
            row.classList.add('news-row');
        } else if (channel.programs[0] && channel.programs[0].category === 'ppv') {
            row.classList.add('ppv-row');
        }

        // Channel info column
        const channelInfo = document.createElement('div');
        channelInfo.className = 'channel-info';
        channelInfo.innerHTML = `
            <div class="channel-number">${channel.number}</div>
            <div class="channel-call">${channel.call}</div>
        `;

        row.appendChild(channelInfo);

        // Create exactly 3 time slot containers
        const totalSlots = TV_GUIDE_CONFIG.VISIBLE_TIME_SLOTS;
        const slotContainers = [];
        
        for (let i = 0; i < totalSlots; i++) {
            const slotContainer = document.createElement('div');
            slotContainer.className = 'time-slot-container';
            slotContainer.style.flex = '1';
            slotContainer.style.position = 'relative';
            slotContainers.push(slotContainer);
            row.appendChild(slotContainer);
        }

        // Fill the slots with programs, handling arrow indicators
        const processedSlots = new Set();
        
        for (let programIndex = 0; programIndex < channel.programs.length; programIndex++) {
            const program = channel.programs[programIndex];
            const startSlot = Math.max(0, program.slotIndex);
            
            // Skip if this slot is already processed
            if (processedSlots.has(startSlot)) {
                continue;
            }
            
            const cell = this.createProgramCell(program);
            cell.style.position = 'absolute';
            cell.style.top = '0';
            cell.style.left = '0';
            cell.style.height = '100%';
            
            // Calculate visible span within the 3-slot window
            const programTotalSlots = Math.ceil(program.duration / 30);
            const programEndSlot = startSlot + programTotalSlots - 1;
            const visibleEndSlot = Math.min(programEndSlot, totalSlots - 1);
            const visibleSpan = visibleEndSlot - startSlot + 1;
            
            if (visibleSpan > 1) {
                // Multi-slot spanning program
                cell.style.width = `${visibleSpan * 100}%`;
                cell.classList.add('spanning-cell');
                cell.style.zIndex = '10';
                
                // Place in the first visible slot
                slotContainers[startSlot].appendChild(cell);
                
                // Mark subsequent visible slots as occupied
                for (let i = 1; i < visibleSpan; i++) {
                    const slotIndex = startSlot + i;
                    if (slotIndex < totalSlots) {
                        processedSlots.add(slotIndex);
                        const occupiedMarker = document.createElement('div');
                        occupiedMarker.style.display = 'none';
                        occupiedMarker.className = 'occupied-slot';
                        slotContainers[slotIndex].appendChild(occupiedMarker);
                    }
                }
                
                processedSlots.add(startSlot);
            } else {
                // Single slot program (or program that only shows in one visible slot)
                cell.style.width = '100%';
                slotContainers[startSlot].appendChild(cell);
                processedSlots.add(startSlot);
            }
        }

        // Fill any remaining empty slots
        for (let slot = 0; slot < totalSlots; slot++) {
            if (!processedSlots.has(slot)) {
                // Generate appropriate programming instead of showing "No Programming"
                const timeOfDay = this.programmingManager.getTimeOfDay(slot);
                const fallbackProgram = this.programmingManager.generateFallbackProgram(channel, timeOfDay);
                
                const emptyCell = document.createElement('div');
                emptyCell.className = 'program-cell';
                emptyCell.style.position = 'absolute';
                emptyCell.style.top = '0';
                emptyCell.style.left = '0';
                emptyCell.style.height = '100%';
                emptyCell.style.width = '100%';
                emptyCell.style.background = 'inherit';
                
                const emptyContent = document.createElement('div');
                emptyContent.className = 'program-content';
                emptyContent.innerHTML = `<div class="program-title">${fallbackProgram.title}</div>`;
                emptyCell.appendChild(emptyContent);
                
                slotContainers[slot].appendChild(emptyCell);
            }
        }

        return row;
    }

    createLogoRow() {
        const row = document.createElement('div');
        row.className = 'grid-row logo-row';
        
        // Logo content spans the entire width
        const logoContainer = document.createElement('div');
        logoContainer.className = 'logo-container';
        
        const logoImg = document.createElement('img');
        logoImg.src = 'assets/logo.png';
        logoImg.alt = 'TV Guide Logo';
        logoImg.className = 'logo-image';
        
        logoContainer.appendChild(logoImg);
        row.appendChild(logoContainer);

        return row;
    }

    createProgramCell(program) {
        const cell = document.createElement('div');
        cell.className = 'program-cell';

        // Add special styling for movie reviews
        if (program.title === 'Movie Reviews»' || program.special === 'movie-reviews') {
            cell.classList.add('movie-reviews');
        }

        // Add category-specific styling
        if (program.category === 'movie') {
            cell.classList.add('movie-program');
        } else if (program.category === 'ppv') {
            cell.classList.add('ppv-program');
        } else if (program.category === 'news') {
            cell.classList.add('news-program');
        } else if (program.category === 'sports') {
            cell.classList.add('sports-program');
        }

        const content = document.createElement('div');
        content.className = 'program-content';

        const title = document.createElement('div');
        title.className = 'program-title';
        
        // Build title with arrow indicators
        let displayTitle = program.title || 'Programming';
        
        // Add left arrows for programs that started before visible slots
        if (program.leftArrows && program.leftArrows > 0) {
            const leftArrowCount = Math.min(program.leftArrows, 3); // Max 3 arrows
            const leftArrows = '«'.repeat(leftArrowCount);
            displayTitle = leftArrows + displayTitle;
        }
        
        // Add right arrows for programs that extend beyond visible slots
        if (program.rightArrows && program.rightArrows > 0) {
            const rightArrowCount = Math.min(program.rightArrows, 3); // Max 3 arrows
            const rightArrows = '»'.repeat(rightArrowCount);
            displayTitle = displayTitle + rightArrows;
        }
        
        title.textContent = displayTitle;
        
        content.appendChild(title);
        cell.appendChild(content);
        return cell;
    }

    startGrid() {
        const gridContent = document.getElementById('gridContent');
        if (!gridContent) {
            console.error('Cannot start grid - gridContent element not found');
            return;
        }
        
        console.log('Starting grid animation...');
        
        // Reset and restart animation
        gridContent.style.animation = 'none';
        gridContent.offsetHeight; // Trigger reflow
        gridContent.style.animation = `scroll-grid ${TV_GUIDE_CONFIG.SCROLL_SPEED}ms linear infinite`;

        // Add row focusing effect
        this.startRowFocusing();
        
        // Set up a watchdog to ensure animation continues
        this.setupAnimationWatchdog();
    }

    setupAnimationWatchdog() {
        // Check every 30 seconds to ensure animation is still running
        setInterval(() => {
            const gridContent = document.getElementById('gridContent');
            if (gridContent) {
                const computedStyle = window.getComputedStyle(gridContent);
                const animation = computedStyle.animation;
                
                if (!animation || animation === 'none') {
                    console.warn('Grid animation stopped unexpectedly, restarting...');
                    this.startGrid();
                }
            }
        }, 30000);
    }

    startRowFocusing() {
        if (this.focusInterval) {
            clearInterval(this.focusInterval);
        }

        const rows = document.querySelectorAll('.grid-row');
        const totalRows = rows.length / 6; // Account for 6 cycles
        this.currentFocusIndex = 0;

        this.focusInterval = setInterval(() => {
            // Remove previous focus
            rows.forEach(row => row.classList.remove('focused'));

            // Add focus to current row in all cycles
            for (let cycle = 0; cycle < 6; cycle++) {
                const rowIndex = (cycle * totalRows) + this.currentFocusIndex;
                if (rows[rowIndex]) {
                    rows[rowIndex].classList.add('focused');
                }
            }

            this.currentFocusIndex = (this.currentFocusIndex + 1) % totalRows;
        }, TV_GUIDE_CONFIG.SCROLL_SPEED / totalRows);
    }

    refreshProgramming() {
        try {
            console.log('Refreshing programming data...');
            
            // Regenerate channel data with new time-based programming
            if (this.channelData && this.channelData.length > 0) {
                this.updateProgramTimes();
                this.populateGrid();
                console.log('Programming refreshed successfully');
            } else {
                console.warn('No channel data available, reloading...');
                this.loadChannelData();
            }
        } catch (error) {
            console.error('Error refreshing programming:', error);
            // Don't clear the grid if there's an error - keep existing content
        }
    }

    refreshListings() {
        const statusOverlay = document.getElementById('statusOverlay');
        const messageEl = statusOverlay?.querySelector('.status-message');
        
        if (messageEl) messageEl.textContent = 'Refreshing channel data...';
        if (statusOverlay) statusOverlay.style.display = 'flex';
        
        setTimeout(() => {
            this.loadChannelData();
            this.startGrid();
            if (statusOverlay) statusOverlay.style.display = 'none';
        }, 2000);
    }

    simulateDataOutage() {
        const statusOverlay = document.getElementById('statusOverlay');
        const messageEl = statusOverlay?.querySelector('.status-message');
        
        if (messageEl) messageEl.textContent = 'Data temporarily unavailable';
        if (statusOverlay) statusOverlay.style.display = 'flex';
        
        // Show empty grid
        setTimeout(() => {
            document.getElementById('gridContent').innerHTML = '<div class="status-message">Service will resume shortly</div>';
            if (statusOverlay) statusOverlay.style.display = 'none';
        }, 3000);

        // Restore after 10 seconds
        setTimeout(() => {
            this.loadChannelData();
            this.startGrid();
        }, 10000);
    }
}

export default GridManager;
