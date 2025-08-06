import React, { useEffect, useState } from 'react';

interface FireworkParticle {
  id: string;
  x: number;
  y: number;
  color: string;
  delay: number;
}

interface FireworkProps {
  id: string;
  x: number;
  y: number;
  onComplete: (id: string) => void;
}

const Firework: React.FC<FireworkProps> = ({ id, x, y, onComplete }) => {
  const [particles, setParticles] = useState<FireworkParticle[]>([]);
  const [launched, setLaunched] = useState(false);

  const colors = [
    'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 
    'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-orange-400'
  ];

  useEffect(() => {
    // Create launch animation first
    setLaunched(true);
    
    // After launch animation, create explosion particles
    const launchTimer = setTimeout(() => {
      const newParticles: FireworkParticle[] = [];
      const particleCount = 8 + Math.floor(Math.random() * 8); // 8-15 particles
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: `${id}-particle-${i}`,
          x: x + (Math.random() - 0.5) * 200, // Spread particles around center
          y: y + (Math.random() - 0.5) * 200,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 300, // Random delay for more natural effect
        });
      }
      
      setParticles(newParticles);
    }, 600); // Wait for launch animation

    // Clean up after explosion animation
    const cleanupTimer = setTimeout(() => {
      onComplete(id);
    }, 2000);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(cleanupTimer);
    };
  }, [id, x, y, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Launch streak */}
      {launched && (
        <div
          className="absolute w-1 h-8 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-full animate-firework shadow-lg"
          style={{
            left: `${x}px`,
            bottom: '0',
            animationDuration: '0.6s',
            transformOrigin: 'bottom',
          }}
        />
      )}
      
      {/* Explosion particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-3 h-3 ${particle.color} rounded-full animate-burst shadow-lg`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animationDelay: `${particle.delay}ms`,
            animationDuration: '1.5s',
            transform: 'scale(0)',
          }}
        />
      ))}
      
      {/* Secondary sparkles for more visual appeal */}
      {particles.map((particle, index) => (
        index % 2 === 0 && (
          <div
            key={`sparkle-${particle.id}`}
            className={`absolute w-1 h-1 bg-white rounded-full animate-sparkle opacity-80`}
            style={{
              left: `${particle.x + 5}px`,
              top: `${particle.y + 5}px`,
              animationDelay: `${particle.delay + 200}ms`,
              animationDuration: '1s',
            }}
          />
        )
      ))}
    </div>
  );
};

export default Firework;