import React, { Component } from 'react';
import './navbar.css';
import logo from '../../assets/logoo.png';
import { Link } from 'react-scroll';
import Magnetic from '../Magnetic/magnetic';

const links = [
  { to: 'intro', label: 'Home', index: '01' },
  { to: 'skills', label: 'About', index: '02' },
  { to: 'works', label: 'Work', index: '03' },
  { to: 'contact', label: 'Contact', index: '04' },
];

const NavLinks = ({ onClick, linkClass }) => (
  <>
    {links.map((link) => (
      <Link
        key={link.to}
        activeClass="active"
        to={link.to}
        spy={true}
        smooth={true}
        offset={-90}
        duration={700}
        className={linkClass}
        onClick={onClick}
      >
        <span className="navIndex">{link.index}</span>
        {link.label}
      </Link>
    ))}
  </>
);

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      scrolled: false,
      hidden: false,
      lastY: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = '';
  }

  handleScroll = () => {
    const y = window.scrollY;
    const hidden = y > this.state.lastY && y > 90 && !this.state.showMenu;
    this.setState({
      scrolled: y > 16,
      hidden,
      lastY: y,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.handleCloseMenu();
    }
  };

  handleToggleMenu = () => {
    this.setState((prevState) => {
      const showMenu = !prevState.showMenu;
      document.body.style.overflow = showMenu ? 'hidden' : '';
      return { showMenu, hidden: false };
    });
  };

  handleCloseMenu = () => {
    document.body.style.overflow = '';
    this.setState({ showMenu: false });
  };

  render() {
    const { showMenu, scrolled, hidden } = this.state;

    return (
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'is-hidden' : ''} ${
          showMenu ? 'is-open' : ''
        }`}
      >
        <div className="navInner">
          <Link
            to="intro"
            smooth={true}
            duration={700}
            offset={-90}
            className="logoLink"
            onClick={this.handleCloseMenu}
          >
            <img src={logo} alt="Hazel Anne logo" className="logo" />
            <span>hazelcreatives</span>
          </Link>

          <div className="Menu">
            <NavLinks linkClass="MenuListItem" />
          </div>

          <Magnetic>
            <Link to="contact" smooth={true} duration={700} offset={-90} className="navCta">
              Let’s talk
            </Link>
          </Magnetic>

          <button
            type="button"
            className={`mobMenu ${showMenu ? 'open' : ''}`}
            onClick={this.handleToggleMenu}
            aria-label={showMenu ? 'Close menu' : 'Open menu'}
            aria-expanded={showMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`navMenu ${showMenu ? 'open' : ''}`}>
          <NavLinks linkClass="ListItem" onClick={this.handleCloseMenu} />
          <Link
            to="contact"
            smooth={true}
            duration={700}
            offset={-90}
            className="mobileCta"
            onClick={this.handleCloseMenu}
          >
            Let’s talk
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
