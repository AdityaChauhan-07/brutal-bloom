import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  const [isMorphing, setIsMorphing] = useState(false);
  const [showFinal100, setShowFinal100] = useState(false);
  const [hideText, setHideText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Loader mounted');
    
    // Hide text when counter reaches 100 (counter animation is 3s)
    const textTimer = setTimeout(() => {
      console.log('Counter reached 100, hiding text');
      setHideText(true);
    }, 3000); // Same as counter animation duration
    
    // Show final 100 after counter reaches 100
    const timer = setTimeout(() => {
      console.log('Counter finished, showing final 100');
      setShowFinal100(true);
      // Start morphing after text has completely vanished (500ms transition + extra delay)
      setTimeout(() => {
        console.log('Starting morphing animation');
        setIsMorphing(true);
        // Navigate to home page after morphing animation
        setTimeout(() => {
          console.log('Navigating to home');
          navigate('/');
        }, 2000); // 1.5 seconds for morphing
      }, 800); // 800ms delay to ensure text is completely gone (500ms transition + 300ms buffer)
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
    };
  }, [navigate]);

  console.log('Render state:', { isMorphing, showFinal100, hideText });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Loading Text */}
      <div 
        className={`text-center z-10 mb-12 transition-opacity duration-500 ${
          hideText ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="font-mono text-2xl md:text-3xl font-bold text-black uppercase tracking-wider animate-emerge-from-void">
          <span>Your Web Experience is Loading </span>
          <span className="text-electric-yellow animate-now-special inline-block" style={{ animationDelay: '0.8s' }}>
            Now
          </span>
        </div>
      </div>

      {/* Counter */}
      <div 
        className={`text-center z-10 transition-opacity duration-500 ${
          showFinal100 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-[20rem] font-black text-black overflow-hidden h-96 animate-emerge-from-void relative" style={{ animationDelay: '0.3s' }}>
          <div className="animate-counter-numbers">
            {Array.from({ length: 101 }, (_, i) => (
              <div key={i} className="h-96 flex items-center justify-center">
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final 100 that morphs into background - positioned exactly where counter ends */}
      {showFinal100 && (
        <div 
          className={`text-center z-30 absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300`}
          style={{
            transformOrigin: 'center',
          }}
        >
          {/* Invisible spacer to match the text above */}
          <div className="mb-12 opacity-0">
            <div className="font-mono text-2xl md:text-3xl font-bold text-black uppercase tracking-wider">
              <span>Your Web Experience is Loading </span>
              <span>Now</span>
            </div>
          </div>
          
          <div 
            className={`text-[20rem] font-black text-black ${
              isMorphing ? 'animate-morphing' : ''
            }`}
            style={{
              transformOrigin: 'center'
            }}
          >
            100
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;