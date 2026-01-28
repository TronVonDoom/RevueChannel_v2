// Time Manager Module
// Handles clock updates, time slot generation, and scheduling

import { TV_GUIDE_CONFIG } from './config.js';

export class TimeManager {
    constructor() {
        this.currentTime = new Date();
        this.currentTimeSlotIndex = 0;
        this.lastSlotInWeek = -1; // Track last slot position for updates
        this.updateInterval = null;
        this.lastTimeSlotChange = 0; // Prevent rapid refreshes
        this.refreshCooldown = 5000; // 5 second cooldown between refreshes
    }

    initialize() {
        this.generateCurrentTimeSlots();
        this.startClock();
    }

    startClock() {
        this.updateClock();
        this.updateInterval = setInterval(() => {
            this.updateClock();
            this.updateTimeSlots();
        }, 1000);
    }

    updateClock() {
        this.currentTime = new Date();
        let timeString = this.currentTime.toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Remove AM/PM from the main clock display
        timeString = timeString.replace(/\s?(AM|PM)$/i, '');
        
        const clockElement = document.getElementById('currentTime');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }

    generateCurrentTimeSlots() {
        const now = new Date();
        const times = [];
        
        // Start from the current 30-minute block
        const currentMinutes = now.getMinutes();
        const startTime = new Date(now);
        
        // Round down to the nearest 30-minute mark
        if (currentMinutes < 30) {
            startTime.setMinutes(0, 0, 0);
        } else {
            startTime.setMinutes(30, 0, 0);
        }
        
        // Generate three 30-minute time slots starting from current block
        for (let i = 0; i < TV_GUIDE_CONFIG.VISIBLE_TIME_SLOTS; i++) {
            const time = new Date(startTime.getTime() + (i * TV_GUIDE_CONFIG.TIME_SLOT_DURATION * 60 * 1000));
            const timeString = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            times.push(timeString);
        }

        // Update DOM elements
        for (let i = 0; i < TV_GUIDE_CONFIG.VISIBLE_TIME_SLOTS; i++) {
            const timeSlotElement = document.getElementById(`timeSlot${i + 1}`);
            if (timeSlotElement && times[i]) {
                timeSlotElement.textContent = times[i];
            }
        }
    }

    updateTimeSlots() {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();
        
        // Generate current time slots
        this.generateCurrentTimeSlots();
        
        // Update time slot highlighting based on current time
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach((slot, index) => {
            slot.classList.remove('current-time-slot');
        });

        // Highlight current 30-minute block
        if (currentMinutes < 30) {
            const firstSlot = document.getElementById('timeSlot1');
            if (firstSlot) {
                firstSlot.classList.add('current-time-slot');
            }
            this.currentTimeSlotIndex = 0;
        } else {
            const secondSlot = document.getElementById('timeSlot2');
            if (secondSlot) {
                secondSlot.classList.add('current-time-slot');
            }
            this.currentTimeSlotIndex = 1;
        }

        // Only refresh programming exactly on the 30-minute marks (and only once)
        if ((currentMinutes === 0 || currentMinutes === 30) && currentSeconds <= 1) {
            this.onTimeSlotChange();
        }
    }

    onTimeSlotChange() {
        const now = Date.now();
        
        // Prevent rapid successive time slot changes that could clear the grid
        if (now - this.lastTimeSlotChange < this.refreshCooldown) {
            console.log('Time slot change ignored - too soon since last change');
            return;
        }
        
        this.lastTimeSlotChange = now;
        console.log('Time slot changed, triggering programming refresh...');
        
        // Emit event for time slot change
        const event = new CustomEvent('timeSlotChanged', {
            detail: { currentTimeSlotIndex: this.currentTimeSlotIndex }
        });
        document.dispatchEvent(event);
        
        this.shiftTimeSlots();
    }

    shiftTimeSlots() {
        // Animate time slots moving forward
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.style.animation = 'timeHighlight 1s ease-in-out';
        });

        setTimeout(() => {
            this.generateCurrentTimeSlots();
            timeSlots.forEach(slot => {
                slot.style.animation = '';
            });
        }, 1000);
    }

    getCurrentTimeInfo() {
        return {
            currentTime: this.currentTime,
            currentTimeSlotIndex: this.currentTimeSlotIndex,
            formattedTime: this.currentTime.toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: '2-digit'
            })
        };
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

export default TimeManager;
