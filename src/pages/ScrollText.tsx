import { useEffect, useState, useRef } from 'react';

const ScrollText = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text stacking logic - reveal letters based on scroll position
  const mainWord = "BRUTALIST";
  const secondWord = "CONCRETE";
  const thirdWord = "DESIGN";
  
  // Calculate how many letters to show based on scroll position
  const getVisibleLetters = (word: string, scrollMultiplier: number, offset: number = 0) => {
    const lettersToShow = Math.max(0, Math.min(word.length, Math.floor((scrollY - offset) / scrollMultiplier)));
    return lettersToShow;
  };

  const mainLettersVisible = getVisibleLetters(mainWord, 80, 150);
  const secondLettersVisible = getVisibleLetters(secondWord, 100, 600);
  const thirdLettersVisible = getVisibleLetters(thirdWord, 90, 1000);

    // Helper function to render letters that align into stacked words
  const renderStackedText = (word: string, lettersVisible: number, baseSize: number = 8, sectionIndex: number = 0) => {
    return (
      <div className="flex flex-col items-start relative">
        {Array.from({ length: word.length }, (_, index) => {
          const letter = word[index];
          const shouldAlign = index < lettersVisible;
          const animationDelay = (index * 100) + (sectionIndex * 30);

  return (
            <div
              key={index}
              className="font-display font-black text-foreground leading-none transition-all duration-700 ease-out relative"
            style={{
                fontSize: `${baseSize}rem`,
                textShadow: '8px 8px 0px hsl(var(--primary)), 16px 16px 0px hsl(var(--concrete))',
                opacity: 0.9 - (index * 0.03),
                transform: shouldAlign 
                  ? `translateX(${index * 3}px) translateY(0) scale(1) rotate(0deg)` 
                  : `translateX(${200 + (index * 50)}px) translateY(${index * 20}px) scale(0.8) rotate(${5 + (index * 3)}deg)`,
                marginBottom: shouldAlign ? '-0.15em' : '0.5em',
                transitionDelay: `${animationDelay}ms`,
                transitionDuration: '800ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                pointerEvents: 'none',
                zIndex: word.length - index,
                filter: shouldAlign ? 'blur(0px)' : 'blur(1px)'
              }}
            >
              {/* Show the full word up to current letter when aligned */}
              <span style={{ 
                opacity: shouldAlign ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                transitionDelay: shouldAlign ? `${animationDelay + 200}ms` : '0ms'
              }}>
                {word.substring(0, index + 1)}
              </span>
              
              {/* Show individual letter when not aligned */}
              <span style={{ 
                opacity: shouldAlign ? 0 : 1,
                position: shouldAlign ? 'absolute' : 'static',
                top: 0,
                left: 0,
                transition: 'opacity 0.3s ease-out',
                transitionDelay: shouldAlign ? '0ms' : `${animationDelay}ms`
              }}>
                {letter}
              </span>
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
      
      <div ref={containerRef} className="bg-background">
        {/* Hero Section */}
        <div className="min-h-screen relative flex flex-col items-center justify-center p-8">
          <div className="text-center mb-16 animate-emerge-from-void">
            <h1 className="font-display text-4xl md:text-6xl font-black text-primary mb-4"
                style={{ textShadow: '4px 4px 0px hsl(var(--background))' }}>
              SCROLL TO ALIGN
            </h1>
            <p className="font-mono text-lg text-steel uppercase tracking-wider">
              {scrollDirection === 'down' ? '↓ LETTERS ALIGNING INTO WORDS' : '↑ LETTERS SCATTERING'}
            </p>
          </div>

          <div className="font-mono text-sm text-muted-foreground mb-8">
            Scroll: {scrollY.toFixed(0)}px | Letters: {mainLettersVisible}/{mainWord.length}
          </div>
        </div>

        {/* Main Stacking Text Section */}
        <div className="min-h-screen flex items-center justify-center p-8 bg-background overflow-hidden">
          <div className="w-full max-w-6xl relative">
            {/* Primary Word Stack */}
            <div className="mb-32 pl-8">
              {renderStackedText(mainWord, mainLettersVisible, 7, 0)}
            </div>
          </div>
        </div>

        {/* Second Word Section */}
        <div className="min-h-screen flex items-center justify-center p-8 bg-concrete overflow-hidden">
          <div className="w-full max-w-6xl relative">
            <div className="mb-16 pl-8">
              <div className="font-mono text-lg text-background/60 mb-8 uppercase tracking-wider">
                Concrete Foundation
              </div>
              <div className="flex flex-col items-start">
                {renderStackedText(secondWord, secondLettersVisible, 5, 1)}
              </div>
            </div>
          </div>
        </div>

        {/* Third Word Section */}
        <div className="min-h-screen flex items-center justify-center p-8 bg-steel overflow-hidden">
          <div className="w-full max-w-6xl relative">
            <div className="mb-16 pl-8">
              <div className="font-mono text-lg text-background/60 mb-8 uppercase tracking-wider">
                Industrial Aesthetic
              </div>
              <div className="flex flex-col items-start relative">
                {Array.from({ length: thirdWord.length }, (_, index) => {
                  const letter = thirdWord[index];
                  const shouldAlign = index < thirdLettersVisible;
                  const animationDelay = (index * 120) + 150;
                  
                  return (
                    <div
                      key={index}
                      className="font-display font-black text-background leading-none transition-all duration-800 ease-out relative"
                      style={{
                        fontSize: `${4}rem`,
                        textShadow: '6px 6px 0px hsl(var(--primary))',
                        opacity: 0.95 - (index * 0.04),
                        transform: shouldAlign 
                          ? `translateX(${index * 4}px) rotate(${index * 0.3}deg) scale(1) translateY(0)` 
                          : `translateX(${150 + (index * 40)}px) rotate(${15 + (index * 5)}deg) scale(0.75) translateY(${index * 25}px)`,
                        marginBottom: shouldAlign ? '-0.1em' : '0.8em',
                        transitionDelay: `${animationDelay}ms`,
                        transitionDuration: '900ms',
                        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        pointerEvents: 'none',
                        zIndex: thirdWord.length - index,
                        filter: shouldAlign ? 'blur(0px)' : 'blur(2px)'
                      }}
                    >
                      {/* Show the full word up to current letter when aligned */}
                      <span style={{ 
                        opacity: shouldAlign ? 1 : 0,
                        transition: 'opacity 0.4s ease-out',
                        transitionDelay: shouldAlign ? `${animationDelay + 300}ms` : '0ms'
                      }}>
                        {thirdWord.substring(0, index + 1)}
                      </span>
                      
                      {/* Show individual letter when not aligned */}
                      <span style={{ 
                        opacity: shouldAlign ? 0 : 1,
                        position: shouldAlign ? 'absolute' : 'static',
                        top: 0,
                        left: 0,
                        transition: 'opacity 0.4s ease-out',
                        transitionDelay: shouldAlign ? '0ms' : `${animationDelay}ms`
                      }}>
                        {letter}
                      </span>
                    </div>
                  );
                })}
              </div>
          </div>
        </div>
      </div>
      
        {/* Progress Indicators */}
        <div className="min-h-screen flex items-center justify-center p-8 bg-background">
          <div className="text-center">
            <h3 className="font-display text-4xl font-black text-primary mb-8">
              LETTER ALIGNMENT PROGRESS
            </h3>
            
            <div className="space-y-6 font-mono text-lg">
              <div className="flex justify-between items-center max-w-md mx-auto">
                <span className="text-steel uppercase tracking-wider">{mainWord}:</span>
                <div className="flex space-x-1">
                  {Array.from(mainWord).map((letter, index) => (
                    <span 
                      key={index}
                      className={`w-8 h-8 flex items-center justify-center border-2 transition-all duration-500 ease-out ${
                        index < mainLettersVisible 
                          ? 'bg-primary text-background border-primary scale-100 rotate-0' 
                          : 'bg-transparent text-steel border-steel scale-90 rotate-3'
                      }`}
                      style={{
                        transitionDelay: index < mainLettersVisible ? `${index * 80}ms` : '0ms',
                        transform: index < mainLettersVisible 
                          ? 'scale(1) rotate(0deg)' 
                          : 'scale(0.9) rotate(3deg)',
                        filter: index < mainLettersVisible ? 'brightness(1)' : 'brightness(0.7)'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center max-w-md mx-auto">
                <span className="text-steel uppercase tracking-wider">{secondWord}:</span>
                <div className="flex space-x-1">
                  {Array.from(secondWord).map((letter, index) => (
                    <span 
                      key={index}
                      className={`w-8 h-8 flex items-center justify-center border-2 transition-all duration-500 ease-out ${
                        index < secondLettersVisible 
                          ? 'bg-primary text-background border-primary' 
                          : 'bg-transparent text-steel border-steel'
                      }`}
                      style={{
                        transitionDelay: index < secondLettersVisible ? `${index * 90}ms` : '0ms',
                        transform: index < secondLettersVisible 
                          ? 'scale(1) rotate(0deg)' 
                          : 'scale(0.85) rotate(-2deg)',
                        filter: index < secondLettersVisible ? 'brightness(1)' : 'brightness(0.6)'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center max-w-md mx-auto">
                <span className="text-steel uppercase tracking-wider">{thirdWord}:</span>
                <div className="flex space-x-1">
                  {Array.from(thirdWord).map((letter, index) => (
                    <span 
                      key={index}
                      className={`w-8 h-8 flex items-center justify-center border-2 transition-all duration-600 ease-out ${
                        index < thirdLettersVisible 
                          ? 'bg-primary text-background border-primary' 
                          : 'bg-transparent text-steel border-steel'
                      }`}
                      style={{
                        transitionDelay: index < thirdLettersVisible ? `${index * 100}ms` : '0ms',
                        transform: index < thirdLettersVisible 
                          ? 'scale(1) rotate(0deg)' 
                          : 'scale(0.8) rotate(5deg)',
                        filter: index < thirdLettersVisible ? 'brightness(1) blur(0px)' : 'brightness(0.5) blur(1px)'
                      }}
                    >
                      {letter}
                    </span>
                                    ))}
                </div>
              </div>

              <div className="mt-12 font-mono text-sm text-muted-foreground">
                Total Scroll: {scrollY.toFixed(0)}px | Direction: {scrollDirection.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollText;