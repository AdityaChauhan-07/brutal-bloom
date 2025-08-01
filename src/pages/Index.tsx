import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    { path: '/loader', title: 'LOADER', desc: 'Loading Animation' },
    { path: '/image-hover', title: 'IMAGE HOVER', desc: 'Interactive Preview' },
    { path: '/image-grid', title: 'IMAGE GRID', desc: 'Cursor Animations' },
    { path: '/marquee', title: 'MARQUEE', desc: 'Infinite Scroll' },
    { path: '/team', title: 'TEAM', desc: 'Hover Reveals' },
    { path: '/ripple', title: 'RIPPLE', desc: 'Click Effects' },
    { path: '/scroll-text', title: 'SCROLL TEXT', desc: 'Dynamic Scaling' },
    { path: '/mystery', title: 'MYSTERY', desc: 'Surprise Element' },
  ];

  return (
    <>
      {/* Page transition overlay - starts black and fades to transparent */}
      <div className="fixed inset-0 z-50 animate-page-transition pointer-events-none"></div>
      
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 pt-20">
            <h1 className="font-display text-8xl md:text-9xl font-black mb-8 text-glitch animate-emerge-from-void" style={{ animationDelay: '0.5s' }}>
              CLOUD. NINE.
            </h1>
            <p className="font-mono text-xl md:text-2xl uppercase tracking-wider text-muted-foreground max-w-3xl mx-auto animate-emerge-from-void" style={{ animationDelay: '0.8s' }}>
              A hackathon project exploring brutalist design through 10 interactive UI elements
            </p>
            <div className="mt-12 animate-emerge-from-void" style={{ animationDelay: '1.1s' }}>
              <div className="w-32 h-1 bg-primary mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="block border-2 border-concrete p-6 hover-lift hover-target cursor-none bg-background animate-emerge-from-void"
                style={{ animationDelay: `${1.4 + index * 0.15}s` }}
              >
                <h3 className="font-mono text-lg font-bold uppercase tracking-wider mb-2">
                  {feature.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-20 pt-12 border-t-2 border-concrete animate-emerge-from-void" style={{ animationDelay: '2.6s' }}>
            <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
              Brutalist UI/UX Experiment • Built with React & Tailwind
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
