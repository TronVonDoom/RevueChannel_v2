# Migration from RevueChannel to RevueChannel_v2

## Overview

This document describes the migration from the original RevueChannel project to a modern Node.js-based project structure using Vite as the build tool.

## What Changed

### Project Structure

**Before (RevueChannel):**
```
RevueChannel/
 index.html
 styles.css
 src/
    js/
    data/
 assets/
 backup/
```

**After (RevueChannel_v2):**
```
RevueChannel_v2/
 src/
    js/              # JavaScript modules
    data/            # Data files
    styles/          # Stylesheets
 public/
    assets/          # Static assets
 index.html
 package.json         # Node.js project config
 vite.config.js       # Build configuration
 .gitignore          # Git ignore rules
```

### Key Improvements

1. **Modern Build System**
   - Vite for fast development and optimized production builds
   - Hot Module Replacement (HMR) for instant updates
   - Automatic code splitting and optimization

2. **Better Code Organization**
   - Separate directories for source code and static assets
   - /public for assets that need direct URLs
   - /src for all source files that will be processed

3. **Development Tools**
   - ESLint for code quality
   - npm scripts for common tasks
   - Source maps for debugging

4. **Dependency Management**
   - package.json for tracking dependencies
   - npm/yarn for easy installation
   - Version control for dependencies

### File Migrations

- **index.html**: Updated paths to reference new structure
- **styles.css**: Moved to /src/styles/
- **JavaScript**: All JS files copied to /src/js/
- **Data files**: Copied to /src/data/
- **Assets**: Moved to /public/assets/

### Path Changes

| Old Path | New Path |
|----------|----------|
| styles.css | ./src/styles/styles.css |
| src/js/tv-guide-app.js | ./src/js/tv-guide-app.js |
| src/data/channels.json | ./src/data/channels.json |
| assets/* | ./public/assets/* |

## Getting Started

### Initial Setup

1. Install Node.js (v18+ recommended)

2. Navigate to the project:
   ```bash
   cd RevueChannel_v2
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Development Workflow

1. **Make changes** to files in /src
2. **Browser auto-refreshes** with HMR
3. **Build for production** when ready:
   ```bash
   npm run build
   ```

### Benefits of New Structure

 **Faster development** - HMR updates instantly
 **Optimized builds** - Minified and tree-shaken code
 **Better tooling** - ESLint, source maps, etc.
 **Modern standards** - ES6 modules, latest JavaScript
 **Easy deployment** - Single /dist folder to deploy
 **Scalable** - Easy to add new dependencies and tools

## Compatibility

The application maintains all original functionality:
-  ES6 modules work as before
-  All JavaScript modules unchanged
-  Data files remain the same
-  HTML structure preserved
-  CSS styling identical

## Next Steps

1. **Review** the code in /src to familiarize yourself
2. **Test** the application with 
pm run dev
3. **Customize** package.json with your details
4. **Add dependencies** as needed with 
pm install <package>
5. **Deploy** the built /dist folder

## Troubleshooting

### Assets not loading
- Ensure assets are in /public directory
- Use absolute paths from root: /assets/...
- For processed assets, import in JS: import logo from './logo.png'

### Module errors
- Check import paths use .js extension
- Verify modules exist in /src/js/modules/
- Use path aliases: @js, @data, @styles

### Build errors
- Clear node_modules and reinstall: m -rf node_modules && npm install
- Clear Vite cache: m -rf node_modules/.vite

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [ES6 Modules Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Node.js Documentation](https://nodejs.org/)

---

**Migration Date**: January 28, 2026
**Tool Used**: Vite 5.0
**Node Version**: 18+
