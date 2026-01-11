import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://ayurvedab.vercel.app/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (err) {
        console.error("Auth check error:", err);
      }
    };

    checkAuth();

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkAuth()]);

  const handleLogout = async () => {
    try {
      const res = await fetch("https://ayurvedab.vercel.app/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(false);
        setIsMobileMenuOpen(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`header ${isScrolled ? "scrolled" : ""} ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        <div className="container">
          <div className="logo">
            <Link to="/">AyurVEDA</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
          </nav>

          <div className="header-right">
            {/* Auth Section */}
            <div className="auth-section">
              {!isLoggedIn ? (
                <>
                  <Link to="/signup" className="btn-signup">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn-login">
                    Login
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              )}
            </div>

            {/* Icons Section */}
            <div className="icons-section">
              <Link to="/favorite" className="icon-link">
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </Link>
              <Link to="/bag" className="icon-link">
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 16H5V8h14v11z"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
          <nav className="mobile-nav-menu">
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/product" onClick={closeMobileMenu}>
              Product
            </Link>
            <Link to="/blog" onClick={closeMobileMenu}>
              Blog
            </Link>
            <Link to="/about-us" onClick={closeMobileMenu}>
              About Us
            </Link>
            <Link to="/contact-us" onClick={closeMobileMenu}>
              Contact Us
            </Link>

            <div className="mobile-auth-section">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="btn-signup-mobile"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="btn-login-mobile"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="btn-logout-mobile">
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeMobileMenu}></div>
        )}
      </header>

      {/* Prevent body scroll when mobile menu is open */}
      <style jsx="true">{`
        body {
          overflow: ${isMobileMenuOpen ? "hidden" : "auto"};
        }
      `}</style>
    </>
  );
};

export default Header;
