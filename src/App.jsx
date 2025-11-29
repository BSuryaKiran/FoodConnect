import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';
import SeekerDashboard from './components/SeekerDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import DataAnalystDashboard from './components/DataAnalystDashboard.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="app-content">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to={`/${user.type === 'recipient' ? 'seeker' : user.type}-dashboard`} replace />
              ) : (
                <Home onGetStarted={handleGetStarted} />
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to={`/${user.type === 'recipient' ? 'seeker' : user.type}-dashboard`} replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/donor-dashboard" 
            element={
              user && user.type === 'donor' ? (
                <DonorDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/seeker-dashboard" 
            element={
              user && (user.type === 'seeker' || user.type === 'recipient') ? (
                <SeekerDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              user && user.type === 'admin' ? (
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/analyst-dashboard" 
            element={
              user && user.type === 'analyst' ? (
                <DataAnalystDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer onGetStarted={handleGetStarted} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
