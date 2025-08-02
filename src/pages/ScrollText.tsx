import { useEffect, useState, useRef } from 'react';

const ScrollText = () => {
  const [virtualScrollY, setVirtualScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const containerRef = useRef<HTMLDivElement>(null);
  const virtualScroll = useRef(0);
  const targetScroll = useRef(0);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    // Smooth scroll interpolation like Barba.js
    const smoothScrollLoop = () => {
      const current = virtualScroll.current;
      const target = targetScroll.current;
      const diff = target - current;
      
      // Smooth interpolation with easing
      const ease = 0.08; // Lower = smoother
      virtualScroll.current += diff * ease;
      
      // Update state if there's significant change
      if (Math.abs(diff) > 0.1) {
        setVirtualScrollY(virtualScroll.current);
      }
      
      animationFrameId.current = requestAnimationFrame(smoothScrollLoop);
    };

    const handleWheel = (e: WheelEvent) => {
      // Allow normal page scrolling
      
      const scrollSpeed = 1.5; // Responsive but smooth
      const direction = e.deltaY > 0 ? 'down' : 'up';
      
      // Update target scroll position (Barba.js style)
      targetScroll.current += e.deltaY * scrollSpeed;
      targetScroll.current = Math.max(0, targetScroll.current); // Don't go below 0
      
      setScrollDirection(direction);
    };

    // Start smooth scroll loop
    smoothScrollLoop();

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Text stacking logic - reveal letters based on scroll position
  const mainWord = "BRUTALIST";
  
  // Calculate how many letters to show based on virtual scroll position
  // Start with full word, then reduce as you scroll (reverse logic)
  const getVisibleLetters = (word: string, scrollMultiplier: number, offset: number = 0) => {
    const scrollProgress = Math.max(0, virtualScrollY - offset);
    const lettersToHide = Math.floor(scrollProgress / scrollMultiplier);
    const lettersToShow = Math.max(1, word.length - lettersToHide); // Always show at least 1 letter
    return Math.min(word.length, lettersToShow);
  };

  const mainLettersVisible = getVisibleLetters(mainWord, 40, 80);

                        // Helper function to render progressive word builds that cascade down position by position
  const renderStackedText = (word: string, lettersVisible: number, baseSize: number = 8, sectionIndex: number = 0, textColor: string = 'text-foreground') => {
    const lineHeight = baseSize * 16 * 0.8; // Calculate line height in pixels

  return (
      <div className="flex flex-col items-start relative" style={{ minHeight: `${word.length * lineHeight}px` }}>
        {/* All progressive word builds start visible: B, BR, BRU, BRUT, BRUTA, BRUTAL, BRUTALI, BRUTALIS, BRUTALIST */}
        {Array.from({ length: word.length }, (_, index) => {
          const progressiveWord = word.substring(0, index + 1); // B, BR, BRU, BRUT, etc.
          const shouldBeVisible = index >= (word.length - lettersVisible); // Words before this threshold should move down
          const animationDelay = (index * 50) + (sectionIndex * 20);
          
          // Calculate position: Hidden cards should follow the card that's covering them
          const originalPosition = index * lineHeight;
          
          let targetPosition;
          if (shouldBeVisible) {
            // If visible, stay in original position
            targetPosition = originalPosition;
          } else {
            // If hidden, move to the same position as the lowest visible card (the one covering the stack)
            // The lowest visible card index is (word.length - lettersVisible)
            const lowestVisibleIndex = word.length - lettersVisible;
            const lowestVisiblePosition = lowestVisibleIndex * lineHeight;
            targetPosition = lowestVisiblePosition;
          }
          
                                return (
             <div
               key={index}
               className={`font-display font-black ${textColor} leading-none transition-all ease-out absolute`}
            style={{
                 fontSize: `${baseSize}rem`,
                 textShadow: '8px 8px 0px hsl(var(--primary)), 16px 16px 0px hsl(var(--concrete))',
                 opacity: 1, // Always visible - stacking happens via z-index
                 transform: `translateY(${targetPosition}px) translateX(0px) scale(1)`,
                 transitionDelay: `${animationDelay * 0.2}ms`,
                 transitionDuration: '1200ms',
                 transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                 pointerEvents: 'none',
                 zIndex: index + 1, // Longer words have HIGHER z-index: B(z:1) slides under BR(z:2) slides under BRU(z:3)... BRUTALIST(z:9) stays on top
                 filter: 'blur(0px)',
                 left: 0,
                 top: 0,
                 backgroundColor: 'hsl(var(--background))', // Solid background for card-like effect
                 paddingRight: '24px', // Ensure complete coverage like a card
                 paddingLeft: '4px', // Add some padding for card effect
                 paddingTop: '2px',
                 paddingBottom: '2px',
                 border: '1px solid hsl(var(--foreground) / 0.1)', // Subtle border for card effect
               }}
             >
               {/* Always show the progressive word build: B, BR, BRU, BRUT... */}
               {progressiveWord}
             </div>
           );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Page transition overlay */}
      <div className="fixed inset-0 z-50 animate-page-transition pointer-events-none"></div>
      
      {/* Animated Background Elements - Synced with Text Animation */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Text-Synced Progress Visualization */}
        <div className="absolute right-0 top-0 h-full w-1/3" style={{ opacity: 0.25 }}>
          {/* Card Stack Visualization - Each bar represents a word */}
          {Array.from({ length: mainWord.length }, (_, i) => {
            const isCardVisible = i >= (mainWord.length - mainLettersVisible);
            const cardProgress = mainLettersVisible / mainWord.length;
            
            return (
              <div
                key={i}
                className={`absolute transition-all duration-1200 ease-out ${
                  isCardVisible ? 'bg-primary' : 'bg-steel/50'
                }`}
                style={{
                  right: `${i * 35 + 20}px`,
                  top: '15%',
                  width: '6px',
                  height: `${isCardVisible ? 150 + i * 20 : 80 + i * 10}px`,
                  transform: `translateY(${cardProgress * 100 + i * 10}px) rotate(${cardProgress * 5}deg)`,
                  opacity: isCardVisible ? 0.9 : 0.3,
                  transformOrigin: 'bottom',
                }}
              />
            );
          })}
          
          {/* Diagonal Progress Lines - Show card merging */}
          {Array.from({ length: mainLettersVisible }, (_, i) => (
            <div
              key={`diag-${i}`}
              className="absolute bg-primary/60"
              style={{
                right: `${i * 50 + 40}px`,
                top: `${30 + i * 8}%`,
                width: '3px',
                height: `${120 + mainLettersVisible * 15}px`,
                transform: `translateY(${mainLettersVisible * 8}px) rotate(${30 + i * 10}deg)`,
                transition: 'all 1200ms cubic-bezier(0.23, 1, 0.32, 1)',
                transformOrigin: 'center',
              }}
            />
          ))}
          
          {/* Floating Elements - Represent hidden cards */}
          {Array.from({ length: mainWord.length - mainLettersVisible }, (_, i) => (
            <div
              key={`float-${i}`}
              className="absolute bg-concrete border-2 border-foreground/30"
              style={{
                right: `${i * 60 + 50}px`,
                top: `${45 + i * 12}%`,
                width: `${15 + mainLettersVisible * 2}px`,
                height: `${12 + mainLettersVisible * 1.5}px`,
                transform: `translateY(${mainLettersVisible * 20}px) rotate(${mainLettersVisible * 3 + i * 8}deg) scale(${0.8 + mainLettersVisible * 0.05})`,
                transition: 'all 1200ms cubic-bezier(0.23, 1, 0.32, 1)',
                transformOrigin: 'center',
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        
        {/* Text-Synced Background Grid */}
        <div className="absolute inset-0" style={{ opacity: 0.08 }}>
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(0deg, hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: `${40 + mainLettersVisible * 8}px ${40 + mainLettersVisible * 8}px`,
              transform: `translate(${mainLettersVisible * 10}px, ${mainLettersVisible * 6}px) rotate(${mainLettersVisible * 2}deg)`,
              transition: 'all 1200ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          />
        </div>
        
        {/* Card Progress Indicator */}
        <div 
          className="absolute top-4 right-4 border-2 border-primary transition-all duration-1200"
          style={{
            width: `${20 + mainLettersVisible * 4}px`,
            height: `${20 + mainLettersVisible * 4}px`,
            transform: `rotate(${mainLettersVisible * 40}deg)`,
            opacity: mainLettersVisible > 0 ? 0.8 : 0.3,
            backgroundColor: `hsl(var(--primary) / ${0.1 + mainLettersVisible * 0.05})`,
          }}
        />
        
        {/* Text-Synced Flow Lines */}
        <div className="absolute left-0 top-0 h-full w-20" style={{ opacity: 0.15 }}>
          {Array.from({ length: mainLettersVisible || 1 }, (_, i) => (
            <div
              key={`sync-flow-${i}`}
              className="absolute bg-primary"
              style={{
                left: `${i * 15 + 5}px`,
                top: '0%',
                width: '2px',
                height: '100%',
                transform: `translateY(${i * 30}px) skewX(${mainLettersVisible * 3}deg)`,
                transition: 'all 1200ms cubic-bezier(0.23, 1, 0.32, 1)',
                opacity: 0.4 + (i * 0.1),
              }}
            />
          ))}
        </div>
        
        {/* Card Stack Depth Indicator */}
        <div className="absolute bottom-10 right-10" style={{ opacity: 0.2 }}>
          {Array.from({ length: mainWord.length }, (_, i) => {
            const isStacked = i < (mainWord.length - mainLettersVisible);
            return (
              <div
                key={`depth-${i}`}
                className={`absolute border transition-all duration-1200 ${
                  isStacked ? 'border-steel/40 bg-steel/10' : 'border-primary/60 bg-primary/20'
                }`}
                style={{
                  width: `${30 + i * 3}px`,
                  height: `${20 + i * 2}px`,
                  bottom: `${i * 4}px`,
                  right: `${i * 2}px`,
                  transform: isStacked ? 'scale(0.8) rotate(2deg)' : 'scale(1) rotate(0deg)',
                  zIndex: mainWord.length - i,
                }}
              />
            );
          })}
        </div>
        
        {/* Floating Particles - More appear as cards stack */}
        <div className="absolute inset-0" style={{ opacity: 0.15 }}>
          {Array.from({ length: mainWord.length - mainLettersVisible + 3 }, (_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute bg-primary rounded-full transition-all duration-1200"
              style={{
                left: `${10 + (i * 80) % 1200}px`,
                top: `${15 + (i * 120) % 800}px`,
                width: `${4 + (mainLettersVisible * 2) % 12}px`,
                height: `${4 + (mainLettersVisible * 2) % 12}px`,
                transform: `translate(${mainLettersVisible * 20}px, ${mainLettersVisible * 15}px) scale(${0.5 + mainLettersVisible * 0.1})`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        
        {/* Brutalist Corner Frames */}
        <div className="absolute inset-0" style={{ opacity: 0.12 }}>
          {/* Top Left Corner */}
          <div 
            className="absolute top-8 left-8 border-l-4 border-t-4 border-primary transition-all duration-1200"
            style={{
              width: `${40 + mainLettersVisible * 8}px`,
              height: `${40 + mainLettersVisible * 8}px`,
              transform: `rotate(${mainLettersVisible * 3}deg)`,
            }}
          />
          
          {/* Bottom Right Corner */}
          <div 
            className="absolute bottom-8 right-8 border-r-4 border-b-4 border-steel transition-all duration-1200"
            style={{
              width: `${60 + mainLettersVisible * 12}px`,
              height: `${60 + mainLettersVisible * 12}px`,
              transform: `rotate(${-mainLettersVisible * 4}deg)`,
            }}
          />
          
          {/* Center Cross */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1200"
            style={{
              width: '2px',
              height: `${20 + mainLettersVisible * 15}px`,
              backgroundColor: 'hsl(var(--concrete))',
              transform: `translate(-50%, -50%) rotate(${mainLettersVisible * 10}deg)`,
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1200"
            style={{
              width: `${20 + mainLettersVisible * 15}px`,
              height: '2px',
              backgroundColor: 'hsl(var(--concrete))',
              transform: `translate(-50%, -50%) rotate(${mainLettersVisible * 10}deg)`,
            }}
          />
        </div>
        
        {/* Dynamic Geometric Shapes */}
        <div className="absolute inset-0" style={{ opacity: 0.1 }}>
          {Array.from({ length: 6 }, (_, i) => {
            const shapeType = i % 3;
            const isActive = i < (mainWord.length - mainLettersVisible + 2);
            
            return (
              <div
                key={`shape-${i}`}
                className={`absolute border-2 transition-all duration-1200 ${
                  isActive ? 'border-primary bg-primary/20' : 'border-steel/30 bg-steel/10'
                }`}
                style={{
                  left: `${20 + (i * 150) % 1000}px`,
                  top: `${25 + (i * 80) % 600}px`,
                  width: shapeType === 0 ? `${25 + mainLettersVisible * 5}px` : `${20 + mainLettersVisible * 3}px`,
                  height: shapeType === 1 ? `${25 + mainLettersVisible * 5}px` : `${20 + mainLettersVisible * 3}px`,
                  borderRadius: shapeType === 2 ? '50%' : '0',
                  transform: `rotate(${mainLettersVisible * 8 + i * 15}deg) scale(${isActive ? 1.2 : 0.8})`,
                  clipPath: shapeType === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                }}
              />
            );
          })}
        </div>
        
        {/* Cascading Lines from Center */}
        <div className="absolute inset-0" style={{ opacity: 0.08 }}>
          {Array.from({ length: mainWord.length }, (_, i) => {
            const isVisible = i >= (mainWord.length - mainLettersVisible);
            return (
              <div
                key={`cascade-line-${i}`}
                className={`absolute transition-all duration-1200 ${
                  isVisible ? 'bg-primary' : 'bg-steel/50'
                }`}
                style={{
                  left: '50%',
                  top: '50%',
                  width: '2px',
                  height: `${60 + i * 30}px`,
                  transform: `translate(-50%, -50%) rotate(${i * 40}deg)`,
                  transformOrigin: 'center bottom',
                  opacity: isVisible ? 0.8 : 0.3,
                }}
              />
            );
          })}
        </div>
        
        {/* Big Yellow Circle - Right Side of Text */}
        <div className="absolute inset-0" style={{ opacity: 0.4 }}>
          <div
            className="absolute bg-primary rounded-full transition-all duration-1200 border-4 border-foreground/20"
            style={{
              right: `${100 + (mainWord.length - mainLettersVisible) * 20}px`,
              top: '30%',
              width: `${200 + (mainWord.length - mainLettersVisible) * 40}px`,
              height: `${200 + (mainWord.length - mainLettersVisible) * 40}px`,
              transform: `scale(${0.8 + (mainWord.length - mainLettersVisible) * 0.15}) rotate(${(mainWord.length - mainLettersVisible) * 8}deg)`,
              boxShadow: `
                0 0 ${20 + (mainWord.length - mainLettersVisible) * 10}px hsl(var(--primary) / 0.3),
                0 0 ${40 + (mainWord.length - mainLettersVisible) * 15}px hsl(var(--primary) / 0.2),
                inset 0 0 30px hsl(var(--background) / 0.1)
              `,
              filter: `brightness(${1 + (mainWord.length - mainLettersVisible) * 0.15}) saturate(${1.2 + (mainWord.length - mainLettersVisible) * 0.15})`,
            }}
          >
            {/* Inner circle details */}
            <div 
              className="absolute inset-4 rounded-full border-2 border-background/30 transition-all duration-1200"
              style={{
                transform: `rotate(${-(mainWord.length - mainLettersVisible) * 12}deg)`,
                opacity: 0.6,
              }}
            />
            <div 
              className="absolute inset-8 rounded-full bg-background/10 transition-all duration-1200"
              style={{
                transform: `scale(${0.9 + (mainWord.length - mainLettersVisible) * 0.08}) rotate(${(mainWord.length - mainLettersVisible) * 15}deg)`,
              }}
            />
          </div>
        </div>
        
        {/* Pulsing Border Elements */}
        <div className="absolute inset-0" style={{ opacity: 0.06 }}>
          {/* Top border elements */}
          {Array.from({ length: Math.max(1, mainLettersVisible) }, (_, i) => (
            <div
              key={`top-border-${i}`}
              className="absolute bg-primary transition-all duration-1200"
              style={{
                top: '0px',
                left: `${i * 100 + 50}px`,
                width: `${8 + mainLettersVisible * 2}px`,
                height: '4px',
                transform: `scaleX(${0.5 + mainLettersVisible * 0.1})`,
              }}
            />
          ))}
          
          {/* Bottom border elements */}
          {Array.from({ length: Math.max(1, mainWord.length - mainLettersVisible) }, (_, i) => (
            <div
              key={`bottom-border-${i}`}
              className="absolute bg-steel transition-all duration-1200"
              style={{
                bottom: '0px',
                right: `${i * 80 + 30}px`,
                width: `${6 + i * 2}px`,
                height: '3px',
                transform: `scaleX(${1 - mainLettersVisible * 0.05})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Fixed Progress Panel on the Right */}
      <div className="fixed top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-40 bg-background/95 backdrop-blur-sm border-2 border-foreground p-4 md:p-6 w-64 md:max-w-xs shadow-brutal hidden sm:block">
        <div className="space-y-4">
          <h3 className="font-display font-black text-sm md:text-lg text-primary uppercase tracking-wider border-b-2 border-primary pb-2">
            SCROLL PROGRESS
          </h3>
          
          <div className="space-y-3">
            <div className="font-mono text-xs md:text-sm text-muted-foreground">
              Scroll: {virtualScrollY.toFixed(0)}px
            </div>
            <div className="font-mono text-xs md:text-sm text-muted-foreground">
              Letters: {mainLettersVisible}/{mainWord.length}
            </div>
            <div className="w-full bg-concrete/20 h-2 border border-foreground overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ 
                  width: `${(mainLettersVisible / mainWord.length) * 100}%` 
                }}
              />
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2 border-t border-concrete pt-3">
            <div>Active: <span className="text-primary font-bold">{mainWord.substring(mainWord.length - mainLettersVisible)}</span></div>
            {mainLettersVisible < mainWord.length && (
              <div>Moving to: <span className="text-steel">{mainWord.substring(mainWord.length - mainLettersVisible - 1, mainWord.length - mainLettersVisible)}</span></div>
            )}
                         <div className="text-xs opacity-75">
               Hidden cards move together as a stack under the visible cards
             </div>
          </div>
          
          <div className="text-xs text-steel uppercase font-mono border border-steel p-2 text-center">
            {scrollDirection === 'down' ? '↓ CARDS STACK TOGETHER' : '↑ BUILDING BACK UP'}
          </div>
        </div>
      </div>
      
      {/* Mobile Progress Indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-background/95 backdrop-blur-sm border-2 border-foreground px-4 py-2 sm:hidden">
        <div className="flex items-center space-x-3">
          <div className="font-mono text-xs text-muted-foreground">
            {mainLettersVisible}/{mainWord.length}
          </div>
          <div className="w-20 bg-concrete/20 h-1 border border-foreground overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ 
                width: `${(mainLettersVisible / mainWord.length) * 100}%` 
              }}
            />
          </div>
                     <div className="font-mono text-xs text-steel">
             {scrollDirection === 'down' ? '↓ STACK' : '↑ BUILD'}
          </div>
        </div>
      </div>
      
      <div ref={containerRef} className="bg-background">
        {/* Main Stacking Text Section - Moved to Top */}
        <div className="min-h-screen flex items-start justify-start p-8 bg-background overflow-hidden pt-16">
          <div className="w-full max-w-6xl relative">
            <div className="text-left mb-16 animate-emerge-from-void">
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-primary mb-8 leading-none"
                  style={{ textShadow: '8px 8px 0px hsl(var(--background))' }}>
                SCROLL
                <span className="block text-foreground">TEXT</span>
              </h1>
            </div>
            
            {/* Primary Word Stack - Left Aligned */}
            <div className="mb-32 flex justify-start pl-8">
              {renderStackedText(mainWord, mainLettersVisible, 7, 0)}
            </div>
          </div>
        </div>


        {/* Additional Content Section */}
        <div className="min-h-screen flex items-center justify-center p-8 bg-background">
          <div className="text-center max-w-4xl">
            <h3 className="font-display text-4xl md:text-6xl font-black text-primary mb-8 leading-none">
              CONTINUE
              <span className="block text-foreground">EXPLORING</span>
            </h3>
            
                         <p className="font-mono text-lg text-steel max-w-2xl mx-auto leading-relaxed">
               The cascading text animation responds to your scroll wheel input while you navigate the page naturally.
               Watch as the progressive word builds slide down like cards, with hidden cards moving together as a stack until only the complete word remains visible.
             </p>
            
            <div className="mt-12 text-xs text-muted-foreground font-mono">
              Total Scroll: {virtualScrollY.toFixed(0)}px | Direction: {scrollDirection.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollText;