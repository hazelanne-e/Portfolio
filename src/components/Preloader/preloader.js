import { useEffect, useState } from 'react';
import './preloader.css';

const Preloader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let frame;

    const tick = (now) => {
      const next = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 500);
        }, 180);
      }
    };

    document.body.style.overflow = 'hidden';
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div className={`preloader ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="preloaderBrand">
        <h1 className="preloaderName">
          <span>HAZEL ANNE</span>
          <span>CANDELARIA</span>
        </h1>
        <span className="preloaderLine" />
        <span className="preloaderCount">{String(progress).padStart(3, '0')}</span>
      </div>
    </div>
  );
};

export default Preloader;
