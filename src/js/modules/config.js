// TV Guide Configuration Module
// Centralized configuration settings for the TV Guide application

export const TV_GUIDE_CONFIG = {
    // Scrolling speed in milliseconds (lower = faster, higher = slower)
    // Examples: 30000 = 30 seconds, 45000 = 45 seconds, 60000 = 1 minute
    // Recommended: 45000 for authentic experience
    SCROLL_SPEED: 320000,
    
    // Target audio volume (0.0 = silent, 1.0 = full volume)
    TARGET_VOLUME: 1.0,
    
    // Weather interstitials (true = show weather pages, false = disable weather)
    WEATHER_ENABLED: false,
    
    // Weather show interval in milliseconds (300000 = 5 minutes)
    WEATHER_INTERVAL: 300000,
    
    // Weather display duration in milliseconds (8000 = 8 seconds)
    WEATHER_DURATION: 8000,
    
    // Grid timing configuration
    TIME_SLOT_DURATION: 30, // 30-minute time slots
    VISIBLE_TIME_SLOTS: 3,   // Number of time slots visible at once
    
    // Animation and display settings
    ROW_FOCUS_INTERVAL: null, // Calculated based on scroll speed
    
    // Audio settings
    BACKGROUND_MUSIC_VOLUME: 0.3,
    
    // Video settings
    VIDEO_FAILOVER_TIMEOUT: 10000, // 10 seconds
    PLACEHOLDER_RETRY_DELAY: 30000, // 30 seconds
    
    // Interstitial settings
    COMMUNITY_INTERVAL: 600000, // 10 minutes
    COMMUNITY_DURATION: 6000,   // 6 seconds
    
    // Advertisement settings
    AD_ROTATION_INTERVAL: 15000, // 15 seconds per ad (faster rotation for more variety)
    AD_TRANSITION_DURATION: 500, // Fade transition time
    AD_CYCLE_SHUFFLE: true,     // Reshuffle ads after each complete cycle
    
    // Debug settings
    DEBUG_MODE: true,
    CONSOLE_LOGGING: true
};

// Export for use in other modules
export default TV_GUIDE_CONFIG;
