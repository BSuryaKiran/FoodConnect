// Import React library and hooks for state management and side effects
import React, { useState, useEffect } from 'react';
// Import React Router components for navigation and routing
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// Import all page components
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';
import SeekerDashboard from './components/SeekerDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import DataAnalystDashboard from './components/DataAnalystDashboard.jsx';
import Footer from './components/Footer.jsx';
// Import global application styles
import './App.css';

/**
 * AppContent Component
 * Main component that handles routing, user authentication, and session management
 * This component must be inside Router to use navigation hooks
 */
function AppContent() {
  // State to store currently logged-in user information
  const [user, setUser] = useState(null);
  // State to manage loading status during session check
  const [loading, setLoading] = useState(true);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Effect hook to check for existing user session on component mount
   * Attempts to restore user session from localStorage
   * Runs only once when component mounts (empty dependency array)
   */
  useEffect(() => {
    // Retrieve stored user data from browser's localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        // Parse the stored JSON string and set as current user
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If parsing fails (corrupted data), log error and clear storage
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    // Set loading to false after checking for session
    setLoading(false);
  }, []);

  /**
   * Handle user login
   * @param {Object} userData - User information including type, email, name
   * Stores user data in state and persists to localStorage
   */
  const handleLogin = (userData) => {
    setUser(userData);
    // Persist user session in localStorage for persistence across page refreshes
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  /**
   * Handle user logout
   * Clears user session from state and localStorage
   * Redirects to home page
   */
  const handleLogout = () => {
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem('currentUser');
    // Navigate to home page
    navigate('/');
  };

  /**
   * Handle "Get Started" button click
   * Navigates user to login page
   */
  const handleGetStarted = () => {
    navigate('/login');
  };

  // Show loading spinner while checking for existing session
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Main application render with routing configuration
  return (
    <div className="App">
      <div className="app-content">
        {/* Define all application routes */}
        <Routes>
          {/* Home Route: Shows landing page or redirects to dashboard if logged in */}
          <Route 
            path="/" 
            element={
              user ? (
                // If user is logged in, redirect to their role-specific dashboard
                // Note: 'recipient' type is mapped to 'seeker' dashboard
                <Navigate to={`/${user.type === 'recipient' ? 'seeker' : user.type}-dashboard`} replace />
              ) : (
                // If not logged in, show home page
                <Home onGetStarted={handleGetStarted} />
              )
            } 
          />
          {/* Login Route: Shows login page or redirects to dashboard if already logged in */}
          <Route 
            path="/login" 
            element={
              user ? (
                // If already logged in, redirect to appropriate dashboard
                <Navigate to={`/${user.type === 'recipient' ? 'seeker' : user.type}-dashboard`} replace />
              ) : (
                // If not logged in, show login page
                <Login onLogin={handleLogin} />
              )
            } 
          />
          {/* Donor Dashboard Route: Protected route for donor users only */}
          <Route 
            path="/donor-dashboard" 
            element={
              user && user.type === 'donor' ? (
                // If user is logged in and is a donor, show donor dashboard
                <DonorDashboard user={user} onLogout={handleLogout} />
              ) : (
                // If not authorized, redirect to home
                <Navigate to="/" replace />
              )
            } 
          />
          {/* Seeker Dashboard Route: Protected route for seeker/recipient users */}
          <Route 
            path="/seeker-dashboard" 
            element={
              user && (user.type === 'seeker' || user.type === 'recipient') ? (
                // If user is logged in and is a seeker or recipient, show seeker dashboard
                <SeekerDashboard user={user} onLogout={handleLogout} />
              ) : (
                // If not authorized, redirect to home
                <Navigate to="/" replace />
              )
            } 
          />
          {/* Admin Dashboard Route: Protected route for admin users only */}
          <Route 
            path="/admin-dashboard" 
            element={
              user && user.type === 'admin' ? (
                // If user is logged in and is an admin, show admin dashboard
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                // If not authorized, redirect to home
                <Navigate to="/" replace />
              )
            } 
          />
          {/* Data Analyst Dashboard Route: Protected route for analyst users only */}
          <Route 
            path="/analyst-dashboard" 
            element={
              user && user.type === 'analyst' ? (
                // If user is logged in and is an analyst, show analyst dashboard
                <DataAnalystDashboard user={user} onLogout={handleLogout} />
              ) : (
                // If not authorized, redirect to home
                <Navigate to="/" replace />
              )
            } 
          />
          {/* Catch-all Route: Redirect any undefined routes to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {/* Footer component displayed on all pages */}
      <Footer onGetStarted={handleGetStarted} />
    </div>
  );
}

/**
 * Main App Component
 * Wraps AppContent with Router provider to enable routing functionality
 * This is the root component of the application
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Export App component as default export
export default App;
