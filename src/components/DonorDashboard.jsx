import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './DonorEnhancements.css';
import NotificationBell from './NotificationBell.jsx';
import MessageCenter from './MessageCenter.jsx';
import StatCard from './StatCard.jsx';
import { getDefaultDonations, getDefaultDonorNotifications, getDefaultDonorMessages } from '../utils/defaultData.js';

const DonorDashboard = ({ user, onLogout }) => {
  const [donations, setDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalWeight: 0,
    peopleHelped: 0,
    co2Saved: 0,
    wasteReduced: 0,
    impactScore: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [wasteTracking, setWasteTracking] = useState({
    monthlyWaste: 0,
    wasteReduction: 0,
    trends: []
  });
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    location: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  // Load donations from localStorage or use defaults
  useEffect(() => {
    const userKey = user.email || user.id;
    const storedDonations = localStorage.getItem(`donations_${userKey}`);
    if (storedDonations) {
      try {
        const parsed = JSON.parse(storedDonations);
        setDonations(parsed);
        calculateStats(parsed);
      } catch (error) {
        console.error('Error loading donations:', error);
      }
    } else {
      // Load default donations on first visit
      const defaultDonations = getDefaultDonations(userKey);
      setDonations(defaultDonations);
      calculateStats(defaultDonations);
      localStorage.setItem(`donations_${userKey}`, JSON.stringify(defaultDonations));
    }

    // Load notifications
    const storedNotifications = localStorage.getItem(`notifications_${userKey}`);
    if (storedNotifications) {
      try {
        setNotifications(JSON.parse(storedNotifications));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    } else {
      const defaultNotifications = getDefaultDonorNotifications();
      setNotifications(defaultNotifications);
      localStorage.setItem(`notifications_${userKey}`, JSON.stringify(defaultNotifications));
    }

    // Load messages
    const storedMessages = localStorage.getItem(`messages_${userKey}`);
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    } else {
      const defaultMessages = getDefaultDonorMessages();
      setMessages(defaultMessages);
      localStorage.setItem(`messages_${userKey}`, JSON.stringify(defaultMessages));
    }
  }, [user.email, user.id]);

  const calculateStats = (donationsList) => {
    const totalWeight = donationsList.reduce((sum, d) => {
      const weight = d.unit === 'kg' ? parseFloat(d.quantity) : parseFloat(d.quantity) / 1000;
      return sum + weight;
    }, 0);

    const wasteReduced = totalWeight * 0.85; // Assume 85% of donations prevent waste
    const impactScore = Math.min(100, (totalWeight / 100) * 100); // Scale impact score

    setStats({
      totalDonations: donationsList.length,
      totalWeight: totalWeight.toFixed(1),
      peopleHelped: Math.floor(totalWeight * 4), // Estimate: 1kg feeds 4 people
      co2Saved: (totalWeight * 2.5).toFixed(1), // Estimate: 1kg food = 2.5kg CO2
      wasteReduced: wasteReduced.toFixed(1),
      impactScore: impactScore.toFixed(0)
    });

    // Update waste tracking trends
    setWasteTracking(prev => ({
      ...prev,
      monthlyWaste: totalWeight.toFixed(1),
      wasteReduction: ((wasteReduced / (totalWeight + wasteReduced)) * 100).toFixed(1)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.foodType.trim()) {
      newErrors.foodType = 'Food type is required';
    }

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (expiryDate < today) {
        newErrors.expiryDate = 'Expiry date cannot be in the past';
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newDonation = {
      id: Date.now(),
      ...formData,
      status: 'available',
      createdAt: new Date().toISOString(),
      donorName: user.name
    };

    const updatedDonations = [newDonation, ...donations];
    setDonations(updatedDonations);
    const userKey = user.email || user.id;
    localStorage.setItem(`donations_${userKey}`, JSON.stringify(updatedDonations));
    calculateStats(updatedDonations);

    // Reset form
    setFormData({
      foodType: '',
      quantity: '',
      unit: 'kg',
      expiryDate: '',
      location: '',
      description: ''
    });
    setShowModal(false);
  };

  const deleteDonation = (id) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      const updatedDonations = donations.filter(d => d.id !== id);
      setDonations(updatedDonations);
      const userKey = user.email || user.id;
      localStorage.setItem(`donations_${userKey}`, JSON.stringify(updatedDonations));
      calculateStats(updatedDonations);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      available: 'badge-success',
      claimed: 'badge-warning',
      completed: 'badge-info'
    };
    return badges[status] || 'badge-success';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleMarkNotificationAsRead = (id) => {
    const updatedNotifications = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    const userKey = user.email || user.id;
    localStorage.setItem(`notifications_${userKey}`, JSON.stringify(updatedNotifications));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    const userKey = user.email || user.id;
    localStorage.setItem(`notifications_${userKey}`, JSON.stringify([]));
  };

  const handleMarkMessageAsRead = (id) => {
    const updatedMessages = messages.map(m =>
      m.id === id ? { ...m, read: true } : m
    );
    setMessages(updatedMessages);
    const userKey = user.email || user.id;
    localStorage.setItem(`messages_${userKey}`, JSON.stringify(updatedMessages));
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter(m => m.id !== id);
    setMessages(updatedMessages);
    const userKey = user.email || user.id;
    localStorage.setItem(`messages_${userKey}`, JSON.stringify(updatedMessages));
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <span className="logo-icon">🌱</span>
            <div>
              <h1 className="dashboard-title">Donor Dashboard</h1>
              <p className="dashboard-subtitle">Welcome back, {user.name}!</p>
            </div>
          </div>
          <div className="header-actions">
            <NotificationBell
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationAsRead}
              onClearAll={handleClearAllNotifications}
            />
            <MessageCenter
              messages={messages}
              onMarkAsRead={handleMarkMessageAsRead}
              onDeleteMessage={handleDeleteMessage}
            />
            <button onClick={onLogout} className="btn btn-outline logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main container">
        {/* Navigation Tabs */}
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={activeTab === 'donations' ? 'active' : ''}
            onClick={() => setActiveTab('donations')}
          >
            📦 My Donations
          </button>
          <button 
            className={activeTab === 'impact' ? 'active' : ''}
            onClick={() => setActiveTab('impact')}
          >
            🌱 Impact Tracking
          </button>
          <button 
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages
          </button>
        </nav>

        {activeTab === 'dashboard' && (
          <>
            {/* Enhanced Stats Section */}
            <section className="stats-section">
              <StatCard
                icon="📦"
                value={stats.totalDonations}
                label="Total Donations"
                trend="+12% this month"
              />
              <StatCard
                icon="⚖️"
                value={`${stats.totalWeight} kg`}
                label="Food Donated"
                trend="+8.5% this month"
              />
              <StatCard
                icon="👥"
                value={stats.peopleHelped}
                label="People Helped"
                trend="+15% this month"
              />
              <StatCard
                icon="🌱"
                value={`${stats.co2Saved} kg`}
                label="CO₂ Saved"
                trend="+10% this month"
              />
              <StatCard
                icon="♻️"
                value={`${stats.wasteReduced} kg`}
                label="Waste Reduced"
                trend="+18% this month"
              />
              <StatCard
                icon="⭐"
                value={`${stats.impactScore}/100`}
                label="Impact Score"
                trend="+5 points this month"
              />
            </section>

            {/* Impact Insights */}
            <section className="impact-insights">
              <div className="insights-card">
                <h3>🎯 Your Impact This Month</h3>
                <div className="insights-grid">
                  <div className="insight-item">
                    <span className="insight-value">{wasteTracking.wasteReduction}%</span>
                    <span className="insight-label">Waste Reduction Rate</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-value">{Math.floor(stats.totalWeight / 4)}</span>
                    <span className="insight-label">Families Fed</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-value">{(stats.co2Saved / 1000 * 3500).toFixed(0)}</span>
                    <span className="insight-label">Km Driven Offset</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'donations' && (
          <>
            {/* Quick Actions */}
            <section className="quick-actions">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary add-donation-btn"
              >
                <span>+</span> Add New Donation
              </button>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
              <StatCard
                icon="📦"
            value={`${stats.totalWeight} kg`}
            label="Food Donated"
          />
          <StatCard
            icon="👥"
            value={stats.peopleHelped}
            label="People Helped"
          />
          <StatCard
            icon="🌍"
            value={`${stats.co2Saved} kg`}
            label="CO₂ Saved"
          />
        </section>

        {/* Actions Section */}
        <section className="actions-section">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary add-donation-btn"
          >
            + Add New Donation
          </button>
        </section>

        {/* Donations List */}
        <section className="donations-section">
          <h2 className="section-title">Your Donations</h2>
          
          {donations.length === 0 ? (
            <div className="empty-state card">
              <span className="empty-icon">📭</span>
              <h3>No donations yet</h3>
              <p>Start making a difference by adding your first food donation!</p>
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary"
              >
                Add Donation
              </button>
            </div>
          ) : (
            <div className="donations-grid">
              {donations.map(donation => (
                <article key={donation.id} className="donation-card card">
                  <div className="donation-header">
                    <h3 className="donation-title">{donation.foodType}</h3>
                    <span className={`badge ${getStatusBadge(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>
                  
                  <div className="donation-details">
                    <div className="detail-row">
                      <span className="detail-icon">📊</span>
                      <span className="detail-text">
                        {donation.quantity} {donation.unit}
                      </span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-icon">📅</span>
                      <span className="detail-text">
                        Expires: {formatDate(donation.expiryDate)}
                      </span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{donation.location}</span>
                    </div>
                    
                    {donation.description && (
                      <div className="detail-row">
                        <span className="detail-icon">📝</span>
                        <span className="detail-text">{donation.description}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="donation-footer">
                    <small className="donation-date">
                      Added on {formatDate(donation.createdAt)}
                    </small>
                    <button
                      onClick={() => deleteDonation(donation.id)}
                      className="btn-delete"
                      title="Delete donation"
                    >
                      🗑️
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
          </>
        )}

        {activeTab === 'impact' && (
          <section className="impact-tracking">
            <div className="impact-header">
              <h2>🌱 Environmental Impact Tracking</h2>
              <p>See how your donations are making a difference</p>
            </div>

            <div className="impact-metrics">
              <div className="metric-card">
                <div className="metric-icon">♻️</div>
                <div className="metric-content">
                  <h3>Waste Reduction</h3>
                  <div className="metric-value">{stats.wasteReduced} kg</div>
                  <div className="metric-description">Food waste prevented this month</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">🌍</div>
                <div className="metric-content">
                  <h3>Carbon Footprint</h3>
                  <div className="metric-value">{stats.co2Saved} kg CO₂</div>
                  <div className="metric-description">Emissions saved through donations</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">💧</div>
                <div className="metric-content">
                  <h3>Water Saved</h3>
                  <div className="metric-value">{(stats.totalWeight * 1500).toLocaleString('en-IN')} L</div>
                  <div className="metric-description">Water footprint reduction</div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">🏆</div>
                <div className="metric-content">
                  <h3>Impact Level</h3>
                  <div className="metric-value">{stats.impactScore > 80 ? 'Champion' : stats.impactScore > 50 ? 'Hero' : 'Helper'}</div>
                  <div className="metric-description">Your donor status</div>
                </div>
              </div>
            </div>

            <div className="impact-goals">
              <h3>🎯 Monthly Goals</h3>
              <div className="goals-grid">
                <div className="goal-item">
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div className="progress" style={{width: `${Math.min(100, (stats.totalWeight / 50) * 100)}%`}}></div>
                    </div>
                    <span>{stats.totalWeight}/50 kg</span>
                  </div>
                  <p>Monthly donation target</p>
                </div>
                
                <div className="goal-item">
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div className="progress" style={{width: `${Math.min(100, (stats.totalDonations / 10) * 100)}%`}}></div>
                    </div>
                    <span>{stats.totalDonations}/10 donations</span>
                  </div>
                  <p>Monthly donation frequency</p>
                </div>
              </div>
            </div>

            <div className="impact-tips">
              <h3>💡 Tips to Increase Your Impact</h3>
              <div className="tips-list">
                <div className="tip-item">
                  <span className="tip-icon">🕒</span>
                  <div>
                    <strong>Donate regularly:</strong> Consistent donations help recipients plan better and reduce overall waste.
                  </div>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">📊</span>
                  <div>
                    <strong>Track expiry dates:</strong> Donate items 2-3 days before expiry for maximum freshness.
                  </div>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">🤝</span>
                  <div>
                    <strong>Build relationships:</strong> Connect with local food banks for more efficient distribution.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'messages' && (
          <section className="messages-section">
            <MessageCenter
              messages={messages}
              onMarkAsRead={handleMarkMessageAsRead}
              onDeleteMessage={handleDeleteMessage}
              userType="donor"
            />
          </section>
        )}
      </main>

      {/* Add Donation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Donation</h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="foodType" className="form-label">
                  Food Type *
                </label>
                <input
                  type="text"
                  id="foodType"
                  name="foodType"
                  className="form-input"
                  placeholder="e.g., Fresh Vegetables, Roti, Rice, Dal"
                  value={formData.foodType}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
                {errors.foodType && (
                  <span className="form-error">{errors.foodType}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-input"
                    placeholder="0"
                    min="0"
                    step="0.1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.quantity && (
                    <span className="form-error">{errors.quantity}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="unit" className="form-label">
                    Unit *
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    className="form-select"
                    value={formData.unit}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="g">Grams (g)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="expiryDate" className="form-label">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  className="form-input"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
                {errors.expiryDate && (
                  <span className="form-error">{errors.expiryDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Pickup Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-input"
                  placeholder="Enter pickup address"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
                {errors.location && (
                  <span className="form-error">{errors.location}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  placeholder="Additional details about the food..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
