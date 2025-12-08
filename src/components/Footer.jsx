import React from 'react';
import { translations } from '../utils/translations';
import './Footer.css';

const Footer = ({ language }) => {
  const t = translations[language];
  
  return (
    <footer className="app-footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Andi Agung. {t.footerRights || "All rights reserved."}</p>
        <p className="version">v1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;
