import { useState, useCallback, useEffect } from 'react';

const ImageHover = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationTrigger, setAnimationTrigger] = useState(0);

  // Continuous animation loop
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setAnimationTrigger(prev => prev + 1);
      animationId = requestAnimationFrame(animate);
    };
    
    if (hoveredProject) {
      animationId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [hoveredProject]);

  const projects = [
    {
      id: 'project1',
      title: 'BRUTALIST TOWERS',
      subtitle: 'Architecture Photography',
      year: '2024',
      size: 'large-portrait',
      defaultImage: 'https://images.unsplash.com/photo-1577404328109-121a7e888683?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      hoverImage: 'https://images.unsplash.com/photo-1504625709867-b4e45e3bb9dd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'project2', 
      title: 'CONCRETE MONOLITH',
      subtitle: 'Urban Design, Concept',
      year: '2024',
      size: 'small-landscape',
      defaultImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop&crop=center',
      hoverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop&crop=center'
    },
    {
      id: 'project3',
      title: 'RAW GEOMETRY', 
      subtitle: 'Structural Art, Photography',
      year: '2023',
      size: 'medium-square',
      defaultImage: 'https://images.unsplash.com/photo-1591955663970-9aca4eff91c7?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      hoverImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=600&fit=crop&crop=center'
    },
    {
      id: 'project4',
      title: 'INDUSTRIAL FORMS',
      subtitle: 'Brutalist Design, Research', 
      year: '2023',
      size: 'large-landscape',
      defaultImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&h=600&fit=crop&crop=center',
      hoverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&h=600&fit=crop&crop=center'
    },
    {
      id: 'project5',
      title: 'CONCRETE TEXTURES',
      subtitle: 'Material Study, Documentation', 
      year: '2022',
      size: 'small-portrait',
      defaultImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=500&h=700&fit=crop&crop=center',
      hoverImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=700&fit=crop&crop=center'
    },
    {
      id: 'project6',
      title: 'ANGULAR SHADOWS',
      subtitle: 'Light Study, Architecture', 
      year: '2022',
      size: 'medium-landscape',
      defaultImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=700&h=500&fit=crop&crop=center',
      hoverImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=700&h=500&fit=crop&crop=center'
    }
  ];

  const getSplatterSVG = (x: number, y: number) => {
    const time = Date.now() * 0.001;
    
    // Create animated splash centered on cursor
    const centerX = x;
    const centerY = y;
    
    // Create realistic water splash shape
    const createSplashPath = () => {
      const points = [];
      const numPoints = 16;
      const baseRadius = 120;
      
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        
        // Create realistic splash variations
        const mainWave = Math.sin(angle * 4 + time * 2.5) * 0.4;
        const ripple = Math.cos(angle * 8 + time * 3) * 0.2;
        const splash = Math.sin(angle * 6 + time * 1.8) * 0.3;
        
        // Create directional splashes (like liquid hitting surface)
        const directionalSplash = angle > Math.PI * 0.3 && angle < Math.PI * 0.7 ? 
          Math.sin(time * 4) * 0.6 : 
          angle > Math.PI * 1.3 && angle < Math.PI * 1.7 ? 
          Math.sin(time * 4 + Math.PI) * 0.5 : 0;
        
        const radius = baseRadius * (1 + mainWave + ripple + splash + directionalSplash);
        const pointX = centerX + Math.cos(angle) * radius;
        const pointY = centerY + Math.sin(angle) * radius;
        
        if (i === 0) {
          points.push(`M ${pointX} ${pointY}`);
        } else {
          // Use quadratic curves for more organic splash shape
          const prevAngle = ((i - 1) / numPoints) * Math.PI * 2;
          const controlDistance = 15;
          const controlAngle = angle - (Math.PI / numPoints);
          const controlX = centerX + Math.cos(controlAngle) * (radius * 0.8 + controlDistance);
          const controlY = centerY + Math.sin(controlAngle) * (radius * 0.8 + controlDistance);
          
          points.push(`Q ${controlX} ${controlY}, ${pointX} ${pointY}`);
        }
      }
      points.push('Z');
      return points.join(' ');
    };
    
    const mainPath = createSplashPath();
    
    return {
      mainPath
    };
  };

  const handleMouseMove = useCallback((e: React.MouseEvent, projectId: string) => {
    if (hoveredProject === projectId) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [hoveredProject]);

  const handleMouseEnter = (projectId: string) => {
    setHoveredProject(projectId);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-20">
          <h1 className="font-display text-6xl md:text-8xl font-black mb-8">
            FEATURED<br />WORKS
        </h1>
          <p className="text-muted-foreground font-mono max-w-2xl">
            Experience the best in web design, creative development, and branding.
            <br />With love from our brutal team.
          </p>
        </div>
        
        <div className="brutal-grid">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`brutal-grid-item ${project.size} hover-target group`}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden bg-concrete border-4 border-foreground h-full">
                <div className="relative w-full h-full">
                  {/* Default Image - Static until hover */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden"
                  >
                    <img 
                      src={project.defaultImage}
                      alt={project.title}
                      className="w-full h-full object-cover floating-bg"
                      style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                      draggable={false}
                    />
                  </div>
                  
                  {/* Hover Image with Animated SVG Splatter Mask - Always rendered for smooth transitions */}
                  {(() => {
                    const splatterData = getSplatterSVG(mousePosition.x, mousePosition.y);
                    const isHovered = hoveredProject === project.id;
                    return (
                      <>
                        {/* SVG Mask Definition */}
                        <svg 
                          className="absolute inset-0 w-full h-full pointer-events-none" 
                          style={{ zIndex: -1 }}
                        >
                          <defs>
                            <mask id={`splatter-mask-${project.id}`}>
                              <rect width="100%" height="100%" fill="black" />
                              <g fill="white">
                                <path d={splatterData.mainPath} />
                              </g>
                            </mask>
                          </defs>
                        </svg>
                        
                        {/* Masked Hover Image with smooth transitions */}
                        <div 
                          className="absolute inset-0 w-full h-full"
                          style={{
                            mask: `url(#splatter-mask-${project.id})`,
                            WebkitMask: `url(#splatter-mask-${project.id})`,
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'scale(1)' : 'scale(0.1)',
                            transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                            transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            transitionDelay: isHovered ? '0.1s' : '0s',
                          }}
                        >
                          <img 
                            src={project.hoverImage}
                            alt={`${project.title} hover`}
                            className="w-full h-full object-cover"
                            style={{ 
                              filter: 'sepia(100%) saturate(300%) hue-rotate(25deg) brightness(1.1) contrast(1.2)',
                            }}
                            draggable={false}
                          />
                        </div>
                      </>
                    );
                  })()}
                  
                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between text-white">
                      <h3 className="font-mono text-lg font-bold uppercase tracking-wider">
                        {project.title}
                      </h3>
                      <span className="font-mono text-sm opacity-80">
                        {project.year}
                    </span>
                    </div>
                    <p className="font-mono text-sm opacity-80 mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <p className="font-mono text-muted-foreground mb-8">
            More brutal works coming soon...
          </p>
          <button className="btn-brutal hover-target">
            EXPLORE MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageHover;