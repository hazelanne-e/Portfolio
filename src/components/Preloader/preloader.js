import { useEffect, useState } from 'react';
import './preloader.css';

const Preloader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1700;
    let frame;

    const tick = (now) => {
      const next = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 720);
        }, 280);
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
      <p className="preloaderBrand">hazelcreatives</p>
      <h2 className="preloaderName">
        HAZEL <span>ANNE</span>
      </h2>
      <div className="preloaderBar">
        <span style={{ width: `${progress}%` }} />
      </div>
      <span className="preloaderCount">{String(progress).padStart(3, '0')}</span>
    </div>
  );
};

export default Preloader;
