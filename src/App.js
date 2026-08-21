import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar/navbar';
import Intro from './components/Intro/intro';
import About from './components/About/about';
import Works from './components/Works/works';
import Contact from './components/Contact/contact';
import Footer from './components/Footer/footer';
import Cursor from './components/Cursor/cursor';
import Preloader from './components/Preloader/preloader';

function App() {
  const [showTop, setShowTop] = useState(false);
  const [booting, setBooting] = useState(true);
  const [progress, setProgress] = useState(0);

  const finishBoot = useCallback(() => setBooting(false), []);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? root.scrollTop / max : 0);
      setShowTop(window.scrollY > 520);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {booting && <Preloader onDone={finishBoot} />}
      <Cursor />
      <div className="ambient" aria-hidden="true">
        <span className="orb one" />
        <span className="orb two" />
        <span className="orb three" />
      </div>
      <div className="pageGrid" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="scrollProgress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className={`site ${booting ? 'is-booting' : ''}`}>
        <Navbar />
        <Intro />
        <About />
        <Works />
        <Contact />
        <Footer />
      </div>
      <button
        type="button"
        className={`scrollTop ${showTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        TOP
      </button>
    </>
  );
}

export default App;
