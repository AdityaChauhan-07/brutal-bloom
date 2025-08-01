import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BrutalistNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-primary hover-target"
        style={{ boxShadow: 'var(--shadow-brutal)' }}
      >
        <div className="relative w-6 h-4 mx-auto">
          <span 
            className={`absolute top-0 left-0 w-full h-0.5 bg-ink transition-all duration-300 ${
              isOpen ? 'rotate-45 top-1.5' : ''
            }`}
          />
          <span 
            className={`absolute top-1.5 left-0 w-full h-0.5 bg-ink transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`absolute top-3 left-0 w-full h-0.5 bg-ink transition-all duration-300 ${
              isOpen ? '-rotate-45 top-1.5' : ''
            }`}
          />
        </div>
      </button>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex items-center justify-center min-h-screen p-8">
          <nav className="text-center">
            <h2 className="font-display text-4xl md:text-6xl font-black mb-12 text-glitch" data-text="NAVIGATION">
              NAVIGATION
            </h2>
            <ul className="space-y-6">
              {routes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`block font-mono text-xl md:text-2xl font-bold uppercase tracking-wider hover-target transition-all duration-300 ${
                      location.pathname === route.path 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default BrutalistNavbar;