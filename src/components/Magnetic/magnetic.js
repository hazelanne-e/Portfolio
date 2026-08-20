import { useRef } from 'react';

const Magnetic = ({ children, strength = 0.32, className = '' }) => {
  const ref = useRef(null);

  const handleMove = (event) => {
    const node = ref.current;
    if (!node || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)';
    }
  };

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

export default Magnetic;
