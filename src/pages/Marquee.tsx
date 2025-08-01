const Marquee = () => {
  const marqueeText = "BRUTALIST DESIGN • EXPERIMENTAL UI • BOLD TYPOGRAPHY • GEOMETRIC FORMS • ";

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        <h1 className="font-display text-6xl md:text-8xl font-black mb-16 text-center">
          INFINITE MARQUEE
        </h1>
      </div>
      
      <div className="space-y-8">
        {/* Top Marquee */}
        <div className="border-y-2 border-concrete bg-primary py-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-mono text-2xl md:text-4xl font-bold text-primary-foreground uppercase tracking-wider">
              {marqueeText.repeat(10)}
            </span>
          </div>
        </div>
        
        {/* Middle Content */}
        <div className="p-8 text-center">
          <p className="font-mono text-lg max-w-2xl mx-auto leading-relaxed">
            This marquee scrolls infinitely, creating a hypnotic effect that draws the eye. 
            The brutalist aesthetic emphasizes the mechanical nature of digital information flow.
          </p>
        </div>
        
        {/* Bottom Marquee - Reverse Direction */}
        <div className="border-y-2 border-concrete bg-accent py-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
            <span className="font-mono text-2xl md:text-4xl font-bold text-accent-foreground uppercase tracking-wider">
              {marqueeText.repeat(10)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;