import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './DonorEnhancements.css';
import NotificationBell from './NotificationBell.jsx';
import MessageCenter from './MessageCenter.jsx';
import StatCard from './StatCard.jsx';
import { getDefaultReceivedFood, getDefaultSeekerNotifications, getDefaultSeekerMessages } from '../utils/defaultData.js';

const SeekerDashboard = ({ user, onLogout }) => {
  const [requests, setRequests] = useState([]);
  const [availableDonations, setAvailableDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalRequests: 0,
    totalReceived: 0,
    peopleServed: 0,
    activeRequests: 0,
    monthlyDistribution: 0,
    organizationImpact: 0
  });
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    unit: 'kg',
    urgency: 'medium',
    location: '',
    purpose: ''
  });
  const [errors, setErrors] = useState({});

  // Load requests from localStorage or use defaults
  useEffect(() => {
    const storedRequests = localStorage.getItem(`requests_${user.id}`);
    if (storedRequests) {
      try {
        const parsed = JSON.parse(storedRequests);
        setRequests(parsed);
        calculateStats(parsed);
      } catch (error) {
        console.error('Error loading requests:', error);
      }
    } else {
      const defaultRequests = getDefaultReceivedFood(user.id);
      setRequests(defaultRequests);
      calculateStats(defaultRequests);
      localStorage.setItem(`requests_${user.id}`, JSON.stringify(defaultRequests));
    }

    const storedNotifications = localStorage.getItem(`notifications_${user.id}`);
    if (storedNotifications) {
      try {
        setNotifications(JSON.parse(storedNotifications));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    } else {
      const defaultNotifications = getDefaultSeekerNotifications();
      setNotifications(defaultNotifications);
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(defaultNotifications));
    }

    const storedMessages = localStorage.getItem(`messages_${user.id}`);
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    } else {
      const defaultMessages = getDefaultSeekerMessages();
      setMessages(defaultMessages);
      localStorage.setItem(`messages_${user.id}`, JSON.stringify(defaultMessages));
    }

    loadAvailableDonations();
  }, [user.id]);

  const loadAvailableDonations = () => {
    const mockDonations = [
      {
        id: 1,
        foodType: 'Fresh Vegetables',
        quantity: '10',
        unit: 'kg',
        expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Downtown Market',
        donorName: 'Green Grocery Store'
      },
      {
        id: 2,
        foodType: 'Bread & Bakery Items',
        quantity: '5',
        unit: 'kg',
        expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'City Bakery',
        donorName: 'Fresh Bakes'
      }
    ];
    setAvailableDonations(mockDonations);
  };

  const calculateStats = (requestsList) => {
    const totalWeight = requestsList.reduce((sum, r) => {
      const weight = r.unit === 'kg' ? parseFloat(r.quantity) : parseFloat(r.quantity) / 1000;
      return sum + weight;
    }, 0);

    setStats({
      totalRequests: requestsList.length,
      totalReceived: requestsList.filter(r => r.status === 'completed').length,
      peopleServed: Math.floor(totalWeight * 3),
      activeRequests: requestsList.filter(r => r.status === 'pending' || r.status === 'approved').length,
      monthlyDistribution: totalWeight.toFixed(1),
      organizationImpact: Math.min(100, (totalWeight / 50) * 100).toFixed(0)
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'badge-warning',
      approved: 'badge-success',
      completed: 'badge-info',
      rejected: 'badge-error'
    };
    return statusMap[status] || 'badge-default';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <span className="logo-icon">🌱</span>
            <div>
              <h1 className="dashboard-title">
                {user.type === 'recipient' ? 'Recipient Organization Dashboard' : 'Seeker Dashboard'}
              </h1>
              <p className="dashboard-subtitle">Welcome back, {user.name}!</p>
            </div>
          </div>
          <div className="header-actions">
            <NotificationBell
              notifications={notifications}
            />
            <MessageCenter
              messages={messages}
            />
            <button onClick={onLogout} className="btn btn-outline logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main container">
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={activeTab === 'requests' ? 'active' : ''}
            onClick={() => setActiveTab('requests')}
          >
            📋 {user.type === 'recipient' ? 'Food Requests' : 'My Requests'}
          </button>
          <button 
            className={activeTab === 'available' ? 'active' : ''}
            onClick={() => setActiveTab('available')}
          >
            🍎 Available Food
          </button>
          <button 
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages
          </button>
        </nav>

        {activeTab === 'dashboard' && (
          <div>
            <section className="stats-section">
              <StatCard
                icon="📋"
                value={stats.totalRequests}
                label={user.type === 'recipient' ? 'Food Requests' : 'Total Requests'}
              />
              <StatCard
                icon="📦"
                value={stats.totalReceived}
                label="Items Received"
              />
              <StatCard
                icon="👥"
                value={stats.peopleServed}
                label={user.type === 'recipient' ? 'People Served' : 'People Helped'}
              />
              <StatCard
                icon="⚡"
                value={stats.activeRequests}
                label="Active Requests"
              />
            </section>
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            <section className="quick-actions">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary add-request-btn"
              >
                + {user.type === 'recipient' ? 'Create Food Request' : 'Add New Request'}
              </button>
            </section>

            <section className="requests-section">
              <h2 className="section-title">Your Requests</h2>
              {requests.length === 0 ? (
                <div className="empty-state card">
                  <span className="empty-icon">📭</span>
                  <h3>No requests yet</h3>
                  <p>Create your first food request to get started!</p>
                </div>
              ) : (
                <div className="donations-grid">
                  {requests.map(request => (
                    <article key={request.id} className="donation-card card">
                      <div className="donation-header">
                        <h3 className="donation-title">{request.foodType}</h3>
                        <span className={`badge ${getStatusBadge(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="donation-details">
                        <div className="detail-row">
                          <span className="detail-icon">📊</span>
                          <span className="detail-text">
                            {request.quantity} {request.unit}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-icon">📍</span>
                          <span className="detail-text">{request.location}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-icon">📝</span>
                          <span className="detail-text">{request.purpose}</span>
                        </div>
                      </div>
                      
                      <div className="donation-footer">
                        <small className="donation-date">
                          Created on {formatDate(request.createdAt)}
                        </small>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'available' && (
          <div>
            <section className="donations-section">
              <h2 className="section-title">Available Donations</h2>
              <div className="donations-grid">
                {availableDonations.map(donation => (
                  <article key={donation.id} className="donation-card card">
                    <div className="donation-header">
                      <h3 className="donation-title">{donation.foodType}</h3>
                      <span className="badge badge-success">Available</span>
                    </div>
                    
                    <div className="donation-details">
                      <div className="detail-row">
                        <span className="detail-icon">👤</span>
                        <span className="detail-text">{donation.donorName}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-icon">📊</span>
                        <span className="detail-text">
                          {donation.quantity} {donation.unit}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{donation.location}</span>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary btn-claim">
                      Claim Donation
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <section className="messages-section">
              <MessageCenter
                messages={messages}
                userType={user.type === 'recipient' ? 'recipient' : 'seeker'}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default SeekerDashboard;