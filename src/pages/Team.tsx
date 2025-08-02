import { useState, useRef } from 'react';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [hoveredRowPosition, setHoveredRowPosition] = useState({ x: 0, y: 0 });

  const teamMembers = [
    { 
      id: 'adrian', 
      name: 'ADRIÁN RUBIO', 
      role: 'VP OF ENGINEERING',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'chris', 
      name: 'CHRIS KOHA', 
      role: 'CHIEF OPERATING OFFICER',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'caroline', 
      name: 'CAROLINE NIETO', 
      role: 'CHIEF PRODUCT OFFICER',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b86a6a0a?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'victor', 
      name: 'VÍCTOR ALBERTOS', 
      role: 'CHIEF TECHNOLOGY OFFICER',
      photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'allison', 
      name: 'ALLISON PALMER', 
      role: 'PRODUCT MANAGER',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'carlos', 
      name: 'CARLOS CUBILLOS', 
      role: 'SENIOR UX/UI DESIGNER',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'leo', 
      name: 'LEO DORNELAS', 
      role: 'PRINCIPAL DESIGNER',
      photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'laura', 
      name: 'LAURA CÁRDENAS', 
      role: 'VISUAL DESIGNER',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'mathias', 
      name: 'MATHIAS ILSKENS', 
      role: 'SENIOR FRONTEND ENGINEER',
      photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'stefan', 
      name: 'STEFAN PRATSCH', 
      role: 'DIRECTOR OF ENGINEERING',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'himanshu', 
      name: 'HIMANSHU BANSAL', 
      role: 'SENIOR QA ENGINEER',
      photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=300&fit=crop&crop=face'
    },
    { 
      id: 'ryan', 
      name: 'RYAN SIMONETTA', 
      role: 'SENIOR DEVOPS ENGINEER',
      photo: 'https://images.unsplash.com/photo-1474176637311-cd20dc38a7b4?w=300&h=300&fit=crop&crop=face'
    }
  ];

  const handleMouseEnter = (memberId: string, event: React.MouseEvent<HTMLDivElement>) => {
    // Only show floating popup on desktop (lg screens and above)
    if (window.innerWidth >= 1024) {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoveredRowPosition({
        x: rect.right + 20, // 20px to the right of the row
        y: rect.top + rect.height / 2 - 84 // Center vertically, offset by half photo height (larger photo)
      });
    }
    setHoveredMember(memberId);
  };

  return (
    <>
      {/* Page transition overlay */}
      <div className="fixed inset-0 z-50 animate-page-transition pointer-events-none"></div>
      
      <div className="min-h-screen p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Brutalist Hero Section */}
          <div className="text-center mb-20 pt-12">
            <h1 className="font-display text-7xl md:text-9xl font-black mb-8 text-foreground animate-emerge-from-void"
                style={{ 
                  animationDelay: '0.3s',
                  textShadow: '8px 8px 0px hsl(var(--primary)), 16px 16px 0px hsl(var(--concrete))'
                }}>
              MEET THE TEAM
            </h1>
            <div className="w-48 h-2 bg-primary mx-auto mb-8 animate-emerge-from-void" 
                 style={{ animationDelay: '0.6s', clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)' }}>
            </div>
            <p className="font-mono text-xl md:text-2xl uppercase tracking-wider text-steel max-w-4xl mx-auto animate-emerge-from-void" 
               style={{ animationDelay: '0.9s' }}>
              The visionaries behind our brutalist revolution. Hover over names to reveal the faces.
            </p>
          </div>

          {/* Team List with Photo Reveal */}
          <div className="relative">
            {/* Floating Photo Container - Desktop Only */}
            {hoveredMember && (
              <div 
                className="fixed z-30 pointer-events-none hidden lg:block"
                style={{
                  left: `${hoveredRowPosition.x}px`,
                  top: `${hoveredRowPosition.y}px`,
                  transform: 'translate3d(0, 0, 0)', // Hardware acceleration
                }}
              >
                <div className="relative animate-brutal-emerge">
                  {/* Larger Photo with Brutalist Frame - Desktop */}
                  <div className="relative w-48 h-56 bg-concrete border-4 border-foreground shadow-brutal overflow-hidden">
                    <img
                      src={teamMembers.find(m => m.id === hoveredMember)?.photo}
                      alt="Team member"
                      className="w-full h-full object-cover"
                      style={{ 
                        filter: 'grayscale(20%) contrast(1.1) brightness(1.05)',
                        clipPath: 'polygon(0 0, 95% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)'
                      }}
                      draggable={false}
                    />
                    
                    {/* Yellow Accent Corners */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Members List - Single Column Layout */}
            <div className="max-w-4xl mx-auto space-y-2">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`group relative transition-all duration-300 hover-target cursor-none animate-emerge-from-void ${
                    hoveredMember === member.id 
                      ? 'bg-primary text-background' 
                      : 'bg-transparent hover:bg-steel/10'
                  }`}
                  style={{ 
                    animationDelay: `${1.2 + index * 0.1}s`,
                  }}
                  onMouseEnter={(e) => handleMouseEnter(member.id, e)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  {/* Team Member Row */}
                  <div className="flex items-center py-6 px-8 border-b border-concrete/30">
                    {/* Number */}
                    <div className={`font-mono text-2xl md:text-3xl font-black mr-12 transition-colors duration-300 ${
                      hoveredMember === member.id ? 'text-background' : 'text-steel'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Member Info */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      <h2 className={`font-mono text-xl md:text-2xl font-black uppercase tracking-wider transition-colors duration-300 ${
                        hoveredMember === member.id ? 'text-background' : 'text-foreground'
                      }`}>
                        {member.name}
                      </h2>
                      <p className={`font-mono text-lg md:text-xl uppercase tracking-wide transition-colors duration-300 ${
                        hoveredMember === member.id ? 'text-background/80' : 'text-muted-foreground'
                      }`}>
                        {member.role}
                      </p>
                    </div>

                    {/* Static Circular Photo - Mobile/Tablet Only */}
                    <div className="lg:hidden ml-6 flex-shrink-0">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-concrete bg-steel">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          style={{ 
                            filter: 'grayscale(10%) contrast(1.1) brightness(1.05)',
                          }}
                          draggable={false}
                        />
                        
                        {/* Circular overlay ring */}
                        <div className="absolute inset-0 rounded-full border border-primary/40"></div>
                      </div>
                    </div>
                  </div>

                  {/* Brutalist Edge Accents */}
                  <div className={`absolute left-0 top-0 w-1 h-full bg-primary transition-all duration-300 ${
                    hoveredMember === member.id ? 'opacity-100 w-2' : 'opacity-0'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="text-center mt-24 pt-16 border-t-2 border-concrete animate-emerge-from-void" 
               style={{ animationDelay: '2.8s' }}>
            <p className="font-mono text-sm text-steel uppercase tracking-wider mb-4">
              Building the future with concrete and code
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="w-8 h-1 bg-primary"></div>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Brutalist Team • 2025
              </span>
              <div className="w-8 h-1 bg-primary"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;