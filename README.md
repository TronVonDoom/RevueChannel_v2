# RevueChannel v2.0

A nostalgic 90s-style TV Guide Channel with video promos and advertisements.

## Features

- 📺 Authentic 90s TV Guide interface
- 🎬 Video promo integration
- 📊 Grid-based channel listings
- 🎵 Audio controls
- ⏰ Real-time programming updates
- 🎨 Retro styling and animations

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
RevueChannel_v2/
├── src/
│   ├── js/
│   │   ├── modules/         # Application modules
│   │   └── tv-guide-app.js  # Main application
│   ├── data/                # Channel data and configurations
│   └── styles/              # CSS stylesheets
├── public/
│   └── assets/              # Static assets (fonts, images, videos)
├── index.html               # Main HTML file
├── package.json
└── vite.config.js          # Vite configuration
```

## Development

The project uses Vite for fast development and building. The dev server includes hot module replacement (HMR) for instant updates during development.

## Technologies

- **Build Tool**: Vite
- **Language**: JavaScript (ES6+ modules)
- **Styling**: CSS3
- **Video**: HTML5 Video API

## License

MIT
