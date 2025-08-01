import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  const [isMorphing, setIsMorphing] = useState(false);
  const [showFinal100, setShowFinal100] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Loader mounted');
    
    // Show final 100 after counter reaches 100
    const timer = setTimeout(() => {
      console.log('Counter finished, showing final 100');
      setShowFinal100(true);
      // Start morphing after a brief delay
      setTimeout(() => {
        console.log('Starting morphing animation');
        setIsMorphing(true);
        // Navigate to home page after morphing animation
        setTimeout(() => {
          console.log('Navigating to home');
          navigate('/');
        }, 2000); // 2 seconds for morphing
      }, 210); // 0.5s delay before morphing starts
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  console.log('Render state:', { isMorphing, showFinal100 });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Counter */}
      <div 
        className={`text-center z-10 transition-opacity duration-500 ${
          showFinal100 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-[20rem] font-black text-black overflow-hidden h-96">
          <div className="animate-counter-numbers">
            {Array.from({ length: 101 }, (_, i) => (
              <div key={i} className="h-96 flex items-center justify-center">
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final 100 that morphs into background */}
      {showFinal100 && (
        <div 
          className={`text-center z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            isMorphing ? 'animate-morphing' : ''
          }`}
          style={{
            transformOrigin: 'center',
            backgroundColor: isMorphing ? 'black' : 'transparent'
          }}
        >
          <div className="text-[20rem] font-black text-black">
            100
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;