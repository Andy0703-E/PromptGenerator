import React from 'react';
import { translations } from '../utils/translations';
import './Footer.css';

const Footer = ({ language = 'en' }) => {
  const t = translations?.[language] || translations?.en || {};
  
  return (
    <footer className="app-footer">
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Andi Agung. {t.footerRights || "All rights reserved."}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
