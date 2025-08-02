import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BrutalistNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  const routes = [
    { path: '/', name: 'HOME' },
    { path: '/loader', name: 'LOADER' },
    { path: '/image-hover', name: 'IMAGE HOVER' },
    { path: '/image-grid', name: 'IMAGE GRID' },
    { path: '/marquee', name: 'MARQUEE' },
    { path: '/team', name: 'TEAM' },
    { path: '/scroll-text', name: 'SCROLL TEXT' },
    { path: '/mystery', name: 'MYSTERY' },
  ];

  const toggleMenu = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Enhanced Brutalist Hamburger Button - Grey/Black/Yellow Theme */}
      <button
        onClick={toggleMenu}
        className={`fixed top-6 right-6 z-50 w-16 h-16 bg-primary border-4 border-foreground transition-all duration-300 hover-target group ${
          isOpen ? 'bg-concrete rotate-90 scale-110 border-background' : 'hover:bg-foreground hover:rotate-3 hover:border-primary'
        } ${isAnimating ? 'animate-pulse' : ''}`}
        style={{ 
          boxShadow: isOpen ? '12px 12px 0px hsl(var(--background) / 0.8)' : '8px 8px 0px hsl(var(--background) / 0.6)',
          clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)'
        }}
      >
        <div className="relative w-8 h-6 mx-auto">
          {/* Top Line */}
          <span 
            className={`absolute left-0 w-full h-1 transition-all duration-500 ease-in-out ${
              isOpen 
                ? 'top-2.5 rotate-45 w-8 bg-background' 
                : 'top-0 bg-background group-hover:w-6 group-hover:translate-x-1 group-hover:bg-primary'
            }`}
            style={{
              transformOrigin: 'center',
              boxShadow: isOpen ? 'none' : '1px 1px 0px hsl(var(--background) / 0.6)'
            }}
          />
          
          {/* Middle Line */}
          <span 
            className={`absolute left-0 top-2.5 w-full h-1 transition-all duration-300 ${
              isOpen 
                ? 'opacity-0 scale-0 rotate-90 bg-background' 
                : 'bg-background group-hover:w-8 group-hover:-translate-x-1 group-hover:bg-primary'
            }`}
            style={{
              boxShadow: isOpen ? 'none' : '1px 1px 0px hsl(var(--background) / 0.6)'
            }}
          />
          
          {/* Bottom Line */}
          <span 
            className={`absolute left-0 w-full h-1 transition-all duration-500 ease-in-out ${
              isOpen 
                ? 'top-2.5 -rotate-45 w-8 bg-background' 
                : 'top-5 bg-background group-hover:w-4 group-hover:translate-x-2 group-hover:bg-primary'
            }`}
            style={{
              transformOrigin: 'center',
              boxShadow: isOpen ? 'none' : '1px 1px 0px hsl(var(--background) / 0.6)'
            }}
          />
        </div>
        
        {/* Brutalist Corner Details - Grey/Yellow Theme */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 bg-steel transition-all duration-300 ${
          isOpen ? 'scale-0' : 'group-hover:scale-125'
        }`} />
        <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-concrete transition-all duration-300 ${
          isOpen ? 'scale-0' : 'group-hover:scale-150'
        }`} />
      </button>

      {/* Brutalist Menu Overlay with Sliding Animation */}
      <div 
        className={`fixed inset-0 z-40 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Grey/Black/Yellow Background Panels - Clean but Brutal */}
        <div 
          className={`absolute inset-0 bg-background transition-all duration-700 ease-in-out ${
            isOpen ? 'translate-x-0 opacity-95' : '-translate-x-full opacity-0'
          }`}
          style={{ clipPath: 'polygon(0 0, 75% 0, 90% 100%, 0 100%)' }}
        />
        <div 
          className={`absolute inset-0 bg-primary transition-all duration-500 delay-100 ease-in-out ${
            isOpen ? 'translate-y-0 opacity-90' : '-translate-y-full opacity-0'
          }`}
          style={{ clipPath: 'polygon(75% 0, 100% 0, 100% 65%, 90% 100%)' }}
        />
        <div 
          className={`absolute inset-0 bg-concrete transition-all duration-600 delay-200 ease-in-out ${
            isOpen ? 'scale-100 opacity-85' : 'scale-0 opacity-0'
          }`}
          style={{ 
            clipPath: 'polygon(90% 100%, 100% 65%, 100% 100%)',
            transformOrigin: 'bottom right'
          }}
        />
        
        {/* Concrete Texture Pattern - Brutalist Industrial Feel */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isOpen ? 'opacity-10' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 35%, hsl(var(--foreground) / 0.05) 35.5%, hsl(var(--foreground) / 0.05) 36%, transparent 36.5%), 
              linear-gradient(-45deg, transparent 35%, hsl(var(--foreground) / 0.05) 35.5%, hsl(var(--foreground) / 0.05) 36%, transparent 36.5%),
              linear-gradient(0deg, transparent 48%, hsl(var(--foreground) / 0.03) 49%, hsl(var(--foreground) / 0.03) 51%, transparent 52%)
            `,
            backgroundSize: '20px 20px, 20px 20px, 100% 4px'
          }}
        />

        {/* Navigation Content */}
        <div 
          className="flex items-center justify-center min-h-screen p-8 relative"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <nav className="text-center">
            {/* Clean but Brutal Title - Inspired by Agency Style */}
            <h2 
              className={`font-display text-6xl md:text-9xl font-black mb-20 transition-all duration-800 ${
                isOpen 
                  ? 'opacity-100 translate-y-0 rotate-0' 
                  : 'opacity-0 translate-y-20 rotate-12'
              }`}
              style={{
                textShadow: isOpen ? '6px 6px 0px hsl(var(--primary))' : 'none',
                filter: isOpen ? 'none' : 'blur(4px)',
                color: 'hsl(var(--foreground))',
                letterSpacing: '-0.05em'
              }}
            >
              MENU
            </h2>
            
            {/* Navigation Links with Staggered Animation */}
            <ul className="space-y-8">
              {routes.map((route, index) => (
                <li 
                  key={route.path}
                  className={`transition-all duration-500 ease-out ${
                    isOpen 
                      ? 'opacity-100 translate-x-0 rotate-0' 
                      : 'opacity-0 translate-x-20 rotate-6'
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 100 + 300}ms` : '0ms'
                  }}
                >
                  <Link
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      block font-mono text-2xl md:text-4xl font-black uppercase tracking-wider 
                      hover-target transition-all duration-300 relative group overflow-hidden
                      ${location.pathname === route.path 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-background'
                      }
                    `}
                    style={{
                      textShadow: location.pathname === route.path 
                        ? '3px 3px 0px hsl(var(--background))' 
                        : isOpen ? '3px 3px 0px hsl(var(--background) / 0.5)' : 'none',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {/* Grey/Yellow Hover Background Effect */}
                    <div 
                      className={`absolute inset-0 bg-steel transform transition-transform duration-300 z-0 ${
                        location.pathname === route.path ? 'scale-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ transformOrigin: 'left' }}
                    />
                    
                    <span className="relative z-20 mix-blend-mode-normal">{route.name}</span>
                    
                    {/* Brutalist Corner Accents - Grey/Yellow Theme */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-concrete opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Clean Close Instructions */}
            <div 
              className={`mt-24 text-foreground font-mono text-sm uppercase tracking-widest transition-all duration-1000 ${
                isOpen ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isOpen ? '1200ms' : '0ms',
                letterSpacing: '0.3em'
              }}
            >
              Click anywhere to close
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default BrutalistNavbar;