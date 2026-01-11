import React from 'react';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronRight,
  FaHeart
} from 'react-icons/fa';
import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Brand & Social */}
        <div className="footer-brand">
          <h3 className="footer-logo">
            <span className="logo-accent">Ayur</span>VEDA
          </h3>
          <p className="footer-tagline">
            Building amazing experiences
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="footer-links-grid">
          <div className="links-column">
            <h4 className="links-title">Company</h4>
            <ul className="links-list">
              <li><a href="/about"><FaChevronRight className="link-arrow" /> About</a></li>
              <li><a href="/services"><FaChevronRight className="link-arrow" /> Services</a></li>
              <li><a href="/portfolio"><FaChevronRight className="link-arrow" /> Portfolio</a></li>
              <li><a href="/contact"><FaChevronRight className="link-arrow" /> Contact</a></li>
            </ul>
          </div>
          
          <div className="links-column">
            <h4 className="links-title">Resources</h4>
            <ul className="links-list">
              <li><a href="/blog"><FaChevronRight className="link-arrow" /> Blog</a></li>
              <li><a href="/faq"><FaChevronRight className="link-arrow" /> FAQ</a></li>
              <li><a href="/support"><FaChevronRight className="link-arrow" /> Support</a></li>
              <li><a href="/docs"><FaChevronRight className="link-arrow" /> Documentation</a></li>
            </ul>
          </div>
        </div>

        {/* Contact & Newsletter */}
        <div className="footer-cta">
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>hello@brand.com</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          
          <div className="newsletter">
            <h5 className="newsletter-title">Stay Updated</h5>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                <FaEnvelope />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} BrandName. All rights reserved.
        </div>
        <div className="legal-links">
          <a href="/privacy">Privacy</a>
          <span className="separator">•</span>
          <a href="/terms">Terms</a>
          <span className="separator">•</span>
          <a href="/cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;