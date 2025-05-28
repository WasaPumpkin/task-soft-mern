// src/components/organisms/Footer/Footer.tsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </p>
        <nav className="footer__links">
          <a href="/about" className="footer__link">
            About
          </a>
          <a href="/contact" className="footer__link">
            Contact
          </a>
          <a href="/privacy" className="footer__link">
            Privacy Policy
          </a>
        </nav>
        <div className="footer__social">
          <a href="https://facebook.com" className="footer__social-link">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" className="footer__social-link">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="footer__social-link">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;