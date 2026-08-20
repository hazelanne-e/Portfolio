import { useEffect, useRef, useState } from 'react';
import './cursor.css';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;

    setEnabled(true);
    document.body.classList.add('has-cursor');

    const point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: point.x, y: point.y };
    let hovering = false;
    let frame;

    const onMove = (event) => {
      point.x = event.clientX;
      point.y = event.clientY;
      const interactive = event.target.closest(
        'a, button, .workCard, .magnetic, .skillIndiv, .filterChip'
      );
      hovering = Boolean(interactive) && !event.target.closest('input, textarea');
    };

    const loop = () => {
      ring.x += (point.x - ring.x) * 0.16;
      ring.y += (point.y - ring.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${point.x}px, ${point.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) scale(${
          hovering ? 1.85 : 1
        })`;
        ringRef.current.classList.toggle('is-hover', hovering);
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="cursorDot" ref={dotRef} />
      <div className="cursorRing" ref={ringRef} />
    </>
  );
};

export default Cursor;
