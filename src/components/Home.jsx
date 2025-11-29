import React from 'react';
import './Home.css';

const Home = ({ onGetStarted }) => {
  const scrollToFeatures = () => {
    document.querySelector('.features-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="home-container">
      {/* Navigation Header */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <span className="nav-logo">🌱</span>
            <h1 className="nav-title">FoodConnect</h1>
          </div>
          <div className="nav-actions">
            <button className="btn btn-outline nav-btn" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Reduce Food Waste,<br />
              <span className="hero-highlight">Feed Hope</span>
            </h1>
            <p className="hero-description">
              Connect food donors with recipient organizations across India to build a sustainable future. 
              Our platform helps reduce food wastage while improving food security 
              in communities nationwide.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-large" onClick={onGetStarted}>
                Join the Movement
              </button>
              <button className="btn btn-outline btn-large learn-more-btn" onClick={scrollToFeatures}>
                Learn More
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Meals Saved</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Indian Cities</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-visual">
              <div className="food-icons">
                <span className="food-icon">🥕</span>
                <span className="food-icon">🍞</span>
                <span className="food-icon">🥗</span>
                <span className="food-icon">🍎</span>
                <span className="food-icon">🥛</span>
              </div>
              <div className="connection-line"></div>
              <div className="community-icons">
                <span className="community-icon">👨‍👩‍👧‍👦</span>
                <span className="community-icon">🏠</span>
                <span className="community-icon">🏫</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How FoodConnect Works</h2>
            <p className="section-subtitle">
              Three simple steps to make a meaningful impact in your community
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Track Impact</h3>
              <p className="feature-description">
                Monitor food donations and their impact on reducing waste. 
                See real-time statistics on meals saved and people helped.
              </p>
              <ul className="feature-list">
                <li>Real-time donation tracking</li>
                <li>Environmental impact metrics</li>
                <li>Community impact reports</li>
              </ul>
            </div>

            <div className="feature-card featured">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Connect</h3>
              <p className="feature-description">
                Link donors with seekers to distribute surplus food efficiently. 
                Build lasting partnerships within your community.
              </p>
              <ul className="feature-list">
                <li>Smart matching system</li>
                <li>Direct communication tools</li>
                <li>Location-based connections</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3 className="feature-title">Make a Difference</h3>
              <p className="feature-description">
                Contribute to food security and environmental sustainability. 
                Every donation helps create a better world.
              </p>
              <ul className="feature-list">
                <li>Reduce carbon footprint</li>
                <li>Support local communities</li>
                <li>Build sustainable practices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Simple Process, Maximum Impact</h2>
            <p className="section-subtitle">Get started in just a few clicks</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Up</h3>
                <p>Choose your role as a food donor or seeker and create your account</p>
              </div>
            </div>
            
            <div className="process-arrow">→</div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>List or Request</h3>
                <p>Donors list surplus food, seekers request needed items</p>
              </div>
            </div>
            
            <div className="process-arrow">→</div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Connect & Share</h3>
                <p>Get matched automatically and coordinate food distribution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="user-types-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Join as a Donor or Seeker</h2>
            <p className="section-subtitle">Choose your role and start making an impact today</p>
          </div>
          
          <div className="user-types-grid">
            <div className="user-type-card">
              <div className="user-type-icon">🍽️</div>
              <h3>Food Donors</h3>
              <p>Restaurants, grocery stores, cafeterias, and individuals with surplus food</p>
              <ul className="user-type-benefits">
                <li>Reduce food waste costs</li>
                <li>Get tax deduction benefits</li>
                <li>Build community reputation</li>
                <li>Environmental impact tracking</li>
              </ul>
              <button className="btn btn-primary user-type-btn" onClick={onGetStarted}>
                Become a Donor
              </button>
            </div>
            
            <div className="user-type-card">
              <div className="user-type-icon">🤝</div>
              <h3>Food Seekers</h3>
              <p>Food banks, shelters, community kitchens, and charitable organizations</p>
              <ul className="user-type-benefits">
                <li>Access fresh, quality food</li>
                <li>Coordinate efficient pickups</li>
                <li>Serve more people in need</li>
                <li>Build donor relationships</li>
              </ul>
              <button className="btn btn-primary user-type-btn" onClick={onGetStarted}>
                Become a Seeker
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;