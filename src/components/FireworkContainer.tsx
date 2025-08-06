import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import Firework from './Firework';

interface ActiveFirework {
  id: string;
  x: number;
  y: number;
}

interface FireworkContainerRef {
  triggerFirework: () => void;
}

const FireworkContainer = forwardRef<FireworkContainerRef>((_props, ref) => {
  const [activeFireworks, setActiveFireworks] = useState<ActiveFirework[]>([]);

  const triggerFirework = useCallback(() => {
    const id = `firework-${Date.now()}-${Math.random()}`;
    const x = Math.random() * (window.innerWidth - 100) + 50; // Random x position with margin
    const y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.2); // Random y in middle area
    
    const newFirework: ActiveFirework = { id, x, y };
    setActiveFireworks(prev => [...prev, newFirework]);
  }, []);

  const handleFireworkComplete = useCallback((fireworkId: string) => {
    setActiveFireworks(prev => prev.filter(fw => fw.id !== fireworkId));
  }, []);

  useImperativeHandle(ref, () => ({
    triggerFirework,
  }), [triggerFirework]);

  return (
    <>
      {activeFireworks.map(firework => (
        <Firework
          key={firework.id}
          id={firework.id}
          x={firework.x}
          y={firework.y}
          onComplete={handleFireworkComplete}
        />
      ))}
    </>
  );
});

FireworkContainer.displayName = 'FireworkContainer';

export { type ActiveFirework };
export default FireworkContainer;