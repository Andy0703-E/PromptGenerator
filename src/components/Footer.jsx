import React from 'react';
import { translations } from '../utils/translations';
import './Footer.css';

const Footer = ({ language }) => {
  const t = translations[language];
  
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>{t.footerTitle || "JSON Prompt Builder"}</h4>
          <p>{t.footerDescription || "Build and customize AI prompts with ease"}</p>
        </div>
        
        <div className="footer-section">
          <h4>{t.footerLinks || "Links"}</h4>
          <ul>
            <li>
              <a 
                href="https://github.com/andy0703-E/PromptGenerator" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a 
                href="https://docs.groq.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Groq API Docs
              </a>
            </li>
            <li>
              <a 
                href="https://platform.openai.com/docs/guides/prompt-engineering" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Prompt Engineering Guide
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>{t.footerContact || "Contact"}</h4>
          <p>Email: support@promptbuilder.com</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="GitHub">🐙</a>
            <a href="#" aria-label="Discord">💬</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Andi Agung. {t.footerRights || "All rights reserved."}</p>
        <p className="version">v1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;
