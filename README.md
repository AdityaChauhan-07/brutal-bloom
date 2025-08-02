# 🏗️ BRUTAL BLOOM

A **brutalist web design showcase** featuring cutting-edge CSS animations, 3D effects, and interactive elements. Built with React, TypeScript, and pure CSS transforms.

## ✨ Features

### 🎨 Interactive Elements
- **Custom Cursor**: Dynamic cursor with hover states and smooth animations
- **Brutalist Navbar**: Animated hamburger menu with sliding panels
- **Image Hover Effects**: SVG mask reveals with splatter animations
- **3D Rubik's Cube**: Pure CSS 3D transforms with solving algorithms
- **Scroll Text Animation**: Card-stacking letter reveals with synchronized backgrounds
- **Team Section**: Interactive photo popups with responsive design

### 🏗️ Design Philosophy
- **Raw Brutalism**: Concrete textures, bold typography, harsh edges
- **High Contrast**: Electric yellow accents on dark backgrounds  
- **Geometric Layouts**: Asymmetrical grids and overlapping elements
- **Interactive Animations**: Smooth transitions with cubic-bezier easing

## 🚀 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/brutal-bloom)

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Preview locally**:
   ```bash
   npm run preview
   ```

3. **Deploy to your platform**:
   - Upload the `dist/` folder to your hosting provider
   - Ensure proper routing for SPA (Single Page Application)

### Environment Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:5173
   ```

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router DOM
- **Animations**: Pure CSS transforms and keyframes
- **3D Effects**: CSS `transform-style: preserve-3d`

## 📁 Project Structure

```
brutal-bloom/
├── src/
│   ├── components/          # Reusable components
│   │   ├── CustomCursor.tsx # Dynamic cursor implementation
│   │   └── BrutalistNavbar.tsx # Animated navigation
│   ├── pages/               # Page components
│   │   ├── ImageHover.tsx   # SVG mask image effects
│   │   ├── Mystery.tsx      # 3D Rubik's cube
│   │   ├── ScrollText.tsx   # Card stacking animation
│   │   └── Team.tsx         # Interactive team section
│   ├── components/ui/       # shadcn/ui components
│   └── lib/                 # Utility functions
├── public/                  # Static assets
└── dist/                    # Built files (generated)
```

## 🎯 Performance Optimizations

- **Lazy Loading**: Route-based code splitting
- **CSS Optimization**: Tailwind purging and minification
- **Image Optimization**: WebP support and lazy loading
- **Security Headers**: CSP, CSRF protection via Vercel config
- **Caching**: Static asset caching with proper headers

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors

# Deployment
npm run deploy          # Build and preview
npm run clean           # Clean dist folder
```

## 🎨 Customization

### Color Scheme
- **Primary**: Electric Yellow (`#FFFF00`)
- **Background**: Dark (`#0A0A0A`)
- **Concrete**: Medium Gray (`#666666`)
- **Steel**: Light Gray (`#999999`)

### Typography
- **Display**: Bold, geometric sans-serif
- **Mono**: Monospace for technical elements
- **Brutalist Shadows**: Multiple layered text shadows

### Animations
- **Easing**: Custom cubic-bezier curves
- **Duration**: 300ms-1200ms for different effects
- **Performance**: Hardware-accelerated transforms

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **3D Transforms**: Full support for CSS 3D effects
- **Custom Properties**: CSS variables for theming
- **ES Modules**: Native ESM support required

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-effect`
3. Commit changes: `git commit -m 'Add amazing effect'`
4. Push to branch: `git push origin feature/amazing-effect`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ⚡ by Brutal Bloom** | **Experience Raw Digital Architecture**