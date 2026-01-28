// Interstitial Manager Module
// Handles weather pages, community bulletins, and other interstitial content

import { TV_GUIDE_CONFIG } from './config.js';

export class InterstitialManager {
    constructor() {
        this.weatherTimer = null;
        this.communityTimer = null;
        this.activeInterstitial = null;
    }

    initialize() {
        this.scheduleInterstitials();
    }

    scheduleInterstitials() {
        // Show weather page only if enabled in configuration
        if (TV_GUIDE_CONFIG.WEATHER_ENABLED) {
            this.weatherTimer = setInterval(() => {
                this.showInterstitial('weather', TV_GUIDE_CONFIG.WEATHER_DURATION);
            }, TV_GUIDE_CONFIG.WEATHER_INTERVAL);
        }

        // Show community billboard every 10 minutes
        this.communityTimer = setInterval(() => {
            this.showInterstitial('community', TV_GUIDE_CONFIG.COMMUNITY_DURATION);
        }, TV_GUIDE_CONFIG.COMMUNITY_INTERVAL);
    }

    showInterstitial(type, duration) {
        if (this.activeInterstitial) {
            console.log('Interstitial already active, skipping');
            return;
        }

        this.activeInterstitial = type;
        const guideSection = document.getElementById('guideSection');
        const weatherPage = document.getElementById('weatherPage');

        // Hide guide, show interstitial
        if (guideSection) {
            guideSection.style.display = 'none';
        }
        
        if (type === 'weather' && weatherPage) {
            weatherPage.style.display = 'block';
            this.updateWeatherData();
        } else if (type === 'community') {
            this.showCommunityBulletin(duration);
            return; // Community bulletin handles its own cleanup
        }

        // Return to guide after duration
        setTimeout(() => {
            if (weatherPage) {
                weatherPage.style.display = 'none';
            }
            if (guideSection) {
                guideSection.style.display = 'block';
            }
            this.activeInterstitial = null;
        }, duration);
    }

    showCommunityBulletin(duration) {
        // Create community bulletin overlay
        const bulletin = document.createElement('div');
        bulletin.className = 'community-bulletin';
        bulletin.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #000080, #001a80);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            z-index: 1000;
        `;

        const bulletinContent = this.generateCommunityContent();
        bulletin.innerHTML = bulletinContent;

        document.body.appendChild(bulletin);

        // Remove after duration
        setTimeout(() => {
            document.body.removeChild(bulletin);
            this.activeInterstitial = null;
        }, duration);
    }

    generateCommunityContent() {
        const communityMessages = [
            {
                title: 'COMMUNITY CALENDAR',
                items: [
                    'City Council Meeting - Tuesday 7:00 PM',
                    'Library Book Sale - Saturday 9:00 AM',
                    'High School Football vs. Rivals - Friday 7:30 PM',
                    'Community Center Dance - Saturday 8:00 PM'
                ]
            },
            {
                title: 'LOCAL ANNOUNCEMENTS',
                items: [
                    'Road Construction on Main St. - Expect Delays',
                    'New Restaurant Opening Downtown - "Mario\'s Pizza"',
                    'Lost Pet: Golden Retriever "Buddy" - Call 555-0123',
                    'Volunteer Firefighters Needed - Contact Fire Dept.'
                ]
            },
            {
                title: 'SCHOOL DISTRICT NEWS',
                items: [
                    'Parent-Teacher Conferences - Next Week',
                    'School Picture Day - Thursday',
                    'Science Fair - March 15th',
                    'Spring Break - March 22-26'
                ]
            }
        ];

        const randomMessage = communityMessages[Math.floor(Math.random() * communityMessages.length)];
        
        let content = `
            <div style="text-align: center; max-width: 600px;">
                <h2 style="font-size: 2.5em; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                    ${randomMessage.title}
                </h2>
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
        `;

        randomMessage.items.forEach(item => {
            content += `<p style="font-size: 1.2em; margin: 10px 0; line-height: 1.4;">${item}</p>`;
        });

        content += `
                </div>
                <p style="margin-top: 30px; font-size: 1em; opacity: 0.8;">
                    TV Guide Channel - Your Community Connection
                </p>
            </div>
        `;

        return content;
    }

    updateWeatherData() {
        // In real app, would fetch actual weather data
        const temps = [65, 68, 72, 75, 78];
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
        
        const temp = temps[Math.floor(Math.random() * temps.length)];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];

        const tempElement = document.querySelector('.temp');
        const conditionElement = document.querySelector('.condition');
        
        if (tempElement) tempElement.textContent = `${temp}°F`;
        if (conditionElement) conditionElement.textContent = condition;
    }

    // Manual trigger methods for testing/debugging
    showWeatherPage() {
        this.showInterstitial('weather', TV_GUIDE_CONFIG.WEATHER_DURATION);
    }

    showCommunityPage() {
        this.showInterstitial('community', TV_GUIDE_CONFIG.COMMUNITY_DURATION);
    }

    destroy() {
        if (this.weatherTimer) {
            clearInterval(this.weatherTimer);
            this.weatherTimer = null;
        }
        
        if (this.communityTimer) {
            clearInterval(this.communityTimer);
            this.communityTimer = null;
        }
        
        this.activeInterstitial = null;
    }
}

export default InterstitialManager;
