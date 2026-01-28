// Video Controller Module
// Handles video playback, promo rotation, and video management

import { TV_GUIDE_CONFIG } from './config.js';

export class VideoController {
    constructor(audioController) {
        this.audioController = audioController;
        this.videoPromos = [];
        this.currentPromoIndex = 0;
        this.loadingTimeout = null;
    }

    initialize() {
        this.videoPromos = this.generate90sCommercialsList();
        
        if (this.videoPromos.length === 0) {
            console.warn('No video promos available, showing placeholder');
            this.showAnimatedPlaceholder();
            return;
        }
        
        // Initialize video element with first video immediately
        this.initializeVideoPlayer();
    }

    generate90sCommercialsList() {
        const commercials = [];
        
        // Archive.org 90s commercials - ALL available MP4 files
        const baseUrl = 'https://ia803102.us.archive.org/27/items/Collectionof90sCommercials/';
        
        // Season 1: Episodes 1-43
        for (let i = 1; i <= 43; i++) {
            commercials.push({
                title: `90s Commercials - S01.E${i}`,
                url: `${baseUrl}90s%20Commercials%20-%20S01.E${i}.mp4`,
                duration: Math.floor(Math.random() * 300000) + 60000 // 1-6 minutes
            });
        }
        
        // Season 2: Episodes 1-77  
        for (let i = 1; i <= 77; i++) {
            commercials.push({
                title: `90s Commercials - S02.E${i}`,
                url: `${baseUrl}90s%20Commercials%20-%20S02.E${i}.mp4`,
                duration: Math.floor(Math.random() * 300000) + 60000 // 1-6 minutes
            });
        }

        // Blue Sky Studios commercials (1992-2000)
        const blueSkyBaseUrl = 'https://archive.org/download/blue-sky-studios-commercials/';
        const blueSkyCommercials = [
            '1994%20Nestle%20Refridgerated%20Cookie%20Dough%20%27What%20ever%20happened%20to%20sharing%27%20TV%20Commercial.mp4',
            '1995%20Acura%20TL%20Series%20Commercial.mp4',
            '1996%20Commercial%20-%20Glade%20-%20Clip%20Ons.mp4',
            '1996%20Shell%20MasterCard%20by%20Chase%20Commercial.mp4',
            'ABC%20News%20Logo%20%281995%29.mp4',
            'Bell%20Atlantic%20TV%20%27Pipe%27.mp4',
            'Bell%20Atlantic.mp4',
            'Black%20Flag%20Gold%3B%20The%20Roach%20Stops%20Here%20%281998%29.mp4',
            'Blockbuster%20%28Dancing%20VHS%20Tapes%29%201998%20Commercial.mp4',
            'Blockbuster%20Commercial%20-%20The%20Matrix%20%281999%29.mp4',
            'Blockbuster%20Video%20Commercial%20%281999%20Canada%29.mp4',
            'Braun%20-%20The%20Last%20Word%20%281992%2C%20USA%29.mp4',
            'Braun%20Flex%20Integral%20Shaver%20Commercial%201997.mp4',
            'Brother%20Printers%20%27Glitches%27%20Commercial.mp4',
            'Capri%20Sun%20-%20Unlimited%20Liquid%20Cool%20%281998%2C%20USA%29.mp4',
            'Coca-Cola%20-%20Polar%20Bear%20%281996%29.mp4',
            'Coca-Cola%20Christmas%20Commercial%20%281996%29.mp4',
            'Dodge%20Ram%20%27Sheep%27%20Commercial%20%281999%29.mp4',
            'Honeycomb%20Cereal%20Biking%20in%20Moab%2090s%20Commercial%20%281996%29.mp4',
            'Hostess%20-%20Frosted%20Donettes%20-%20Donuts%20-%20Commercial%20-%20Who%20Ate%20the%20Last%20One%20-%20Fish%20%281999%29.mp4',
            'Huggies%20-%204%20Stars%20%281998%2C%20USA%29.mp4',
            'Huggies%20-%20Puppet%20%281998%2C%20USA%29.mp4',
            'Huggies%20-%20Treasure%20Chest%20%281998%2C%20USA%29.mp4',
            'Huggies%20Diapers%20%281998%29%20Television%20Commercial%20-%20Parachute.mp4',
            'Huggies%20Supreme%20Commercial%20%281998%29.mp4',
            'Kix%20-%20Berrie%27d%20%281995%2C%20USA%29.mp4',
            'Kix%20-%20Camp%20%281995%2C%20USA%29.mp4',
            'Kix%20-%20Recliner%20Boy%20%281995%2C%20USA%29.mp4',
            'Luden%27s%20-%20Wild%20Flavors%20%281994%2C%20USA%29.mp4',
            'Luden%27s.mp4',
            'M%26M%27s%20%27Are%20you%20going%20to%20have%20some%27%20commercial%201994.mp4',
            'M%26M%27s%20-%20Bebe%20Neuwirth%20%281995%2C%20USA%29.mp4',
            'Mannington%20Floors%20Commercial%20%281998%29.mp4',
            'Nestle%20Cookie%20Dough%20-%20Boy%20in%20the%20Refrigerator%20%281995%29.mp4',
            'Nestle%20Cookie%20Dough%20Commercial%20%281994%29%20-%2015%20second%20version.mp4',
            'Pepsi%20Christmas%20Commercial%20%281996%29.mp4',
            'Post%20Cereals%20-%20Alpha-Bits%20%281999%29.mp4',
            'Quaker%20Oats%20-%20Dinosaur%20Eggs%20%281993%29.mp4',
            'RCA%20-%20Small%20Wonder%20%281999%29.mp4',
            'Starburst%20-%20Berries%20and%20Creme%20%281997%29.mp4',
            'Starburst%20-%20California%20Speed%20%281997%29.mp4',
            'Starburst%20Cheerleaders%20Commercial%20%281999%29.mp4',
            'TNT%20Express%20-%20A%20New%20Attitude%20%281998%29.mp4',
            'TNT%20Express%20-%20Delivering%20Dreams%20%281998%29.mp4',
            'TNT%20Express%20-%20Fast%20Delivery%20%281998%29.mp4',
            'TNT%20Express%20-%20On%20Time%20%281998%29.mp4',
            'TNT%20Express%20-%20Reliable%20%281998%29.mp4'
        ];

        // Add Blue Sky Studios commercials
        blueSkyCommercials.forEach((filename, index) => {
            commercials.push({
                title: `Blue Sky Studios - ${filename.replace(/%20/g, ' ').replace(/%27/g, "'").replace(/%26/g, '&').replace(/%3B/g, ';').replace(/%28/g, '(').replace(/%29/g, ')').replace('.mp4', '')}`,
                url: `${blueSkyBaseUrl}${filename}`,
                duration: 30000 // Most commercials are 30 seconds
            });
        });
        
        console.log(`Generated playlist with ${commercials.length} commercial videos (${120} original + ${blueSkyCommercials.length} Blue Sky Studios)`);
        
        // Shuffle the array for random playback
        return this.shuffleArray(commercials);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    initializeVideoPlayer() {
        const video = document.getElementById('promoVideo');
        const placeholder = document.getElementById('videoPlaceholder');
        const overlay = document.getElementById('videoOverlay');
        
        if (this.videoPromos.length === 0) {
            console.error('No video promos available');
            // Keep placeholder visible if no videos available
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
            return;
        }

        // Handle video ended event for continuous playback
        video.addEventListener('ended', () => {
            this.nextVideo();
        });

        // Handle video errors and skip to next
        video.addEventListener('error', (e) => {
            console.warn('Video error, trying next video:', e);
            // Don't show placeholder on error, just try next video
            setTimeout(() => {
                if (this.currentPromoIndex < this.videoPromos.length - 1) {
                    this.nextVideo();
                } else {
                    console.warn('All videos failed, showing animated placeholder');
                    this.showAnimatedPlaceholder();
                }
            }, 1000);
        });

        // Handle successful video load - hide placeholder immediately
        video.addEventListener('loadeddata', () => {
            console.log('Video loaded successfully');
            // Hide placeholder and show video immediately
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            video.style.display = 'block';
        });

        // Load first video immediately
        this.loadVideoPromo(0);
    }

    loadVideoPromo(index) {
        const video = document.getElementById('promoVideo');
        const placeholder = document.getElementById('videoPlaceholder');
        const overlay = document.getElementById('videoOverlay');
        const promo = this.videoPromos[index];
        
        if (!promo) {
            console.error('Invalid promo index:', index);
            // Show placeholder on error
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
            video.style.display = 'none';
            return;
        }

        console.log('Loading video:', promo.title);
        
        // Set video source
        const source = video.querySelector('source');
        if (source) {
            source.src = promo.url;
        } else {
            // Create source element if it doesn't exist
            const newSource = document.createElement('source');
            newSource.src = promo.url;
            newSource.type = 'video/mp4';
            video.appendChild(newSource);
        }
        
        // Load the video immediately
        video.load();
        
        // Set loading timeout
        this.loadingTimeout = setTimeout(() => {
            console.warn('Video loading timeout, trying next video');
            this.nextVideo();
        }, TV_GUIDE_CONFIG.VIDEO_FAILOVER_TIMEOUT);
        
        // Clear timeout when video loads
        video.addEventListener('loadeddata', () => {
            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
                this.loadingTimeout = null;
            }
        }, { once: true });
        
        // Set up volume and play when video can play
        video.addEventListener('canplay', () => {
            console.log('Video can play - setting up audio and playback');
            
            // Set mute state based on sound enabled status
            video.muted = !this.audioController.soundEnabled;
            
            // Set volume if sound is enabled
            if (this.audioController.soundEnabled) {
                this.audioController.setVideoVolume(video);
                console.log(`Video volume set (sound enabled)`);
            }
            
            // Try to play the video
            video.play().then(() => {
                console.log(`Video playing successfully ${this.audioController.soundEnabled ? '(with sound)' : '(muted)'}`);
                // Show overlay only if sound is disabled
                if (!this.audioController.soundEnabled && overlay) {
                    overlay.style.display = 'flex';
                }
            }).catch(e => {
                console.warn('Autoplay failed, will retry:', e);
                // Try again in a moment
                setTimeout(() => {
                    video.play().catch(err => console.log('Retry failed:', err));
                    // Show overlay for user interaction
                    if (!this.audioController.soundEnabled && overlay) {
                        overlay.style.display = 'flex';
                    }
                }, 1000);
            });
        }, { once: true });
    }

    nextVideo() {
        // If all videos fail, show animated placeholder
        if (this.currentPromoIndex >= this.videoPromos.length - 1) {
            console.log('All videos attempted, showing animated placeholder');
            this.showAnimatedPlaceholder();
            return;
        }
        
        this.currentPromoIndex = (this.currentPromoIndex + 1) % this.videoPromos.length;
        
        // If we've gone through all videos, reshuffle for variety
        if (this.currentPromoIndex === 0) {
            this.videoPromos = this.shuffleArray(this.videoPromos);
            console.log('Reshuffled video playlist');
        }
        
        this.loadVideoPromo(this.currentPromoIndex);
    }

    showAnimatedPlaceholder() {
        const video = document.getElementById('promoVideo');
        const placeholder = document.getElementById('videoPlaceholder');
        const overlay = document.getElementById('videoOverlay');
        
        // Hide video and overlay
        video.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        
        // Show animated placeholder
        if (placeholder) {
            const placeholderTitle = placeholder.querySelector('h3');
            const placeholderSubtitle = placeholder.querySelector('p');
            if (placeholderTitle) placeholderTitle.textContent = 'PROMO VIDEO';
            if (placeholderSubtitle) placeholderSubtitle.textContent = 'Classic 90s TV Promos';
            placeholder.style.display = 'flex';
            
            // Add animation class if available
            placeholder.classList.add('animated');
        }
        
        // Try to reload videos after some time
        setTimeout(() => {
            this.currentPromoIndex = 0;
            this.loadVideoPromo(0);
        }, TV_GUIDE_CONFIG.PLACEHOLDER_RETRY_DELAY);
    }

    getCurrentVideoInfo() {
        if (this.videoPromos.length > 0 && this.currentPromoIndex < this.videoPromos.length) {
            return this.videoPromos[this.currentPromoIndex];
        }
        return null;
    }

    getVideoPlaylist() {
        return {
            total: this.videoPromos.length,
            current: this.currentPromoIndex,
            playlist: this.videoPromos.map(v => v.title)
        };
    }

    skipToNextVideo() {
        console.log('Manually skipping to next video');
        this.nextVideo();
    }
}

export default VideoController;
