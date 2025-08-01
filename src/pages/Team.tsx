import { useState } from 'react';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const teamMembers = [
    { id: 'john', name: 'JOHN BRUTAL', role: 'CREATIVE DIRECTOR' },
    { id: 'jane', name: 'JANE CONCRETE', role: 'LEAD DEVELOPER' },
    { id: 'alex', name: 'ALEX STEEL', role: 'UI/UX DESIGNER' },
    { id: 'sam', name: 'SAM NEON', role: 'FRONT-END DEV' },
  ];

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl font-black mb-16 text-center">
          THE TEAM
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative border-2 border-concrete p-8 hover-target cursor-none"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <h2 className="font-mono text-2xl font-bold uppercase tracking-wider mb-2">
                {member.name}
              </h2>
              <p className="font-mono text-lg text-muted-foreground uppercase tracking-wide">
                {member.role}
              </p>
              
              {/* Photo Popup Effect */}
              {hoveredMember === member.id && (
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent border-2 border-ink animate-pulse">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-mono text-xs font-bold text-accent-foreground">
                      [PHOTO]
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;