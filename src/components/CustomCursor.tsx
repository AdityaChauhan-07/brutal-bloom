import { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      // Update position directly via DOM manipulation instead of state
      // This avoids re-renders and is much more performant
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as Node;
      if (target instanceof Element && target.matches('a, button, .hover-target')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as Node;
      if (target instanceof Element && target.matches('a, button, .hover-target')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor-brutal ${isHovering ? 'hover' : ''}`}
      style={{
        left: 0,
        top: 0,
      }}
    />
  );
};

export default CustomCursor;