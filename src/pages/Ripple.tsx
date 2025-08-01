import { useState, useCallback } from 'react';

const Ripple = () => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl font-black mb-16 text-center">
          RIPPLE EFFECT
        </h1>
        
        <div className="text-center mb-12">
          <p className="font-mono text-lg">
            Click anywhere on the area below to create ripple effects
          </p>
        </div>
        
        <div
          className="relative h-96 border-2 border-concrete bg-steel overflow-hidden cursor-none hover-target"
          onClick={createRipple}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xl font-bold text-foreground uppercase tracking-wider">
              CLICK TO RIPPLE
            </span>
          </div>
          
          {/* Ripple Animations */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--primary))',
                transform: 'translate(-50%, -50%) scale(0)',
                animation: 'ripple-expand 0.6s ease-out forwards',
              }}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes ripple-expand {
          to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Ripple;