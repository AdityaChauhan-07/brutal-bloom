import { useState, useEffect, useRef } from 'react';

// Rubik's cube face colors following standard color scheme
const FACE_COLORS = {
  front: '#FFFF00',    // Yellow (primary)
  back: '#FFFFFF',     // White
  right: '#FF0000',    // Red
  left: '#FF8C00',     // Orange
  top: '#00FF00',      // Green
  bottom: '#0000FF',   // Blue
};

// Cube state: each face has 9 squares (3x3)
type CubeFace = 'front' | 'back' | 'right' | 'left' | 'top' | 'bottom';
type CubeState = Record<CubeFace, string[]>;

const Mystery = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [rotationX, setRotationX] = useState(-15);
  const [rotationY, setRotationY] = useState(45);
  const [scrambleLevel, setScrambleLevel] = useState(0);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Initialize cube state (solved)
  const [cubeState, setCubeState] = useState<CubeState>({
    front: Array(9).fill(FACE_COLORS.front),
    back: Array(9).fill(FACE_COLORS.back),
    right: Array(9).fill(FACE_COLORS.right),
    left: Array(9).fill(FACE_COLORS.left),
    top: Array(9).fill(FACE_COLORS.top),
    bottom: Array(9).fill(FACE_COLORS.bottom),
  });

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isRotating || isSolving) return;

    const interval = setInterval(() => {
      setRotationY(prev => prev + 0.5);
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, isRotating, isSolving]);

  // Scramble the cube
  const scrambleCube = () => {
    if (isRotating || isSolving) return;
    
    setIsRotating(true);
    setAutoRotate(false);
    
    const colors = Object.values(FACE_COLORS);
    const newState: CubeState = {
      front: [],
      back: [],
      right: [],
      left: [],
      top: [],
      bottom: [],
    };

    // Generate scrambled state
    Object.keys(newState).forEach(face => {
      newState[face as CubeFace] = Array(9).fill(null).map(() => 
        colors[Math.floor(Math.random() * colors.length)]
      );
    });

    setCubeState(newState);
    setScrambleLevel(prev => prev + 1);

    // Add rotation animation during scramble
    let rotations = 0;
    const scrambleInterval = setInterval(() => {
      setRotationX(prev => prev + Math.random() * 90 - 45);
      setRotationY(prev => prev + Math.random() * 90 - 45);
      rotations++;
      
      if (rotations >= 8) {
        clearInterval(scrambleInterval);
        setTimeout(() => {
          setIsRotating(false);
          setAutoRotate(true);
        }, 500);
      }
    }, 200);
  };

  // Solve the cube
  const solveCube = () => {
    if (isRotating || isSolving) return;
    
    setIsSolving(true);
    setAutoRotate(false);
    setIsRotating(true);

    // Solving animation sequence
    const solvingSteps = [
      { x: -15, y: 45 },
      { x: 15, y: 90 },
      { x: -30, y: 135 },
      { x: 0, y: 180 },
      { x: -15, y: 225 },
      { x: 15, y: 270 },
      { x: -15, y: 315 },
      { x: -15, y: 360 },
    ];

    let step = 0;
    const solveInterval = setInterval(() => {
      if (step < solvingSteps.length) {
        setRotationX(solvingSteps[step].x);
        setRotationY(solvingSteps[step].y);
        step++;
      } else {
        // Return to solved state
        setCubeState({
          front: Array(9).fill(FACE_COLORS.front),
          back: Array(9).fill(FACE_COLORS.back),
          right: Array(9).fill(FACE_COLORS.right),
          left: Array(9).fill(FACE_COLORS.left),
          top: Array(9).fill(FACE_COLORS.top),
          bottom: Array(9).fill(FACE_COLORS.bottom),
        });

        clearInterval(solveInterval);
        
        setTimeout(() => {
          setRotationX(-15);
          setRotationY(45);
          setIsSolving(false);
          setIsRotating(false);
          setAutoRotate(true);
          setScrambleLevel(0);
        }, 1000);
      }
    }, 600);
  };

  // Handle mouse interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (autoRotate || isRotating || isSolving) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setRotationY(45 + (mouseX / rect.width) * 60);
    setRotationX(-15 + (mouseY / rect.height) * -30);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-black mb-4 text-foreground">
            MYSTERY
          </h1>
          <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-primary">
            RUBIK'S ALGORITHM
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* 3D Rubik's Cube Container */}
        <div 
          className={`relative cube-container ${isSolving ? 'cube-solving' : ''} ${isRotating && !isSolving ? 'cube-scrambling' : ''}`}
          style={{ perspective: '1000px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setAutoRotate(true)}
          onMouseEnter={() => setAutoRotate(false)}
        >
          
          {/* Cube */}
          <div
            ref={cubeRef}
            className={`relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-transform duration-500 ease-out ${
              isRotating ? 'duration-200' : 'duration-500'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
            }}
          >
            
            {/* Front Face */}
            <div 
              className="absolute inset-0 border-4 border-foreground cube-face"
              style={{
                transform: 'rotateY(0deg) translateZ(6rem)',
                background: 'linear-gradient(45deg, hsl(var(--background)), hsl(var(--steel)))',
              }}
            >
              <div className="grid grid-cols-3 gap-1 p-2 h-full">
                {cubeState.front.map((color, i) => (
                  <div
                    key={i}
                    className="border border-foreground/50 cube-square"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `inset 0 0 10px rgba(0,0,0,0.3)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Back Face */}
            <div 
              className="absolute inset-0 border-4 border-foreground cube-face"
              style={{
                transform: 'rotateY(180deg) translateZ(6rem)',
                background: 'linear-gradient(45deg, hsl(var(--background)), hsl(var(--steel)))',
              }}
            >
              <div className="grid grid-cols-3 gap-1 p-2 h-full">
                {cubeState.back.map((color, i) => (
                  <div
                    key={i}
                    className="border border-foreground/50 cube-square"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `inset 0 0 10px rgba(0,0,0,0.3)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right Face */}
            <div 
              className="absolute inset-0 border-4 border-foreground cube-face"
              style={{
                transform: 'rotateY(90deg) translateZ(6rem)',
                background: 'linear-gradient(45deg, hsl(var(--background)), hsl(var(--steel)))',
              }}
            >
              <div className="grid grid-cols-3 gap-1 p-2 h-full">
                {cubeState.right.map((color, i) => (
                  <div
                    key={i}
                    className="border border-foreground/50 cube-square"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `inset 0 0 10px rgba(0,0,0,0.3)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Left Face */}
            <div 
              className="absolute inset-0 border-4 border-foreground cube-face"
              style={{
                transform: 'rotateY(-90deg) translateZ(6rem)',
                background: 'linear-gradient(45deg, hsl(var(--background)), hsl(var(--steel)))',
              }}
            >
              <div className="grid grid-cols-3 gap-1 p-2 h-full">
                {cubeState.left.map((color, i) => (
                  <div
                    key={i}
                    className="border border-foreground/50 cube-square"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `inset 0 0 10px rgba(0,0,0,0.3)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Top Face */}
            <div 
              className="absolute inset-0 border-4 border-foreground cube-face"
              style={{
                transform: 'rotateX(90deg) translateZ(6rem)',
                background: 'linear-gradient(45deg, hsl(var(--background)), hsl(var(--steel)))',
              }}
            >
              <div className="grid grid-cols-3 gap-1 p-2 h-full">
                {cubeState.top.map((color, i) => (
                  <div
                    key={i}
                    className="border border-foreground/50 cube-square"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `inset 0 0 10px rgba(0,0,0,0.3)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Face */}
            <div 
              className="absolute inset-0 border-4 border-foreground cube-face"
              style={{
                transform: 'rotateX(-90deg) translateZ(6rem)',
                background: 'linear-gradient(45deg, hsl(var(--background)), hsl(var(--steel)))',
              }}
            >
              <div className="grid grid-cols-3 gap-1 p-2 h-full">
                {cubeState.bottom.map((color, i) => (
                  <div
                    key={i}
                    className="border border-foreground/50 cube-square"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `inset 0 0 10px rgba(0,0,0,0.3)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={scrambleCube}
            disabled={isRotating || isSolving}
            className={`
              px-6 py-3 font-mono font-bold text-sm md:text-base
              border-2 border-foreground bg-background text-foreground
              hover:bg-primary hover:text-background
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              shadow-[4px_4px_0px_hsl(var(--primary))]
              hover:shadow-[2px_2px_0px_hsl(var(--concrete))]
              active:translate-x-1 active:translate-y-1
              active:shadow-[2px_2px_0px_hsl(var(--primary))]
            `}
          >
            {isRotating && !isSolving ? 'SCRAMBLING...' : 'SCRAMBLE'}
          </button>

          <button
            onClick={solveCube}
            disabled={isRotating || isSolving || scrambleLevel === 0}
            className={`
              px-6 py-3 font-mono font-bold text-sm md:text-base
              border-2 border-primary bg-primary text-background
              hover:bg-background hover:text-primary hover:border-primary
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              shadow-[4px_4px_0px_hsl(var(--concrete))]
              hover:shadow-[2px_2px_0px_hsl(var(--foreground))]
              active:translate-x-1 active:translate-y-1
              active:shadow-[2px_2px_0px_hsl(var(--concrete))]
            `}
          >
            {isSolving ? 'SOLVING...' : 'AUTO SOLVE'}
          </button>
        </div>

        {/* Status */}
        <div className="mt-6 text-center">
          <div className="font-mono text-sm md:text-base text-steel">
            {isSolving ? 'EXECUTING ALGORITHM...' : 
             isRotating ? 'CUBE ROTATING...' : 
             scrambleLevel > 0 ? `SCRAMBLED ${scrambleLevel} TIME${scrambleLevel > 1 ? 'S' : ''}` : 
             'CUBE SOLVED'}
          </div>
          <div className="font-mono text-xs mt-2 text-muted-foreground">
            {autoRotate ? 'AUTO-ROTATING • HOVER TO CONTROL' : 'MOUSE CONTROL ACTIVE'}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 md:mt-12 max-w-2xl text-center">
          <div className="border-2 border-concrete p-4 md:p-6 bg-background/90 backdrop-blur-sm">
            <h3 className="font-mono text-lg md:text-xl font-bold mb-3 text-primary">
              [3D CUBE SIMULATION]
            </h3>
            <p className="font-mono text-sm md:text-base leading-relaxed text-foreground">
              Interactive 3D Rubik's Cube built with pure CSS transforms.
              <br className="hidden md:block" />
              Features algorithmic solving, mouse controls, and fluid animations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mystery;