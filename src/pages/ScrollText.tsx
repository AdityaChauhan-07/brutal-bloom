import { useEffect, useState } from 'react';

const ScrollText = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textScale = Math.max(0.5, 1 + scrollY * 0.001);
  const textOpacity = Math.max(0.3, 1 - scrollY * 0.002);

  return (
    <div className="bg-background">
      <div className="min-h-screen p-8">
        <h1 className="font-display text-6xl md:text-8xl font-black mb-16 text-center">
          SCROLL TEXT
        </h1>
        
        <div className="h-screen flex items-center justify-center">
          <div
            className="text-center transition-all duration-100"
            style={{
              transform: `scale(${textScale})`,
              opacity: textOpacity,
            }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-black text-primary">
              SCROLL TO TRANSFORM
            </h2>
            <p className="font-mono text-lg mt-4 text-muted-foreground">
              Scale: {textScale.toFixed(2)} | Opacity: {textOpacity.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Extra content to enable scrolling */}
      <div className="h-screen bg-concrete">
        <div className="p-8 flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="font-display text-4xl font-black text-paper mb-4">
              KEEP SCROLLING
            </h3>
            <p className="font-mono text-lg text-ash">
              Watch the text above transform as you scroll
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-screen bg-steel">
        <div className="p-8 flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="font-display text-4xl font-black text-paper mb-4">
              SCROLL DYNAMICS
            </h3>
            <p className="font-mono text-lg text-ash">
              Brutalist design meets interactive motion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollText;