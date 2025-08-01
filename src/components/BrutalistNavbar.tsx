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
    { path: '/ripple', name: 'RIPPLE' },
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
      {/* Enhanced Brutalist Hamburger Button */}
      <button
        onClick={toggleMenu}
        className={`fixed top-6 right-6 z-50 w-16 h-16 bg-foreground border-4 border-background transition-all duration-300 hover-target group ${
          isOpen ? 'bg-primary rotate-90 scale-110' : 'hover:bg-accent hover:rotate-3'
        } ${isAnimating ? 'animate-pulse' : ''}`}
        style={{ 
          boxShadow: isOpen ? '12px 12px 0px rgba(0, 0, 0, 0.8)' : '8px 8px 0px rgba(0, 0, 0, 0.6)',
          clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)'
        }}
      >
        <div className="relative w-8 h-6 mx-auto">
          {/* Top Line */}
          <span 
            className={`absolute left-0 w-full h-1 bg-background transition-all duration-500 ease-in-out ${
              isOpen 
                ? 'top-2.5 rotate-45 w-8 bg-foreground' 
                : 'top-0 group-hover:w-6 group-hover:translate-x-1'
            }`}
            style={{
              transformOrigin: 'center',
              boxShadow: isOpen ? 'none' : '2px 2px 0px rgba(0, 0, 0, 0.4)'
            }}
          />
          
          {/* Middle Line */}
          <span 
            className={`absolute left-0 top-2.5 w-full h-1 bg-background transition-all duration-300 ${
              isOpen 
                ? 'opacity-0 scale-0 rotate-90' 
                : 'group-hover:w-8 group-hover:-translate-x-1'
            }`}
            style={{
              boxShadow: isOpen ? 'none' : '2px 2px 0px rgba(0, 0, 0, 0.4)'
            }}
          />
          
          {/* Bottom Line */}
          <span 
            className={`absolute left-0 w-full h-1 bg-background transition-all duration-500 ease-in-out ${
              isOpen 
                ? 'top-2.5 -rotate-45 w-8 bg-foreground' 
                : 'top-5 group-hover:w-4 group-hover:translate-x-2'
            }`}
            style={{
              transformOrigin: 'center',
              boxShadow: isOpen ? 'none' : '2px 2px 0px rgba(0, 0, 0, 0.4)'
            }}
          />
        </div>
        
        {/* Brutalist Corner Details */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 bg-primary transition-all duration-300 ${
          isOpen ? 'scale-0' : 'group-hover:scale-125'
        }`} />
        <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-accent transition-all duration-300 ${
          isOpen ? 'scale-0' : 'group-hover:scale-150'
        }`} />
      </button>

      {/* Brutalist Menu Overlay with Sliding Animation */}
      <div 
        className={`fixed inset-0 z-40 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Background Panels - Sliding from different directions */}
        <div 
          className={`absolute inset-0 bg-foreground transition-all duration-700 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ clipPath: 'polygon(0 0, 70% 0, 85% 100%, 0 100%)' }}
        />
        <div 
          className={`absolute inset-0 bg-accent transition-all duration-500 delay-100 ease-in-out ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 60%, 85% 100%)' }}
        />
        <div 
          className={`absolute inset-0 bg-primary transition-all duration-600 delay-200 ease-in-out ${
            isOpen ? 'scale-100' : 'scale-0'
          }`}
          style={{ 
            clipPath: 'polygon(85% 100%, 100% 60%, 100% 100%)',
            transformOrigin: 'bottom right'
          }}
        />
        
        {/* Brutalist Grid Background Pattern */}
        <div 
          className={`absolute inset-0 opacity-10 transition-opacity duration-1000 ${
            isOpen ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0.1) 76%, transparent 77%), 
              linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0.1) 76%, transparent 77%)
            `,
            backgroundSize: '40px 40px'
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
            {/* Animated Title */}
            <h2 
              className={`font-display text-5xl md:text-8xl font-black mb-16 transition-all duration-800 ${
                isOpen 
                  ? 'opacity-100 translate-y-0 rotate-0' 
                  : 'opacity-0 translate-y-20 rotate-12'
              }`}
              style={{
                textShadow: isOpen ? '8px 8px 0px rgba(0, 0, 0, 0.3)' : 'none',
                filter: isOpen ? 'none' : 'blur(4px)',
                color: 'var(--background)',
                WebkitTextStroke: '2px var(--foreground)'
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
                        : 'text-background hover:text-accent'
                      }
                    `}
                    style={{
                      textShadow: '4px 4px 0px rgba(0, 0, 0, 0.5)',
                      WebkitTextStroke: location.pathname === route.path ? '0' : '1px var(--foreground)'
                    }}
                  >
                    <span className="relative z-10">{route.name}</span>
                    
                    {/* Hover Background Effect */}
                    <div 
                      className={`absolute inset-0 bg-primary transform transition-transform duration-300 ${
                        location.pathname === route.path ? 'scale-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ transformOrigin: 'left' }}
                    />
                    
                    {/* Brutalist Corner Accent */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Close Instructions */}
            <div 
              className={`mt-20 text-background font-mono text-sm uppercase tracking-widest transition-all duration-1000 ${
                isOpen ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isOpen ? '1000ms' : '0ms' }}
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