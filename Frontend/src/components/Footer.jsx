// src/components/Footer.jsx
import React from 'react';
import '../style/footer.css';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>Inkly</h2>
          <p>&copy; {new Date().getFullYear()} Inkly. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <FiFacebook/>
          <FiInstagram/>
          <FiTwitter/>
          <FiLinkedin/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
