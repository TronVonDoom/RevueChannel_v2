# RevueChannel v2 - Quick Start Guide

##  Get Running in 3 Steps

### 1 Install Dependencies
```powershell
cd c:\Users\MJTHIBOD\Documents\Github\Projects\RevueChannel_v2
npm install
```

### 2 Start Development Server
```powershell
npm run dev
```

The app will automatically open in your browser at **http://localhost:3000**

### 3 Start Coding!
Edit files in the /src directory and see changes instantly.

---

##  What Got Installed

When you run 
pm install, you'll get:
- **Vite** - Lightning-fast build tool
- **ESLint** - Code quality checker

---

##  Common Commands

| Command | What It Does |
|---------|--------------|
| 
pm run dev | Start dev server with hot reload |
| 
pm run build | Build for production |
| 
pm run preview | Preview production build |
| 
pm run lint | Check code quality |

---

##  Where Everything Is

```
RevueChannel_v2/
 src/
    js/            Your JavaScript code
    data/          Channel data & configs
    styles/        CSS files
 public/
    assets/        Fonts, images, videos
 index.html         Main HTML file
```

---

##  Hot Tips

** Auto-Refresh**: Save any file and see changes instantly - no manual refresh!

** CSS Changes**: Edit src/styles/styles.css and watch it update live

** Fast Builds**: Vite only rebuilds what changed, making it super fast

** Debugging**: Source maps are enabled - debug original source code in browser

---

##  Quick Troubleshooting

### Port 3000 already in use?
Edit ite.config.js and change the port number

### Assets not showing?
Put them in the /public/assets/ folder

### Module errors?
Make sure all imports end with .js

---

##  Learn More

- **SETUP.md** - Detailed setup instructions
- **MIGRATION.md** - What changed from v1
- **README.md** - Full project documentation

---

##  You're Ready!

Just run 
pm install then 
pm run dev and you're good to go!

Happy coding! 
