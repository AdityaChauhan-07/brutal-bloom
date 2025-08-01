import { useState } from 'react';

const ImageGrid = () => {
  const [activeGrid, setActiveGrid] = useState<number | null>(null);

  const gridItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `GRID ${String(i + 1).padStart(2, '0')}`,
  }));

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl font-black mb-16 text-center">
          IMAGE GRID
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square border-2 border-concrete bg-steel hover-target cursor-none relative overflow-hidden"
              onMouseEnter={() => setActiveGrid(item.id)}
              onMouseLeave={() => setActiveGrid(null)}
              style={{
                transform: activeGrid === item.id ? 'scale(1.05)' : 'scale(1)',
                transition: 'var(--transition-brutal)',
                boxShadow: activeGrid === item.id ? 'var(--shadow-neon)' : 'none',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-foreground">
                  {item.title}
                </span>
              </div>
              {activeGrid === item.id && (
                <div className="absolute inset-0 bg-primary bg-opacity-30 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;