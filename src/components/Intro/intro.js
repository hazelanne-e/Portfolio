import React, { useEffect, useState } from 'react';
import './intro.css';
import bg from '../../assets/image2.png';
import { Link } from 'react-scroll';
import Magnetic from '../Magnetic/magnetic';

const roles = [
  'Web Developer',
  'Front-End Developer',
  'Project Manager',
];

const Intro = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[roleIndex];
    let timeout;

    if (!deleting && text === full) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text === '') {
      setDeleting(false);
      setRoleIndex((index) => (index + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1)
        );
      }, deleting ? 34 : 76);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section id="intro">
      <div id="introContent">
        <div className="availability">
          <span className="pulse" />
          Available for Freelance Projects
        </div>
        <p className="hello">Hello, I am</p>
        <h1 className="introText">
          <span className="introLine">
            <span className="introName">HAZEL ANNE</span>
          </span>
        </h1>
        <p className="introRole">
          <span>{text}</span>
          <span className="caret">|</span>
        </p>
        <p className="introPara">
          I graduated with a <strong>BSIT</strong> major in{' '}
          <strong>Systems Development</strong>. I have developed several web
          applications and contributed to my university through those systems.
          I am open to freelance and contract projects, and I excel in{' '}
          <strong>Project Management</strong> — knowledgeable in Agile
          Methodologies and <strong>Front-End Development</strong>.
        </p>
        <div className="introActions">
          <Magnetic>
            <Link to="contact" smooth={true} duration={700} offset={-90}>
              <button type="button" className="btn">
                Let’s Collaborate
              </button>
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link to="works" smooth={true} duration={700} offset={-90}>
              <button type="button" className="btn btnGhost">
                See Projects
              </button>
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="introPhoto">
        <div className="photoRing">
          <svg viewBox="0 0 200 200" className="spinText">
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text>
              <textPath href="#circlePath" xlinkHref="#circlePath">
                PROJECT MANAGER • HAZEL ANNE • WEB DEVELOPER •
              </textPath>
            </text>
          </svg>
          <img src={bg} alt="Hazel Anne Candelaria" className="bg" />
        </div>
        <div className="scrollHint">
          <span />
          Scroll
        </div>
      </div>
    </section>
  );
};

export default Intro;
