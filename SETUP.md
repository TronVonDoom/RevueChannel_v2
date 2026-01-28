# RevueChannel v2.0 - Setup Guide

## Quick Start

1. **Navigate to project directory:**
   ```bash
   cd RevueChannel_v2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The application will open at http://localhost:3000

## Available Scripts

- **npm run dev** - Start development server with hot reload
- **npm run build** - Build for production (output to /dist)
- **npm run preview** - Preview production build locally
- **npm run lint** - Run ESLint on source files

## Project Structure

```
RevueChannel_v2/
 src/
    js/
       tv-guide-app.js          # Main application entry
       modules/
           config.js            # Configuration settings
           audio-controller.js  # Audio management
           video-controller.js  # Video playback
           grid-manager.js      # TV grid rendering
           programming-manager.js
           time-manager.js
           interstitial-manager.js
           advertisement-manager.js
    data/
       channels.json            # Channel listings
       comprehensive-data.js    # Programming data
    styles/
        styles.css               # Application styles
 public/
    assets/                      # Static assets (fonts, videos)
 index.html                       # Entry HTML
 package.json                     # Dependencies and scripts
 vite.config.js                   # Build configuration
```

## Key Features

### ES6 Modules
All JavaScript uses ES6 module syntax for better code organization:
- Import/export between modules
- Tree-shaking for optimized builds
- Better dependency management

### Vite Build System
- Lightning-fast HMR (Hot Module Replacement)
- Optimized production builds
- Automatic code splitting
- Modern browser support with legacy fallbacks

### Development Experience
- Auto-refresh on file changes
- Source maps for debugging
- ESLint for code quality
- Path aliases (@, @js, @data, @styles)

## Configuration

### Vite Config (vite.config.js)
- Build output directory: /dist
- Dev server port: 3000
- Path aliases configured for cleaner imports

### ESLint Config (.eslintrc.json)
- ES2021+ support
- Browser and Node environments
- Module syntax enabled

## Building for Production

```bash
npm run build
```

Outputs optimized files to /dist directory:
- Minified JavaScript
- Optimized CSS
- Asset optimization
- Source maps (optional)

## Deployment

After building, deploy the /dist directory to your hosting platform:
- Static hosting (Netlify, Vercel, GitHub Pages)
- Traditional web servers (Apache, Nginx)
- CDN deployment

## Troubleshooting

### Port already in use
Change the port in vite.config.js:
```javascript
server: {
  port: 3001  // Change to any available port
}
```

### Module not found errors
Ensure all imports use correct paths:
```javascript
import { CONFIG } from './modules/config.js';  // Relative paths
import { CONFIG } from '@js/modules/config.js';  // Or use alias
```

### Assets not loading
Place assets in /public directory for static serving

## Next Steps

1. Review the existing code in /src
2. Customize configuration in vite.config.js
3. Update package.json with your project details
4. Add any additional dependencies with npm install
5. Start developing!
