import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* =======================
     CHECK AUTH (RUN ONCE)
  ======================= */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "https://ayurvedab.vercel.app/check-auth",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setIsLoggedIn(Boolean(data.isLoggedIn));
      } catch (err) {
        console.error("Auth check error:", err);
      }
    };

    checkAuth();
  }, []);

  /* =======================
     SCROLL EFFECT (OPTIMIZED)
  ======================= */
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;

      setIsScrolled(prev => {
        if (prev !== scrolled) return scrolled;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =======================
     BODY SCROLL LOCK
  ======================= */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  /* =======================
     HANDLERS
  ======================= */
  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://ayurvedab.vercel.app/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

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
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /* =======================
     JSX
  ======================= */
  return (
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

          {/* Icons */}
          <div className="icons-section">
            <Link to="/favorite" className="icon-link">
              ❤️
            </Link>
            <Link to="/bag" className="icon-link">
              🛒
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
        <nav className="mobile-nav-menu">
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/product" onClick={closeMobileMenu}>Product</Link>
          <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
          <Link to="/about-us" onClick={closeMobileMenu}>About Us</Link>
          <Link to="/contact-us" onClick={closeMobileMenu}>Contact Us</Link>

          <div className="mobile-auth-section">
            {!isLoggedIn ? (
              <>
                <Link to="/signup" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
                <Link to="/login" onClick={closeMobileMenu}>
                  Login
                </Link>
              </>
            ) : (
              <button onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
};

export default Header;
