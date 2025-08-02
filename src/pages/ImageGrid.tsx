import { useState, useEffect, useRef } from 'react';

const ImageGrid = () => {
  // Image sources - using high-quality real images
  const imageGroups = {
    group1: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop'
    ],
    group2: {
      large: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=600&fit=crop',
      small1: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&h=300&fit=crop',
      small2: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=300&fit=crop'
    },
    group3: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=500&fit=crop',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=700&h=500&fit=crop'
    ],
    group4: {
      large: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&h=600&fit=crop',
      small1: 'https://images.unsplash.com/photo-1464822759844-d150ad6fbeb8?w=300&h=300&fit=crop',
      small2: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=300&h=300&fit=crop'
    }
  };

  // Image loading state and scroll effects
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set(prev).add(src));
  };

  const getFallbackImage = (index: number) => 
    `https://picsum.photos/600/400?random=${index}`;

  // Handle scroll events for parallax and pull-up effects
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Helper function to determine if we're in transition between sections
  const getTransitionOffset = (sectionIndex: number) => {
    const sectionScrollY = window.innerHeight * sectionIndex;
    const distanceFromSection = Math.abs(scrollY - sectionScrollY);
    const transitionThreshold = window.innerHeight * 0.5; // Increased to 50% for more gradual transitions
    
    // Create a smooth transition factor that goes from 0 (stationary) to 1 (full animation)
    const transitionFactor = Math.min(1, distanceFromSection / transitionThreshold);
    
    // Apply a gentler easing function for smoother transitions
    const easedFactor = Math.pow(transitionFactor, 1.5); // Power curve for gentler transitions
    
    // Return the offset multiplied by the eased transition factor
    return (scrollY - sectionScrollY) * easedFactor;
  };

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto bg-background snap-y snap-mandatory">
      {/* Group 1: Header + 3 horizontal images */}
      <section className="h-screen flex flex-col bg-background snap-start">
        {/* Header */}
        <header className="relative z-10 bg-background border-b-2 border-concrete flex-shrink-0">
          <div className="container mx-auto px-6 py-8">
            <h1 className="font-display text-5xl md:text-7xl font-black text-center text-foreground">
              IMAGES GRID
            </h1>
          </div>
        </header>

        {/* Images Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-6">
            <div 
              className="flex flex-col lg:flex-row gap-8 items-center justify-center max-w-7xl mx-auto"
              style={{
                transform: `translateY(${Math.min(100, Math.max(-50, getTransitionOffset(0) * 0.3))}px)`,
                opacity: Math.max(0.6, 1 - Math.abs(getTransitionOffset(0)) * 0.0005),
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {imageGroups.group1.map((src, index) => (
                <div 
                  key={index} 
                  className="relative group flex-1"
                  style={{
                    transform: `translateY(${Math.min(120, Math.max(-30, getTransitionOffset(0) * 0.2 * (index + 1)))}px)`,
                    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                >
                  <div className="overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105">
                    <img
                      src={imageErrors.has(src) ? getFallbackImage(index) : src}
                      alt={`Landscape ${index + 1}`}
                      className="w-full h-80 lg:w-96 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={() => handleImageError(src)}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Group 2: Square frame - large image with 2 smaller ones */}
      <section className="h-screen flex items-center justify-center bg-steel/10 snap-start">
        <div className="container mx-auto px-6">
          <div 
            className="flex items-center justify-center max-w-7xl mx-auto"
            style={{
              transform: `translateY(${Math.min(150, Math.max(-100, getTransitionOffset(1) * 0.4))}px)`,
              opacity: Math.max(0.6, 1 - Math.abs(getTransitionOffset(1)) * 0.0005),
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {/* Square container that fits all 3 images */}
            <div className="w-[600px] h-[600px] grid grid-cols-2 grid-rows-2 gap-4">
              {/* Large image - spans 2 rows */}
              <div 
                className="relative group row-span-2"
                style={{
                  transform: `translateY(${Math.min(100, Math.max(-50, getTransitionOffset(1) * 0.25))}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 h-full">
                  <img
                    src={imageErrors.has(imageGroups.group2.large) ? getFallbackImage(10) : imageGroups.group2.large}
                    alt="Featured landscape"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(imageGroups.group2.large)}
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Two smaller images stacked on the right */}
              <div 
                className="relative group"
                style={{
                  transform: `translateY(${Math.min(120, Math.max(-30, getTransitionOffset(1) * 0.3))}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 h-full">
                  <img
                    src={imageErrors.has(imageGroups.group2.small1) ? getFallbackImage(11) : imageGroups.group2.small1}
                    alt="Mountain landscape"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(imageGroups.group2.small1)}
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div 
                className="relative group"
                style={{
                  transform: `translateY(${Math.min(80, Math.max(-70, getTransitionOffset(1) * 0.15))}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 h-full">
                  <img
                    src={imageErrors.has(imageGroups.group2.small2) ? getFallbackImage(12) : imageGroups.group2.small2}
                    alt="Ocean landscape"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(imageGroups.group2.small2)}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group 3: 2 horizontal images centered */}
      <section className="h-screen flex items-center justify-center bg-background snap-start">
        <div className="container mx-auto px-6">
          <div 
            className="flex flex-col lg:flex-row gap-8 items-center justify-center max-w-7xl mx-auto"
            style={{
              transform: `translateY(${Math.min(150, Math.max(-100, getTransitionOffset(2) * 0.5))}px)`,
              opacity: Math.max(0.6, 1 - Math.abs(getTransitionOffset(2)) * 0.0005),
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {imageGroups.group3.map((src, index) => (
              <div 
                key={index} 
                className="relative group flex-1"
                style={{
                  transform: `translateY(${Math.min(130, Math.max(-50, getTransitionOffset(2) * 0.3 * (index + 1)))}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105">
                  <img
                    src={imageErrors.has(src) ? getFallbackImage(index + 20) : src}
                    alt={`Centered landscape ${index + 1}`}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(src)}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group 4: Square frame - alternate layout (2 small on top, 1 large below) */}
      <section className="h-screen flex items-center justify-center bg-steel/10 snap-start">
        <div className="container mx-auto px-6">
          <div 
            className="flex items-center justify-center max-w-7xl mx-auto"
            style={{
              transform: `translateY(${Math.min(200, Math.max(-150, getTransitionOffset(3) * 0.6))}px)`,
              opacity: Math.max(0.6, 1 - Math.abs(getTransitionOffset(3)) * 0.0005),
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {/* Square container that fits all 3 images */}
            <div className="w-[600px] h-[600px] grid grid-cols-2 grid-rows-2 gap-4">
              {/* Two smaller images on top row */}
              <div 
                className="relative group"
                style={{
                  transform: `translateY(${Math.min(150, Math.max(-50, getTransitionOffset(3) * 0.4))}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 h-full">
                  <img
                    src={imageErrors.has(imageGroups.group4.small1) ? getFallbackImage(30) : imageGroups.group4.small1}
                    alt="Forest landscape"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(imageGroups.group4.small1)}
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div 
                className="relative group"
                style={{
                  transform: `translateY(${Math.min(120, Math.max(-30, getTransitionOffset(3) * 0.3))}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 h-full">
                  <img
                    src={imageErrors.has(imageGroups.group4.small2) ? getFallbackImage(31) : imageGroups.group4.small2}
                    alt="Desert landscape"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(imageGroups.group4.small2)}
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Large image spans bottom row (2 columns) */}
              <div 
                className="relative group col-span-2"
                style={{
                  transform: `translateY(${Math.min(80, Math.max(-80, getTransitionOffset(3) * 0.2))}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 h-full">
                  <img
                    src={imageErrors.has(imageGroups.group4.large) ? getFallbackImage(32) : imageGroups.group4.large}
                    alt="Hero landscape"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(imageGroups.group4.large)}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageGrid;