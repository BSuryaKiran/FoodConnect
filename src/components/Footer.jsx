import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = ({ onGetStarted }) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', content: '', icon: '' });

  const handleSupportClick = (type) => {
    let content = {};
    
    switch(type) {
      case 'help':
        content = {
          title: 'Help Center',
          icon: '🆘',
          content: (
            <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
              <h4 style={{ color: 'var(--primary-green)', marginBottom: '15px' }}>Frequently Asked Questions:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                <li style={{ marginBottom: '8px' }}>How to donate surplus food?</li>
                <li style={{ marginBottom: '8px' }}>How to request food assistance?</li>
                <li style={{ marginBottom: '8px' }}>Food safety guidelines</li>
                <li style={{ marginBottom: '8px' }}>Account management help</li>
                <li style={{ marginBottom: '8px' }}>Pickup and delivery coordination</li>
              </ul>
              <p style={{ fontStyle: 'italic', color: '#666' }}>
                Need more help? Contact us at: <strong>support@foodconnect.com</strong>
              </p>
            </div>
          )
        };
        break;
      case 'contact':
        content = {
          title: 'Contact Us',
          icon: '📧',
          content: (
            <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Get in Touch</h4>
                <p style={{ marginBottom: '15px' }}>We're here to help! Reach out to us through any of these channels:</p>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>📧 Email:</strong> support@foodconnect.com
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>📞 Phone:</strong> 1-800-FOOD-CONNECT
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>⏰ Support Hours:</strong> Monday-Friday, 9 AM - 6 PM EST
              </div>
              <p style={{ fontStyle: 'italic', color: '#666', marginTop: '20px' }}>
                Response time: We typically respond within 24 hours
              </p>
            </div>
          )
        };
        break;
      case 'about':
        content = {
          title: 'About FoodConnect',
          icon: '🌱',
          content: (
            <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Our Mission</h4>
                <p style={{ marginBottom: '15px' }}>
                  Connecting food donors with food seekers to reduce waste and fight hunger in our communities.
                </p>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>🏢 Founded:</strong> 2025
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>👥 Team:</strong> Passionate developers committed to social impact
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>🎯 Goal:</strong> Zero food waste, zero hunger
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>🌍 Impact:</strong> Helping communities reduce food waste while addressing food insecurity
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--primary-green)', fontWeight: 'bold' }}>
                Together, we can build a world with zero food waste! 🌍
              </p>
            </div>
          )
        };
        break;
      default:
        return;
    }
    
    setDialogContent(content);
    setShowDialog(true);
  };

  const handlePlatformClick = (type) => {
    let content = {};
    
    if (type === 'features') {
      content = {
        title: 'Platform Features',
        icon: '✨',
        content: (
          <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Powerful Tools for Food Sharing</h4>
              <p style={{ marginBottom: '15px' }}>
                FoodConnect provides comprehensive features to make food donation and distribution simple and efficient.
              </p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>📱 Smart Matching:</strong> Automatic pairing of donors with nearby seekers
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>📍 Location Tracking:</strong> GPS-based proximity matching for efficient pickups
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>💬 Real-time Messaging:</strong> Integrated communication between users
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>📊 Impact Dashboard:</strong> Track your donations and environmental impact
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>⏰ Scheduling:</strong> Flexible pickup and delivery time coordination
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>🔔 Smart Notifications:</strong> Real-time alerts for new matches and updates
            </div>
            <div style={{ marginBottom: '20px' }}>
              <strong>🛡️ Safety Features:</strong> User verification and food safety guidelines
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--primary-green)', fontWeight: 'bold' }}>
              Everything you need to make food sharing safe, simple, and impactful! 🚀
            </p>
          </div>
        )
      };
    } else if (type === 'how-it-works') {
      content = {
        title: 'How FoodConnect Works',
        icon: '🔄',
        content: (
          <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Simple 3-Step Process</h4>
              <p style={{ marginBottom: '15px' }}>
                Getting started with FoodConnect is easy. Follow these simple steps to start making a difference.
              </p>
            </div>
            
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--pale-green)', borderRadius: '8px' }}>
              <h5 style={{ color: 'var(--primary-green)', marginBottom: '8px' }}>🚀 Step 1: Sign Up</h5>
              <p style={{ margin: '0', fontSize: '14px' }}>
                Create your account and choose your role as either a Food Donor (restaurants, stores, individuals) or Food Seeker (food banks, shelters, communities).
              </p>
            </div>
            
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--pale-green)', borderRadius: '8px' }}>
              <h5 style={{ color: 'var(--primary-green)', marginBottom: '8px' }}>📋 Step 2: List or Request</h5>
              <p style={{ margin: '0', fontSize: '14px' }}>
                Donors post available surplus food with details and photos. Seekers browse available items or post specific food requests for their community needs.
              </p>
            </div>
            
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--pale-green)', borderRadius: '8px' }}>
              <h5 style={{ color: 'var(--primary-green)', marginBottom: '8px' }}>🤝 Step 3: Connect & Share</h5>
              <p style={{ margin: '0', fontSize: '14px' }}>
                Our smart matching system connects donors and seekers based on location and needs. Coordinate pickup/delivery through our messaging system and make an impact!
              </p>
            </div>
            
            <p style={{ fontStyle: 'italic', color: 'var(--primary-green)', fontWeight: 'bold', textAlign: 'center' }}>
              It's that simple! Join thousands making a difference today. 🌟
            </p>
          </div>
        )
      };
    }
    
    setDialogContent(content);
    setShowDialog(true);
  };

  const handleCommunityClick = (type) => {
    if (type === 'donor' || type === 'seeker') {
      // Navigate to login page using React Router
      navigate('/login');
    } else if (type === 'impact') {
      // Show impact dialog
      const content = {
        title: 'Our Impact',
        icon: '📊',
        content: (
          <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Making a Difference Together</h4>
              <p style={{ marginBottom: '15px' }}>
                FoodConnect is creating positive impact in communities across India through food waste reduction and hunger relief.
              </p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>🍽️ Food Rescued:</strong> 50,000+ meals saved from waste
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>🤝 People Helped:</strong> 10,000+ individuals served
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>🏢 Active Partners:</strong> 200+ restaurants and food banks
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>🌍 Environmental Impact:</strong> 75 tonnes of CO₂ emissions prevented
            </div>
            <div style={{ marginBottom: '20px' }}>
              <strong>📍 Cities Served:</strong> 50+ Indian cities
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--primary-green)', fontWeight: 'bold' }}>
              Join us in creating an even bigger impact! Every donation and request makes a difference. 💚
            </p>
          </div>
        )
      };
      
      setDialogContent(content);
      setShowDialog(true);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setDialogContent({ title: '', content: '', icon: '' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">🌱</span>
            <div>
              <h3>FoodConnect</h3>
              <p>Reducing waste, feeding hope</p>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <a onClick={() => handlePlatformClick('features')}>Features</a>
              <a onClick={() => handlePlatformClick('how-it-works')}>How it Works</a>
              <a href="#get-started" onClick={onGetStarted}>Get Started</a>
            </div>
            <div className="footer-column">
              <h4>Community</h4>
              <a onClick={() => handleCommunityClick('donor')}>For Donors</a>
              <a onClick={() => handleCommunityClick('seeker')}>For Seekers</a>
              <a onClick={() => handleCommunityClick('impact')}>Impact</a>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <a onClick={() => handleSupportClick('help')}>Help Center</a>
              <a onClick={() => handleSupportClick('contact')}>Contact</a>
              <a onClick={() => handleSupportClick('about')}>About</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 FoodConnect. All rights reserved. Reducing waste, feeding hope.</p>
        </div>
      </div>

      {/* Support Dialog */}
      {showDialog && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <div className="dialog-icon">{dialogContent.icon}</div>
              <h3>{dialogContent.title}</h3>
            </div>
            <div className="dialog-body">
              {dialogContent.content}
            </div>
            <div className="dialog-footer">
              <button className="btn btn-primary" onClick={closeDialog}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;