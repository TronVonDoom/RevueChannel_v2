// TV Guide Channel Main Application
// Modular 90s TV Guide Channel Implementation

import { TV_GUIDE_CONFIG } from './modules/config.js';
import AudioController from './modules/audio-controller.js';
import VideoController from './modules/video-controller.js';
import GridManager from './modules/grid-manager.js';
import ProgrammingManager from './modules/programming-manager.js';
import TimeManager from './modules/time-manager.js';
import InterstitialManager from './modules/interstitial-manager.js';
import { AdvertisementManager } from './modules/advertisement-manager.js';

class TVGuideChannel {
    constructor() {
        this.audioController = new AudioController();
        this.videoController = new VideoController(this.audioController);
        this.programmingManager = new ProgrammingManager();
        this.gridManager = new GridManager(this.programmingManager);
        this.timeManager = new TimeManager();
        this.interstitialManager = new InterstitialManager();
        this.advertisementManager = new AdvertisementManager();
        
        this.scrollSpeed = TV_GUIDE_CONFIG.SCROLL_SPEED;
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) {
            console.warn('TV Guide already initialized');
            return;
        }

        console.log('Initializing 90s TV Guide Channel...');
        
        try {
            // Setup event listeners first
            this.setupEventListeners();
            
            // Initialize all modules
            await this.gridManager.loadChannelData();
            this.timeManager.initialize();
            this.videoController.initialize();
            this.interstitialManager.initialize();
            this.advertisementManager.initialize();
            
            // Start the grid animation
            this.gridManager.startGrid();
            
            this.initialized = true;
            console.log('90s TV Guide Channel initialized successfully!');
            
            // Setup debug commands
            this.setupDebugCommands();
            
        } catch (error) {
            console.error('Failed to initialize TV Guide:', error);
        }
    }

    setupEventListeners() {
        // Click anywhere to enable sound
        document.addEventListener('click', () => {
            if (!this.audioController.soundEnabled) {
                this.audioController.enableSound();
            }
        });

        // Handle visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.audioController.pauseAll();
            } else {
                this.audioController.resumeAll();
            }
        });

        // Listen for time slot changes
        document.addEventListener('timeSlotChanged', (event) => {
            this.gridManager.refreshProgramming();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    handleKeyboardShortcuts(event) {
        switch(event.key) {
            case 'r':
            case 'R':
                this.refreshListings();
                break;
            case 'w':
            case 'W':
                this.interstitialManager.showWeatherPage();
                break;
            case 'c':
            case 'C':
                this.interstitialManager.showCommunityPage();
                break;
            case 'm':
            case 'M':
                this.audioController.enableSound();
                break;
            case 'n':
            case 'N':
            case 'ArrowRight':
                this.videoController.skipToNextVideo();
                break;
            case 'a':
            case 'A':
                this.advertisementManager.triggerNextAd();
                break;
            case '+':
            case '=':
                event.preventDefault();
                this.audioController.increaseVolume();
                break;
            case '-':
            case '_':
                event.preventDefault();
                this.audioController.decreaseVolume();
                break;
            case '0':
                event.preventDefault();
                this.audioController.setTargetVolume(0.7); // Reset to default
                break;
            case ' ': // Spacebar
                event.preventDefault();
                this.toggleVideoPlayback();
                break;
        }
    }

    toggleVideoPlayback() {
        const video = document.getElementById('promoVideo');
        if (video) {
            if (video.paused) {
                video.play().catch(e => console.log('Play failed:', e));
            } else {
                video.pause();
            }
        }
    }

    // Public API methods
    refreshListings() {
        this.gridManager.refreshListings();
    }

    simulateDataOutage() {
        this.gridManager.simulateDataOutage();
    }

    setScrollSpeed(newSpeed) {
        this.scrollSpeed = newSpeed;
        TV_GUIDE_CONFIG.SCROLL_SPEED = newSpeed;
        console.log(`Scroll speed changed to ${newSpeed}ms (${newSpeed/1000} seconds)`);
        
        // Restart the grid animation with new speed
        this.gridManager.startGrid();
    }

    // Video control methods
    skipToNextVideo() {
        this.videoController.skipToNextVideo();
    }

    getCurrentVideoInfo() {
        return this.videoController.getCurrentVideoInfo();
    }

    getVideoPlaylist() {
        return this.videoController.getVideoPlaylist();
    }

    // Audio control methods
    setTargetVolume(level) {
        this.audioController.setTargetVolume(level);
    }

    increaseVolume() {
        this.audioController.increaseVolume();
    }

    decreaseVolume() {
        this.audioController.decreaseVolume();
    }

    getVolumeInfo() {
        return this.audioController.getVolumeInfo();
    }

    resetVolumeHistory() {
        this.audioController.resetVolumeHistory();
    }

    // Time and scheduling methods
    getCurrentTimeInfo() {
        return this.timeManager.getCurrentTimeInfo();
    }

    // Interstitial methods
    showWeatherPage() {
        this.interstitialManager.showWeatherPage();
    }

    showCommunityPage() {
        this.interstitialManager.showCommunityPage();
    }

    // Advertisement methods
    nextAdvertisement() {
        this.advertisementManager.triggerNextAd();
    }

    pauseAdvertisements() {
        this.advertisementManager.pauseRotation();
    }

    resumeAdvertisements() {
        this.advertisementManager.resumeRotation();
    }

    // Debug and development methods
    setupDebugCommands() {
        if (TV_GUIDE_CONFIG.DEBUG_MODE) {
            // Expose methods globally for debugging
            window.tvGuide = this;
            window.refreshGuide = () => this.refreshListings();
            window.simulateOutage = () => this.simulateDataOutage();
            window.skipVideo = () => this.skipToNextVideo();
            window.currentVideo = () => console.log(this.getCurrentVideoInfo());
            window.videoPlaylist = () => console.log(this.getVideoPlaylist());
            window.volumeUp = () => this.increaseVolume();
            window.volumeDown = () => this.decreaseVolume();
            window.setVolume = (level) => this.setTargetVolume(level);
            window.volumeInfo = () => console.log(this.getVolumeInfo());
            window.resetVolumes = () => this.resetVolumeHistory();
            window.showWeather = () => this.showWeatherPage();
            window.showCommunity = () => this.showCommunityPage();
            window.nextAd = () => this.nextAdvertisement();
            window.pauseAds = () => this.pauseAdvertisements();
            window.resumeAds = () => this.resumeAdvertisements();
            
            console.log('Debug commands enabled:');
            console.log('- refreshGuide(), simulateOutage(), skipVideo()');
            console.log('- currentVideo(), videoPlaylist()');
            console.log('- volumeUp(), volumeDown(), setVolume(0.0-1.0)');
            console.log('- volumeInfo(), resetVolumes()');
            console.log('- showWeather(), showCommunity()');
            console.log('- nextAd(), pauseAds(), resumeAds()');
        }
    }

    // Application lifecycle methods
    destroy() {
        this.timeManager.destroy();
        this.interstitialManager.destroy();
        this.advertisementManager.destroy();
        this.gridManager.focusInterval && clearInterval(this.gridManager.focusInterval);
        
        // Clean up event listeners
        document.removeEventListener('timeSlotChanged', this.handleTimeSlotChange);
        
        this.initialized = false;
        console.log('TV Guide Channel destroyed');
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const tvGuide = new TVGuideChannel();
    await tvGuide.initialize();
    
    // Make globally accessible
    window.tvGuide = tvGuide;
    
    // Immediately try to start video playback
    setTimeout(() => {
        const video = document.getElementById('promoVideo');
        if (video && video.readyState >= 2) { // HAVE_CURRENT_DATA
            video.play().catch(e => console.log('Initial video play attempt failed:', e));
        }
    }, 500);
});

// Handle DST and timezone changes
window.addEventListener('focus', () => {
    if (window.tvGuide && window.tvGuide.timeManager) {
        window.tvGuide.timeManager.updateTimeSlots();
    }
});

export default TVGuideChannel;
