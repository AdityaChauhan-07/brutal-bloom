import { useState, useEffect } from 'react';

const Mystery = () => {
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [glitchText, setGlitchText] = useState('MYSTERY');

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
  const originalText = 'MYSTERY ELEMENT';

  useEffect(() => {
    // Initialize matrix effect
    const cols = Math.floor(window.innerWidth / 20);
    const rows = Math.floor(window.innerHeight / 20);
    
    const newMatrix = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => 
        Math.random() > 0.7 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : ' '
      )
    );
    
    setMatrix(newMatrix);

    // Glitch text effect
    const glitchInterval = setInterval(() => {
      const chars = originalText.split('');
      const glitched = chars.map(char => 
        Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
      );
      setGlitchText(glitched.join(''));
      
      setTimeout(() => setGlitchText(originalText), 100);
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((char, colIndex) => (
              <span
                key={colIndex}
                className="font-mono text-xs text-primary w-5 h-5 animate-pulse"
                style={{ animationDelay: `${(rowIndex + colIndex) * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="font-display text-6xl md:text-8xl font-black mb-8 text-glitch" data-text={glitchText}>
            {glitchText}
          </h1>
          
          <div className="border-2 border-accent p-8 bg-background bg-opacity-90">
            <h2 className="font-mono text-2xl font-bold mb-4 text-accent">
              [CLASSIFIED]
            </h2>
            <p className="font-mono text-lg leading-relaxed">
              THE MYSTERY ELEMENT REVEALS ITSELF THROUGH DIGITAL CHAOS.
              <br />
              GLITCH AESTHETICS MEET BRUTALIST FORM.
              <br />
              BEAUTY IN THE BREAKDOWN.
            </p>
            
            <div className="mt-8 space-y-2">
              {['ERROR_404_BEAUTY_FOUND', 'SYSTEM_GLITCH_ACTIVATED', 'DIGITAL_REBELLION_MODE'].map((text, i) => (
                <div key={i} className="font-mono text-sm text-muted-foreground animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                  &gt; {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mystery;