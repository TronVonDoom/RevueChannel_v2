// Audio Control Module
// Handles all audio-related functionality including video volume and background music

import { TV_GUIDE_CONFIG } from './config.js';

export class AudioController {
    constructor() {
        this.soundEnabled = false;
        this.targetVolume = TV_GUIDE_CONFIG.TARGET_VOLUME;
        this.audioContext = null;
        this.gainNode = null;
        this.analyser = null;
        this.volumeHistory = new Map(); // Store volume levels for each video
    }

    initializeAudioContext() {
        // Don't initialize if already exists
        if (this.audioContext) {
            console.log('Audio context already initialized');
            return;
        }
        
        try {
            // Create audio context for advanced audio control
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            const video = document.getElementById('promoVideo');
            
            // Create audio nodes
            const source = this.audioContext.createMediaElementSource(video);
            this.gainNode = this.audioContext.createGain();
            this.analyser = this.audioContext.createAnalyser();
            
            // Configure analyser for volume detection
            this.analyser.fftSize = 256;
            this.analyser.smoothingTimeConstant = 0.8;
            
            // Connect audio nodes: source -> gain -> analyser -> destination
            source.connect(this.gainNode);
            this.gainNode.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            // Set initial gain
            this.gainNode.gain.value = 1.0;
            
            console.log('Audio context initialized for volume control');
        } catch (error) {
            console.warn('Audio context initialization failed, using fallback volume control:', error);
            // Fallback to simple volume control without Web Audio API
            this.audioContext = null;
            this.gainNode = null;
            this.analyser = null;
        }
    }

    setVideoVolume(video, volumeLevel = null) {
        const videoUrl = video.querySelector('source')?.src || video.src;
        
        if (volumeLevel === null) {
            // Check if we have a stored volume level for this video
            if (this.volumeHistory.has(videoUrl)) {
                volumeLevel = this.volumeHistory.get(videoUrl);
            } else {
                // Use target volume as default
                volumeLevel = this.targetVolume;
            }
        }
        
        // Use ONLY HTML5 video volume control to avoid Web Audio API conflicts
        video.volume = volumeLevel;
        console.log(`Set HTML5 video volume to ${(volumeLevel * 100).toFixed(0)}%`);
        
        // Store the volume level for this video
        this.volumeHistory.set(videoUrl, volumeLevel);
    }

    enableSound() {
        this.soundEnabled = true;
        const video = document.getElementById('promoVideo');
        const music = document.getElementById('backgroundMusic');
        const overlay = document.getElementById('videoOverlay');
        
        console.log('Enabling sound...');
        
        // Simple, direct video unmuting and volume control
        if (video) {
            video.muted = false;
            video.volume = this.targetVolume;
            console.log(`Video unmuted and volume set to ${this.targetVolume}`);
            
            // If video is not playing, try to start it
            if (video.paused) {
                video.play().then(() => {
                    console.log('Video started with sound');
                }).catch(e => console.log('Video play with sound failed:', e));
            }
        }
        
        // Start background music
        if (music) {
            music.volume = TV_GUIDE_CONFIG.BACKGROUND_MUSIC_VOLUME;
            music.play().catch(e => console.log('Music playback failed:', e));
        }
        
        // Hide the overlay completely
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        console.log('Sound enabled - using native HTML5 video audio only');
    }

    setTargetVolume(level) {
        this.targetVolume = Math.min(Math.max(level, 0.0), 1.0);
        const video = document.getElementById('promoVideo');
        this.setVideoVolume(video, this.targetVolume);
        console.log(`Target volume set to ${(this.targetVolume * 100).toFixed(0)}%`);
    }

    increaseVolume() {
        this.setTargetVolume(this.targetVolume + 0.1);
    }

    decreaseVolume() {
        this.setTargetVolume(this.targetVolume - 0.1);
    }

    resetVolumeHistory() {
        this.volumeHistory.clear();
        console.log('Volume history cleared - all videos will use default volume');
    }

    getVolumeInfo() {
        const video = document.getElementById('promoVideo');
        const videoUrl = video.querySelector('source')?.src || video.src;
        
        return {
            targetVolume: this.targetVolume,
            currentGain: this.gainNode?.gain.value || video.volume,
            storedVolumes: Array.from(this.volumeHistory.entries()).length,
            currentVideoVolume: this.volumeHistory.get(videoUrl) || 'not set'
        };
    }

    pauseAll() {
        const video = document.getElementById('promoVideo');
        const music = document.getElementById('backgroundMusic');
        
        video.pause();
        music.pause();
    }

    resumeAll() {
        const video = document.getElementById('promoVideo');
        const music = document.getElementById('backgroundMusic');
        
        if (this.soundEnabled) {
            video.muted = false;
            video.play().catch(e => console.log('Video resume failed:', e));
            music.play().catch(e => console.log('Music resume failed:', e));
        } else {
            // Resume muted
            video.muted = true;
            video.play().catch(e => console.log('Video resume (muted) failed:', e));
        }
    }
}

export default AudioController;
