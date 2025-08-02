import { useState, useEffect, useRef } from 'react';

const Marquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  // Calculate the width of one complete set of images
  useEffect(() => {
    if (containerRef.current) {
      // Small delay to ensure layout is complete
      setTimeout(() => {
        if (containerRef.current) {
          const totalWidth = containerRef.current.scrollWidth;
          // Now we have 4 sets, so divide by 4
          setSingleSetWidth(Math.round(totalWidth / 4));
        }
      }, 100);
    }
  }, []);

  // Continuous animation when not paused
  useEffect(() => {
    if (!isPaused && singleSetWidth > 0) {
      let animationId: number;
      
      const animate = () => {
        setTranslateX(prev => {
          const newPos = prev - 1.5;
          // Reset when we've moved 2 sets (halfway through), keeping 2 sets still visible
          if (newPos <= -singleSetWidth * 2) {
            return newPos + singleSetWidth; // Move back by just one set
          }
          return newPos;
        });
        
        if (!isPaused) {
          animationId = requestAnimationFrame(animate);
        }
      };
      
      animationId = requestAnimationFrame(animate);
      
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [isPaused, singleSetWidth]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Sample placeholder images - you can replace these with actual image URLs
  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", alt: "Architecture 1" },
    { id: 2, src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop", alt: "Architecture 2" },
    { id: 3, src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop", alt: "Architecture 3" },
    { id: 4, src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", alt: "Architecture 4" },
    { id: 5, src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop", alt: "Architecture 5" },
    { id: 6, src: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=400&h=300&fit=crop", alt: "Architecture 6" },
    { id: 7, src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop", alt: "Architecture 7" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-8">
        <h1 className="font-display text-6xl md:text-8xl font-black mb-16 text-center animate-emerge-from-void">
          INFINITE MARQUEE
        </h1>
      </div>
      
      {/* Single Image Marquee - Centered */}
      <div className="flex-1 flex items-center">
        <div className="w-full py-8 overflow-hidden">
          <div 
            ref={containerRef}
            className="flex items-center"
            style={{ 
              width: 'fit-content',
              transform: `translateX(${translateX}px)`,
              transition: isPaused ? 'none' : 'none'
            }}
          >
            {/* Duplicate images for seamless infinite scroll - 4 sets for ultra smooth transitions */}
            {[...images, ...images, ...images, ...images].map((image, index) => (
              <>
                <div
                  key={`${image.id}-${index}`}
                  className="flex-shrink-0 relative group cursor-pointer p-2"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-96 h-72 bg-background overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 ease-out"
                    />
                  </div>
                </div>
                {/* Faint separator line between images */}
                {index < ([...images, ...images, ...images, ...images].length - 1) && (
                  <div className="w-px h-48 bg-muted-foreground/20 mx-4"></div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;