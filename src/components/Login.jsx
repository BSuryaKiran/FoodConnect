import React, { useState } from 'react';
import './Login.css';
import { authAPI } from '../services/api.js';

const Login = ({ onLogin }) => {
  const [userType, setUserType] = useState('donor');
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    organization: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    if (strength === 0) return { label: '', color: '' };
    if (strength <= 2) return { label: 'Weak', color: '#ff4757' };
    if (strength <= 4) return { label: 'Medium', color: '#ffa502' };
    return { label: 'Strong', color: '#26de81' };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update password strength for registration
    if (name === 'password' && isRegistering) {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isRegistering) {
      // Strong password validation for registration
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character (!@#$%^&*...)';
      }
    } else {
      // Basic validation for login
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    // Registration-specific validations
    if (isRegistering) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      
      if (!formData.address) {
        newErrors.address = 'Address is required';
      }
      
      // Organization is required for donors and recipients
      if ((userType === 'donor' || userType === 'recipient') && !formData.organization) {
        newErrors.organization = userType === 'donor' 
          ? 'Organization/Restaurant name is required'
          : 'Organization name is required';
      }
      
      // Additional validation for analyst role
      if (userType === 'analyst' && !formData.organization) {
        newErrors.organization = 'Institution/Company name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isRegistering) {
        // Register new user via API
        const response = await authAPI.register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          organization: formData.organization,
          type: userType
        });

        if (response.success) {
          console.log('✅ User registered:', response.user.email);
          
          // Registration successful
          setSuccessMessage('Account registered successfully! Please sign in.');
          setShowSuccessDialog(true);
          // Reset form after successful registration
          setFormData({
            email: '',
            password: '',
            name: '',
            phone: '',
            address: '',
            organization: ''
          });
          setTimeout(() => {
            setShowSuccessDialog(false);
            setIsRegistering(false);
          }, 2000);
        }
      } else {
        // Sign in - authenticate user via API
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password,
          userType: userType
        });

        if (response.success) {
          const userData = {
            type: response.user.type,
            email: response.user.email,
            name: response.user.name,
            phone: response.user.phone,
            address: response.user.address,
            organization: response.user.organization,
            id: response.user.id
          };

          console.log('✅ User logged in:', { email: userData.email, name: userData.name, type: userData.type });
          
          setSuccessMessage('Signed in successfully!');
          setShowSuccessDialog(true);
          // After showing dialog, proceed to login
          setTimeout(() => {
            setShowSuccessDialog(false);
            onLogin(userData);
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ general: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
      organization: ''
    });
    setErrors({});
    setPasswordStrength(0);
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    setSuccessMessage('');
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="header-nav">
          <button 
            className="back-home-btn"
            onClick={() => window.location.href = '/food-management/'}
            type="button"
          >
            ← Back to Home
          </button>
        </div>
        <div className="logo">
          <span className="logo-icon">🌱</span>
          <h1>FoodConnect</h1>
        </div>
        <p className="tagline">Reduce food wastage, improve food security</p>
      </header>

      <main className="login-main">
        <section className="login-card card fade-in">
          <h2 className="login-title">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="login-subtitle">{isRegistering ? 'Register to get started' : 'Sign in to continue'}</p>

          {/* User Type Selection */}
          <div className="user-type-selector">
            <button
              type="button"
              className={`type-btn ${userType === 'donor' ? 'active' : ''}`}
              onClick={() => {
                setUserType('donor');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  phone: '',
                  address: '',
                  organization: ''
                });
                setErrors({});
                setPasswordStrength(0);
              }}
            >
              <span className="type-icon">🍽️</span>
              <span>Food Donor</span>
            </button>
            <button
              type="button"
              className={`type-btn ${userType === 'recipient' ? 'active' : ''}`}
              onClick={() => {
                setUserType('recipient');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  phone: '',
                  address: '',
                  organization: ''
                });
                setErrors({});
                setPasswordStrength(0);
              }}
            >
              <span className="type-icon">🏛️</span>
              <span>Recipient Org</span>
            </button>
            <button
              type="button"
              className={`type-btn ${userType === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setUserType('admin');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  phone: '',
                  address: '',
                  organization: ''
                });
                setErrors({});
                setPasswordStrength(0);
              }}
            >
              <span className="type-icon">👥</span>
              <span>Admin</span>
            </button>
            <button
              type="button"
              className={`type-btn ${userType === 'analyst' ? 'active' : ''}`}
              onClick={() => {
                setUserType('analyst');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  phone: '',
                  address: '',
                  organization: ''
                });
                setErrors({});
                setPasswordStrength(0);
              }}
            >
              <span className="type-icon">📊</span>
              <span>Data Analyst</span>
            </button>
          </div>

          {/* Login/Register Form */}
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {errors.general && (
              <div className="alert alert-error">
                {errors.general}
              </div>
            )}

            {/* Registration fields */}
            {isRegistering && (
              <>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                  {errors.name && (
                    <span className="form-error">{errors.name}</span>
                  )}
                </div>

                {(userType === 'donor' || userType === 'recipient' || userType === 'analyst') && (
                  <div className="form-group">
                    <label htmlFor="organization" className="form-label">
                      {userType === 'donor' && 'Organization/Restaurant Name'}
                      {userType === 'recipient' && 'Organization Name'}
                      {userType === 'analyst' && 'Institution/Company Name'}
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      className="form-input"
                      placeholder={
                        userType === 'donor' ? 'Enter organization or restaurant name' :
                        userType === 'recipient' ? 'Enter organization name' :
                        userType === 'analyst' ? 'Enter institution or company name' : ''
                      }
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.organization && (
                      <span className="form-error">{errors.organization}</span>
                    )}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.phone && (
                    <span className="form-error">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="form-input form-textarea"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                  />
                  {errors.address && (
                    <span className="form-error">{errors.address}</span>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoFocus={!isRegistering}
                autoComplete="email"
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete={isRegistering ? "new-password" : "current-password"}
              />
              {isRegistering && formData.password && (
                <div style={{marginTop: '0.5rem'}}>
                  <div style={{display: 'flex', gap: '0.25rem', marginBottom: '0.25rem'}}>
                    {[1, 2, 3, 4, 5, 6].map(level => (
                      <div 
                        key={level}
                        style={{
                          height: '4px',
                          flex: 1,
                          borderRadius: '2px',
                          backgroundColor: level <= passwordStrength ? getPasswordStrengthLabel(passwordStrength).color : '#e0e0e0',
                          transition: 'background-color 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                  {passwordStrength > 0 && (
                    <small style={{fontSize: '0.875rem', color: getPasswordStrengthLabel(passwordStrength).color, fontWeight: 500}}>
                      {getPasswordStrengthLabel(passwordStrength).label}
                    </small>
                  )}
                </div>
              )}
              {isRegistering && (
                <small className="form-helper" style={{display: 'block', marginTop: '0.5rem', fontSize: '0.875rem', color: '#666'}}>
                  Password must be at least 8 characters and include uppercase, lowercase, number, and special character
                </small>
              )}
              {errors.password && (
                <span className="form-error">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary login-btn"
              disabled={isLoading}
            >
              {isLoading ? (isRegistering ? 'Creating Account...' : 'Signing in...') : (isRegistering ? 'Register' : 'Sign In')}
            </button>

            <button
              type="button"
              className="btn btn-outline toggle-btn"
              onClick={toggleMode}
            >
              {isRegistering ? 'Already have an account? Sign In' : 'Don\'t have an account? Register'}
            </button>
          </form>

        </section>

        {/* Success Dialog */}
        {showSuccessDialog && (
          <div className="dialog-overlay" onClick={closeSuccessDialog}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
              <div className="success-icon">✅</div>
              <h3>{successMessage}</h3>
              <button className="btn btn-primary" onClick={closeSuccessDialog}>
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;
