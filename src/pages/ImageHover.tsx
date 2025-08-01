import { useState } from 'react';

const ImageHover = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const images = [
    { id: 'img1', title: 'BRUTALIST ARCHITECTURE' },
    { id: 'img2', title: 'CONCRETE DREAMS' },
    { id: 'img3', title: 'GEOMETRIC FORMS' },
  ];

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl font-black mb-16 text-center">
          IMAGE HOVER
        </h1>
        
        <div className="space-y-8">
          {images.map((image) => (
            <div 
              key={image.id}
              className="relative border-2 border-concrete p-8 hover-lift cursor-none hover-target"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <h2 className="font-mono text-2xl font-bold uppercase tracking-wider">
                {image.title}
              </h2>
              {hoveredImage === image.id && (
                <div className="absolute inset-0 bg-accent bg-opacity-20 border-2 border-accent animate-pulse">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-mono text-lg font-bold text-accent-foreground">
                      [IMAGE PREVIEW]
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageHover;