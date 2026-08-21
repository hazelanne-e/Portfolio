import React from 'react';
import './footer.css';
import { Link } from 'react-scroll';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <Link to="intro" smooth={true} duration={800} offset={-90} className="footerMark">
                HAZEL ANNE CANDELARIA
            </Link>
            <div className="footerRow">
                <p>© {year} Hazel Anne Candelaria. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
