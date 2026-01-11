// IndexPage.jsx
import React, { useState, useEffect } from 'react';
import product1 from '../assets/images/product1.jpg';
import product2 from '../assets/images/product2.jpg';
import product3 from '../assets/images/product3.jpg';
import './Home.css';


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    experience: 0,
    success: 0
  });

  useEffect(() => {
    setIsVisible(true);
    startCounterAnimation();
  }, []);

  const startCounterAnimation = () => {
    const targets = {
      customers: 10000,
      products: 50,
      experience: 15,
      success: 98
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const target = targets[key];
      const stepValue = target / steps;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });
  };

  const features = [
    {
      icon: '🌿',
      title: '100% Natural',
      description: 'Pure herbal ingredients sourced from organic farms'
    },
    {
      icon: '⚡',
      title: 'Fast Acting',
      description: 'Visible results within weeks of regular use'
    },
    {
      icon: '💚',
      title: 'Side-effect Free',
      description: 'No chemicals, no artificial preservatives'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      comment: 'These products transformed my skin naturally!',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      comment: 'Best Ayurvedic products I have ever used.',
      rating: 5
    },
    {
      name: 'Anita Patel',
      comment: 'Authentic and effective. Highly recommended!',
      rating: 4
    }
  ];

  return (
    <div className="index-page">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="hero-background">
          <div className="floating-leaves">
            <div className="leaf leaf-1">🍃</div>
            <div className="leaf leaf-2">🌿</div>
            <div className="leaf leaf-3">🍂</div>
            <div className="leaf leaf-4">🌱</div>
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Discover the Power of</span>
            <span className="title-line highlight">Ancient Ayurveda</span>
          </h1>
          <p className="hero-subtitle">
            Experience holistic wellness with our authentic, time-tested Ayurvedic solutions 
            crafted for modern lifestyles
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" >
              <span>Explore Products</span>
              <div className="btn-shine"></div>
            </button>
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="product-showcase">
            <div className="product-item item-1">
              <div className="product-image-container">
                <img 
                  src={product1} 
                  alt="Organic Turmeric Powder" 
                  className="product-hd-image"
                  loading="eager"
                />
                <div className="product-overlay">
                  <span className="product-label">Turmeric</span>
                </div>
              </div>
              <div className="product-glow"></div>
            </div>
            <div className="product-item item-2">
              <div className="product-image-container">
                <img 
                  src={product2} 
                  alt="Ashwagandha Capsules" 
                  className="product-hd-image"
                  loading="eager"
                />
                <div className="product-overlay">
                  <span className="product-label">Ashwagandha</span>
                </div>
              </div>
              <div className="product-glow"></div>
            </div>
            <div className="product-item item-3">
              <div className="product-image-container">
                <img 
                  src={product3} 
                  alt="Triphala Churna" 
                  className="product-hd-image"
                  loading="eager"
                />
                <div className="product-overlay">
                  <span className="product-label">Triphala</span>
                </div>
              </div>
              <div className="product-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - CENTERED HORIZONTAL */}
      <section className="features-section">
        <div className="centered-section">
          <div className="centered-header">
            <h2>Why Choose Our Ayurvedic Products?</h2>
            <p>Experience the difference with our authentic formulations</p>
          </div>
          <div className="centered-horizontal-container">
            <div className="centered-horizontal-content">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="centered-card"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="card-icon">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="card-wave"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - CENTERED HORIZONTAL */}
      <section className="stats-section">
        <div className="centered-section">
          <div className="centered-header">
            <h2>Our Achievements</h2>
            <p>Trusted by thousands for authentic Ayurvedic solutions</p>
          </div>
          <div className="centered-horizontal-container">
            <div className="centered-horizontal-content stats-content">
              <div className="centered-stat-card">
                <div className="stat-number">{stats.customers}+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="centered-stat-card">
                <div className="stat-number">{stats.products}+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="centered-stat-card">
                <div className="stat-number">{stats.experience}+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="centered-stat-card">
                <div className="stat-number">{stats.success}%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - CENTERED HORIZONTAL */}
      <section className="testimonials-section">
        <div className="centered-section">
          <div className="centered-header">
            <h2>What Our Customers Say</h2>
            <p>Real stories from real people</p>
          </div>
          <div className="centered-horizontal-container">
            <div className="centered-horizontal-content">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="centered-testimonial-card"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="testimonial-content">
                    <div className="stars">
                      {'★'.repeat(testimonial.rating)}
                      {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                    <p>"{testimonial.comment}"</p>
                    <div className="customer-name">{testimonial.name}</div>
                  </div>
                  <div className="testimonial-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="centered-section">
          <div className="cta-content">
            <h2>Ready to Start Your Wellness Journey?</h2>
            <p>Join thousands of satisfied customers experiencing natural healing</p>
            <button className="btn btn-large">
              <span>Shop Now</span>
              <div className="btn-particles">
                <span>✨</span>
                <span>🌿</span>
                <span>💫</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;