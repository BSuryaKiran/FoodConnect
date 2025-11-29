import React, { useState, useEffect } from 'react';
import './RecipientDashboard.css';
import NotificationBell from './NotificationBell.jsx';
import MessageCenter from './MessageCenter.jsx';
import { getDefaultReceivedFood, getDefaultSeekerNotifications, getDefaultSeekerMessages } from '../utils/defaultData.js';

const SeekerDashboard = ({ user, onLogout }) => {
  // State management for recipient organization dashboard
  const [requests, setRequests] = useState([]);
  const [receivedFood, setReceivedFood] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showMessageCenter, setShowMessageCenter] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Request form state
  const [requestForm, setRequestForm] = useState({
    organization: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    foodType: '',
    quantity: '',
    urgency: 'medium',
    beneficiaries: '',
    description: '',
    pickupPreference: 'delivery',
    storageCapacity: ''
  });

  // Load data on component mount
  useEffect(() => {
    const userKey = user.email || user.id;
    const savedRequests = JSON.parse(localStorage.getItem(`seekerRequests_${userKey}`) || '[]');
    const savedFood = getDefaultReceivedFood();
    const savedNotifications = getDefaultSeekerNotifications();
    const savedMessages = getDefaultSeekerMessages();
    
    setRequests(savedRequests);
    setReceivedFood(savedFood);
    setNotifications(savedNotifications);
    setMessages(savedMessages);
  }, [user.email, user.id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit new food request
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    
    const userKey = user.email || user.id;
    const newRequest = {
      id: Date.now(),
      ...requestForm,
      status: 'Pending',
      dateRequested: new Date().toLocaleDateString(),
      matchedDonors: Math.floor(Math.random() * 3) + 1
    };
    
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem(`seekerRequests_${userKey}`, JSON.stringify(updatedRequests));
    
    // Reset form and close modal
    setRequestForm({
      organization: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      foodType: '',
      quantity: '',
      urgency: 'medium',
      beneficiaries: '',
      description: '',
      pickupPreference: 'delivery',
      storageCapacity: ''
    });
    setShowModal(false);
    
    // Add success notification
    const successNotification = {
      id: Date.now(),
      message: `Food request submitted successfully for ${requestForm.quantity} ${requestForm.foodType}`,
      timestamp: new Date().toLocaleString(),
      type: 'success'
    };
    setNotifications(prev => [successNotification, ...prev]);
  };

  // Get status badge class
  const getStatusBadge = (status) => {
    const statusClass = {
      'Pending': 'status-pending',
      'Matched': 'status-matched',
      'In Transit': 'status-transit',
      'Delivered': 'status-delivered',
      'Cancelled': 'status-cancelled'
    };
    return statusClass[status] || 'status-pending';
  };

  // Get urgency badge class
  const getUrgencyBadge = (urgency) => {
    const urgencyClass = {
      'low': 'urgency-low',
      'medium': 'urgency-medium',
      'high': 'urgency-high',
      'critical': 'urgency-critical'
    };
    return urgencyClass[urgency] || 'urgency-medium';
  };

  // View request details
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  // Contact donor
  const handleContactDonor = (request) => {
    const message = {
      id: Date.now(),
      from: 'System',
      subject: `Re: ${request.foodType} Request`,
      message: `Connecting you with matched donors for your ${request.foodType} request (ID: ${request.id}). A donor will contact you shortly at ${request.email}.`,
      timestamp: new Date().toLocaleString(),
      read: false
    };
    setMessages(prev => [message, ...prev]);
    setShowMessageCenter(true);
    
    // Add notification
    const notification = {
      id: Date.now(),
      message: `Donor contact request sent for ${request.foodType}`,
      timestamp: new Date().toLocaleString(),
      type: 'info'
    };
    setNotifications(prev => [notification, ...prev]);
  };

  // Cancel request
  const handleCancelRequest = (requestId) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      const userKey = user.email || user.id;
      const updatedRequests = requests.map(req => 
        req.id === requestId ? { ...req, status: 'Cancelled' } : req
      );
      setRequests(updatedRequests);
      localStorage.setItem(`seekerRequests_${userKey}`, JSON.stringify(updatedRequests));
      
      // Add notification
      const notification = {
        id: Date.now(),
        message: 'Request cancelled successfully',
        timestamp: new Date().toLocaleString(),
        type: 'warning'
      };
      setNotifications(prev => [notification, ...prev]);
      
      // Close details modal if open
      setShowDetailsModal(false);
    }
  };

  // Calculate dashboard statistics
  const stats = {
    totalRequests: requests.length,
    activeRequests: requests.filter(r => ['Pending', 'Matched', 'In Transit'].includes(r.status)).length,
    successfulDeliveries: requests.filter(r => r.status === 'Delivered').length,
    totalBeneficiaries: requests.reduce((sum, req) => sum + parseInt(req.beneficiaries || 0), 0),
    totalFoodReceived: receivedFood.reduce((sum, food) => sum + food.quantity, 0),
    wasteReduced: receivedFood.reduce((sum, food) => sum + (food.quantity * 0.8), 0) // Assuming 80% would have been wasted
  };

  return (
    <div className="recipient-dashboard">
      <div className="recipient-container">
        {/* Enhanced Header */}
        <header className="recipient-header">
          <div className="recipient-header-left">
            <span className="recipient-icon">🏢</span>
            <div>
              <h1 className="recipient-title">Recipient Organization Dashboard</h1>
              <p className="recipient-subtitle">Welcome back, {user?.name || 'Food Recipient'}!</p>
            </div>
          </div>
          <div className="recipient-header-right">
            <NotificationBell 
              notifications={notifications} 
              onNotificationClick={() => {}} 
            />
            <button 
              className="header-btn btn-secondary"
              onClick={() => setShowMessageCenter(true)}
            >
              💬 Messages ({messages.length})
            </button>
            <button className="header-btn btn-primary-gradient" onClick={onLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Modern Tab Navigation */}
        <nav className="recipient-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            📋 Food Requests
          </button>
          <button 
            className={`tab-btn ${activeTab === 'logistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('logistics')}
          >
            🚚 Logistics
          </button>
          <button 
            className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
            onClick={() => setActiveTab('impact')}
          >
            📈 Impact & Reports
          </button>
          <button 
            className={`tab-btn ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => setActiveTab('community')}
          >
            🤝 Community Network
          </button>
        </nav>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Enhanced Statistics Cards */}
            <div className="recipient-stats-grid">
              <div className="stat-card-modern">
                <span className="stat-icon-large">📋</span>
                <div className="stat-value-large">{stats.totalRequests}</div>
                <div className="stat-label">Total Food Requests</div>
                <span className="stat-trend">+{Math.floor(stats.totalRequests * 0.2)} this month</span>
              </div>
              
              <div className="stat-card-modern">
                <span className="stat-icon-large">⏳</span>
                <div className="stat-value-large">{stats.activeRequests}</div>
                <div className="stat-label">Active Requests</div>
                <span className="stat-trend">{Math.floor(stats.activeRequests / 2)} urgent</span>
              </div>
              
              <div className="stat-card-modern">
                <span className="stat-icon-large">✅</span>
                <div className="stat-value-large">{stats.successfulDeliveries}</div>
                <div className="stat-label">Successful Deliveries</div>
                <span className="stat-trend">
                  {stats.totalRequests > 0 ? Math.round((stats.successfulDeliveries / stats.totalRequests) * 100) : 0}% success rate
                </span>
              </div>
              
              <div className="stat-card-modern">
                <span className="stat-icon-large">👥</span>
                <div className="stat-value-large">{stats.totalBeneficiaries.toLocaleString('en-IN')}</div>
                <div className="stat-label">People Served</div>
                <span className="stat-trend">+{Math.floor(stats.totalBeneficiaries * 0.15)} this month</span>
              </div>
            </div>

            {/* Quick Actions Section */}
            <section className="quick-actions-section">
              <h2 className="section-title-modern">🎯 Quick Actions</h2>
              <div className="actions-grid">
                <div className="action-card" onClick={() => setShowModal(true)}>
                  <span className="action-icon">➕</span>
                  <h3>Submit Food Request</h3>
                  <p>Create a new food donation request for your organization</p>
                </div>
                
                <div className="action-card" onClick={() => setActiveTab('requests')}>
                  <span className="action-icon">📋</span>
                  <h3>View All Requests</h3>
                  <p>Track and manage all your food requests</p>
                </div>
                
                <div className="action-card" onClick={() => setShowMessageCenter(true)}>
                  <span className="action-icon">💬</span>
                  <h3>Contact Coordinators</h3>
                  <p>Communicate with donors and platform coordinators</p>
                </div>
                
                <div className="action-card" onClick={() => setActiveTab('logistics')}>
                  <span className="action-icon">🚚</span>
                  <h3>Logistics Management</h3>
                  <p>Manage deliveries, storage, and distribution</p>
                </div>
                
                <div className="action-card" onClick={() => setActiveTab('impact')}>
                  <span className="action-icon">📊</span>
                  <h3>View Impact Report</h3>
                  <p>See your organization's social and environmental impact</p>
                </div>
                
                <div className="action-card" onClick={() => setActiveTab('community')}>
                  <span className="action-icon">🤝</span>
                  <h3>Partner Network</h3>
                  <p>Connect with partner organizations and volunteers</p>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="requests-section">
              <div className="section-header">
                <h2 className="section-title-modern">🕒 Recent Activity</h2>
                <button className="header-btn btn-primary-gradient" onClick={() => setActiveTab('requests')}>
                  View All
                </button>
              </div>
              
              <div className="requests-grid">
                {requests.slice(0, 3).map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>{request.foodType}</h3>
                      <span className={`status-badge ${getStatusBadge(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="request-details">
                      <p><strong>Quantity:</strong> {request.quantity}</p>
                      <p>
                        <strong>Urgency:</strong> 
                        <span className={`urgency-badge ${getUrgencyBadge(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </p>
                      <p><strong>Beneficiaries:</strong> {request.beneficiaries} people</p>
                      <p><strong>Requested:</strong> {request.dateRequested}</p>
                    </div>
                    <div className="request-actions">
                      <button className="btn-action-primary" onClick={() => handleViewDetails(request)}>View Details</button>
                      <button className="btn-action-secondary" onClick={() => handleViewDetails(request)}>Track Status</button>
                    </div>
                  </div>
                ))}
                
                {requests.length === 0 && (
                  <div className="empty-state">
                    <span className="empty-state-icon">📋</span>
                    <h3>No requests yet</h3>
                    <p>Submit your first food request to get started</p>
                    <button className="header-btn btn-primary-gradient" onClick={() => setShowModal(true)}>
                      Submit Request
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Food Requests Tab */}
        {activeTab === 'requests' && (
          <>
            <section className="requests-section">
              <div className="section-header">
                <h2 className="section-title-modern">📋 Food Requests Management</h2>
                <button className="header-btn btn-primary-gradient" onClick={() => setShowModal(true)}>
                  + Submit New Request
                </button>
              </div>

              {/* Filters */}
              <div className="requests-filters">
                <select className="filter-select">
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="matched">Matched</option>
                  <option value="transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
                
                <select className="filter-select">
                  <option value="">All Urgency Levels</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="🔍 Search requests by food type, status..." 
                />
              </div>

              <div className="requests-grid">
                {requests.map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>{request.foodType}</h3>
                      <span className={`status-badge ${getStatusBadge(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="request-details">
                      <p><strong>Quantity:</strong> {request.quantity}</p>
                      <p>
                        <strong>Urgency:</strong> 
                        <span className={`urgency-badge ${getUrgencyBadge(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </p>
                      <p><strong>Beneficiaries:</strong> {request.beneficiaries} people</p>
                      <p><strong>Organization:</strong> {request.organization}</p>
                      <p><strong>Requested:</strong> {request.dateRequested}</p>
                      <p><strong>Matched Donors:</strong> {request.matchedDonors}</p>
                      {request.description && (
                        <p><strong>Details:</strong> {request.description}</p>
                      )}
                    </div>
                    <div className="request-actions">
                      <button className="btn-action-primary" onClick={() => handleViewDetails(request)}>View Details</button>
                      <button className="btn-action-secondary" onClick={() => handleContactDonor(request)}>Contact Donor</button>
                      {request.status === 'Pending' && (
                        <button className="btn-danger" onClick={() => handleCancelRequest(request.id)}>Cancel</button>
                      )}
                    </div>
                  </div>
                ))}
                
                {requests.length === 0 && (
                  <div className="empty-state">
                    <span className="empty-state-icon">📋</span>
                    <h3>No food requests found</h3>
                    <p>Start by submitting your first food request</p>
                    <button className="header-btn btn-primary-gradient" onClick={() => setShowModal(true)}>
                      Submit Your First Request
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Logistics Tab */}
        {activeTab === 'logistics' && (
          <>
            {/* Logistics Overview */}
            <section className="logistics-overview">
              <h2 className="section-title-modern">🚚 Logistics & Distribution</h2>
              
              <div className="logistics-stats">
                <div className="logistics-stat-card">
                  <h3>Active Deliveries</h3>
                  <span className="stat-number">{stats.activeRequests}</span>
                  <p className="stat-label">Currently in transit</p>
                </div>
                
                <div className="logistics-stat-card">
                  <h3>Storage Capacity</h3>
                  <span className="stat-number">75%</span>
                  <p className="stat-label">340 kg available</p>
                </div>
                
                <div className="logistics-stat-card">
                  <h3>Distribution Points</h3>
                  <span className="stat-number">8</span>
                  <p className="stat-label">Active locations</p>
                </div>
                
                <div className="logistics-stat-card">
                  <h3>Avg. Delivery Time</h3>
                  <span className="stat-number">24h</span>
                  <p className="stat-label">From request to delivery</p>
                </div>
              </div>
            </section>

            {/* Delivery Tracking */}
            <section className="delivery-tracking">
              <h3>📦 Delivery Tracking</h3>
              <div className="delivery-list">
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Fresh Produce - 45 kg</h4>
                    <p>From: Community Farm Co-op</p>
                    <p>ETA: 2 hours</p>
                  </div>
                  <div className="delivery-status">
                    <div className="progress-bar">
                      <div className="progress" style={{width: '75%'}}></div>
                    </div>
                    <p>In Transit - 75% Complete</p>
                  </div>
                </div>
                
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Prepared Meals - 200 servings</h4>
                    <p>From: Restaurant Partners Inc.</p>
                    <p>ETA: 4 hours</p>
                  </div>
                  <div className="delivery-status">
                    <div className="progress-bar">
                      <div className="progress" style={{width: '40%'}}></div>
                    </div>
                    <p>Picked Up - 40% Complete</p>
                  </div>
                </div>
                
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Pantry Items - 23 kg</h4>
                    <p>From: Grocery Store Network</p>
                    <p>ETA: Tomorrow</p>
                  </div>
                  <div className="delivery-status">
                    <div className="progress-bar">
                      <div className="progress" style={{width: '10%'}}></div>
                    </div>
                    <p>Processing - 10% Complete</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Storage Management */}
            <section className="storage-management">
              <h3>📦 Storage Management</h3>
              <div className="storage-grid">
                <div className="storage-section">
                  <h4>Cold Storage</h4>
                  <div className="capacity-bar">
                    <div className="capacity-fill" style={{width: '60%'}}></div>
                  </div>
                  <p>270 kg / 450 kg capacity (60% used)</p>
                  <p><strong>Temperature:</strong> 3°C - Optimal</p>
                </div>
                
                <div className="storage-section">
                  <h4>Dry Storage</h4>
                  <div className="capacity-bar">
                    <div className="capacity-fill" style={{width: '45%'}}></div>
                  </div>
                  <p>200 kg / 450 kg capacity (45% used)</p>
                  <p><strong>Status:</strong> Well-stocked</p>
                </div>
                
                <div className="storage-section">
                  <h4>Freezer Storage</h4>
                  <div className="capacity-bar">
                    <div className="capacity-fill" style={{width: '30%'}}></div>
                  </div>
                  <p>135 kg / 450 kg capacity (30% used)</p>
                  <p><strong>Temperature:</strong> -18°C - Optimal</p>
                </div>
              </div>
            </section>

            {/* Distribution Network */}
            <section className="distribution-network">
              <h3>🗺️ Distribution Network</h3>
              <div className="delivery-list">
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Main Distribution Center</h4>
                    <p>123 Community Street, City</p>
                    <p>Operating Hours: 8 AM - 6 PM</p>
                  </div>
                  <div className="delivery-status">
                    <span className="status-badge status-delivered">Active</span>
                  </div>
                </div>
                
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Mobile Distribution Unit #1</h4>
                    <p>Downtown Area</p>
                    <p>Schedule: Mon, Wed, Fri 10 AM - 2 PM</p>
                  </div>
                  <div className="delivery-status">
                    <span className="status-badge status-delivered">Active</span>
                  </div>
                </div>
                
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Partner Location - Community Center</h4>
                    <p>456 Hope Avenue, City</p>
                    <p>Daily Service 12 PM - 4 PM</p>
                  </div>
                  <div className="delivery-status">
                    <span className="status-badge status-delivered">Active</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Impact & Reports Tab */}
        {activeTab === 'impact' && (
          <>
            <section className="impact-overview">
              <h2 className="section-title-modern">📈 Impact & Reports</h2>
              
              {/* Environmental Impact */}
              <div className="impact-metrics">
                <div className="metric-card environmental">
                  <span className="metric-icon">🌱</span>
                  <div className="metric-info">
                    <h3>Food Waste Prevented</h3>
                    <div className="metric-value">{Math.round(stats.wasteReduced).toLocaleString('en-IN')} kg</div>
                    <p className="metric-label">Total waste diverted from landfills</p>
                    <p className="metric-detail">Equivalent to {Math.round(stats.wasteReduced * 0.5)} kg CO₂ emissions prevented</p>
                  </div>
                </div>
                
                <div className="metric-card social">
                  <span className="metric-icon">❤️</span>
                  <div className="metric-info">
                    <h3>Community Impact</h3>
                    <div className="metric-value">{stats.totalBeneficiaries.toLocaleString('en-IN')}</div>
                    <p className="metric-label">People served through our programs</p>
                    <p className="metric-detail">Providing approximately {stats.totalBeneficiaries * 2.5} meals</p>
                  </div>
                </div>
                
                <div className="metric-card economic">
                  <span className="metric-icon">💰</span>
                  <div className="metric-info">
                    <h3>Economic Value</h3>
                    <div className="metric-value">₹{(stats.totalFoodReceived * 250).toLocaleString('en-IN')}</div>
                    <p className="metric-label">Estimated value of food received</p>
                    <p className="metric-detail">Saving families an average of ₹10,000/month</p>
                  </div>
                </div>
              </div>

              {/* Monthly Progress */}
              <div className="impact-metrics">
                <div className="metric-card">
                  <span className="metric-icon">📊</span>
                  <div className="metric-info">
                    <h3>Monthly Growth</h3>
                    <div className="metric-value">+28%</div>
                    <p className="metric-label">Increase in food distribution</p>
                    <p className="metric-detail">Compared to last month</p>
                  </div>
                </div>
                
                <div className="metric-card">
                  <span className="metric-icon">⭐</span>
                  <div className="metric-info">
                    <h3>Partner Rating</h3>
                    <div className="metric-value">4.8/5.0</div>
                    <p className="metric-label">Average satisfaction rating</p>
                    <p className="metric-detail">Based on {Math.floor(stats.successfulDeliveries * 1.5)} reviews</p>
                  </div>
                </div>
                
                <div className="metric-card">
                  <span className="metric-icon">🎯</span>
                  <div className="metric-info">
                    <h3>Efficiency Rate</h3>
                    <div className="metric-value">92%</div>
                    <p className="metric-label">On-time delivery rate</p>
                    <p className="metric-detail">{stats.successfulDeliveries} successful deliveries</p>
                  </div>
                </div>
              </div>

              {/* Annual Summary */}
              <div className="requests-section">
                <h3 className="section-title-modern">📅 Annual Summary</h3>
                <div className="metric-card">
                  <div className="metric-info">
                    <h3>This Year's Achievements</h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '1.5rem'}}>
                      <div>
                        <div className="metric-value">{(stats.totalFoodReceived * 12).toLocaleString('en-IN')} kg</div>
                        <p className="metric-label">Total Food Received</p>
                      </div>
                      <div>
                        <div className="metric-value">{(stats.totalBeneficiaries * 8).toLocaleString('en-IN')}</div>
                        <p className="metric-label">Annual Beneficiaries</p>
                      </div>
                      <div>
                        <div className="metric-value">{Math.round(stats.totalRequests * 11)}</div>
                        <p className="metric-label">Requests Fulfilled</p>
                      </div>
                      <div>
                        <div className="metric-value">{Math.round(stats.wasteReduced * 10)} kg</div>
                        <p className="metric-label">Waste Prevented</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Community Network Tab */}
        {activeTab === 'community' && (
          <>
            <section className="community-overview">
              <h2 className="section-title-modern">🤝 Community Network</h2>
              
              <div className="network-stats-grid">
                <div className="network-stat-card">
                  <h3>Partner Organizations</h3>
                  <span className="stat-number">24</span>
                  <p className="stat-detail">Active partnerships</p>
                </div>
                
                <div className="network-stat-card">
                  <h3>Food Donors</h3>
                  <span className="stat-number">18</span>
                  <p className="stat-detail">Regular contributors</p>
                </div>
                
                <div className="network-stat-card">
                  <h3>Volunteers</h3>
                  <span className="stat-number">156</span>
                  <p className="stat-detail">Active volunteers</p>
                </div>
                
                <div className="network-stat-card">
                  <h3>Community Events</h3>
                  <span className="stat-number">12</span>
                  <p className="stat-detail">This quarter</p>
                </div>
              </div>
            </section>

            {/* Partner Organizations */}
            <section className="partner-organizations">
              <h3 className="section-title-modern">🏢 Partner Organizations</h3>
              <div className="partners-grid">
                <div className="partner-card">
                  <div className="partner-header">
                    <h4>Community Farm Co-op</h4>
                    <span className="partner-status active">Active</span>
                  </div>
                  <p>Fresh produce supplier</p>
                  <p><strong>Donations:</strong> 45 this month</p>
                  <p><strong>Contact:</strong> farm@community.org</p>
                  <div className="partner-actions">
                    <button>View Profile</button>
                    <button>Send Message</button>
                  </div>
                </div>
                
                <div className="partner-card">
                  <div className="partner-header">
                    <h4>Restaurant Partners Inc.</h4>
                    <span className="partner-status active">Active</span>
                  </div>
                  <p>Prepared meals provider</p>
                  <p><strong>Donations:</strong> 38 this month</p>
                  <p><strong>Contact:</strong> contact@restaurant.com</p>
                  <div className="partner-actions">
                    <button>View Profile</button>
                    <button>Send Message</button>
                  </div>
                </div>
                
                <div className="partner-card">
                  <div className="partner-header">
                    <h4>Grocery Store Network</h4>
                    <span className="partner-status active">Active</span>
                  </div>
                  <p>Pantry items distributor</p>
                  <p><strong>Donations:</strong> 52 this month</p>
                  <p><strong>Contact:</strong> network@grocery.com</p>
                  <div className="partner-actions">
                    <button>View Profile</button>
                    <button>Send Message</button>
                  </div>
                </div>
                
                <div className="partner-card">
                  <div className="partner-header">
                    <h4>Local Bakery Alliance</h4>
                    <span className="partner-status active">Active</span>
                  </div>
                  <p>Baked goods supplier</p>
                  <p><strong>Donations:</strong> 28 this month</p>
                  <p><strong>Contact:</strong> info@bakery.com</p>
                  <div className="partner-actions">
                    <button>View Profile</button>
                    <button>Send Message</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Volunteer Management */}
            <section className="volunteer-management">
              <h3 className="section-title-modern">👥 Volunteer Management</h3>
              <div className="delivery-list">
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Food Distribution Team</h4>
                    <p>45 active volunteers</p>
                    <p>Next shift: Today 2:00 PM - 6:00 PM</p>
                  </div>
                  <div className="delivery-status">
                    <button className="header-btn btn-primary-gradient">Manage Team</button>
                  </div>
                </div>
                
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Logistics Coordinators</h4>
                    <p>12 active volunteers</p>
                    <p>Next shift: Tomorrow 8:00 AM - 12:00 PM</p>
                  </div>
                  <div className="delivery-status">
                    <button className="header-btn btn-primary-gradient">Manage Team</button>
                  </div>
                </div>
                
                <div className="delivery-item">
                  <div className="delivery-info">
                    <h4>Community Outreach</h4>
                    <p>23 active volunteers</p>
                    <p>Weekly meetings: Wednesdays 5:00 PM</p>
                  </div>
                  <div className="delivery-status">
                    <button className="header-btn btn-primary-gradient">Manage Team</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Community Events */}
            <section className="community-events">
              <h3 className="section-title-modern">📅 Community Events</h3>
              <div className="partners-grid">
                <div className="partner-card">
                  <div className="partner-header">
                    <h4>Monthly Food Drive</h4>
                    <span className="partner-status active">Upcoming</span>
                  </div>
                  <p><strong>Date:</strong> Next Saturday</p>
                  <p><strong>Location:</strong> Community Center</p>
                  <p><strong>Volunteers Needed:</strong> 25</p>
                  <div className="partner-actions">
                    <button>View Details</button>
                    <button>Register</button>
                  </div>
                </div>
                
                <div className="partner-card">
                  <div className="partner-header">
                    <h4>Partner Appreciation Day</h4>
                    <span className="partner-status pending">Planning</span>
                  </div>
                  <p><strong>Date:</strong> Next Month</p>
                  <p><strong>Expected Attendance:</strong> 150</p>
                  <p><strong>Status:</strong> In Planning</p>
                  <div className="partner-actions">
                    <button>View Details</button>
                    <button>Help Plan</button>
                  </div>
                </div>
                
                <div className="partner-card">
                  <div className="partner-header">
                    <h4>Volunteer Training</h4>
                    <span className="partner-status active">Ongoing</span>
                  </div>
                  <p><strong>Next Session:</strong> This Friday</p>
                  <p><strong>Duration:</strong> 2 hours</p>
                  <p><strong>Spots Available:</strong> 12</p>
                  <div className="partner-actions">
                    <button>View Details</button>
                    <button>Sign Up</button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      {/* Create Request Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Food Request</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmitRequest} className="request-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Organization Name *</label>
                  <input
                    type="text"
                    name="organization"
                    value={requestForm.organization}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={requestForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={requestForm.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div className="form-group">
                  <label>Delivery Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={requestForm.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Food Type Needed *</label>
                  <select
                    name="foodType"
                    value={requestForm.foodType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select food type...</option>
                    <option value="Fresh Produce">🥗 Fresh Produce</option>
                    <option value="Prepared Meals">🍽️ Prepared Meals</option>
                    <option value="Pantry Items">🥫 Pantry Items</option>
                    <option value="Dairy Products">🥛 Dairy Products</option>
                    <option value="Baked Goods">🍞 Baked Goods</option>
                    <option value="Frozen Foods">🧊 Frozen Foods</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Quantity Needed *</label>
                  <input
                    type="text"
                    name="quantity"
                    value={requestForm.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g., 50 kg, 100 servings"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Urgency Level *</label>
                  <select
                    name="urgency"
                    value={requestForm.urgency}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="low">Low - Can wait 1-2 weeks</option>
                    <option value="medium">Medium - Needed within week</option>
                    <option value="high">High - Needed within 2-3 days</option>
                    <option value="critical">Critical - Needed immediately</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Number of Beneficiaries *</label>
                  <input
                    type="number"
                    name="beneficiaries"
                    value={requestForm.beneficiaries}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="How many people will this serve?"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Pickup Preference</label>
                  <select
                    name="pickupPreference"
                    value={requestForm.pickupPreference}
                    onChange={handleInputChange}
                  >
                    <option value="delivery">Delivery Preferred</option>
                    <option value="pickup">Can Pickup</option>
                    <option value="either">Either Works</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Storage Capacity (kg)</label>
                  <input
                    type="number"
                    name="storageCapacity"
                    value={requestForm.storageCapacity}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Available storage space in kg"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Additional Details</label>
                  <textarea
                    name="description"
                    value={requestForm.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Any special requirements, dietary restrictions, or additional information that would help match with donors..."
                  ></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="header-btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="header-btn btn-primary-gradient">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Center */}
      {showMessageCenter && (
        <MessageCenter 
          messages={messages}
          onClose={() => setShowMessageCenter(false)}
        />
      )}

      {/* Request Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Request Details</h2>
              <button className="modal-close" onClick={() => setShowDetailsModal(false)}>×</button>
            </div>
            
            <div className="request-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Request ID</label>
                  <input type="text" value={selectedRequest.id} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <span className={`status-badge ${getStatusBadge(selectedRequest.status)}`} style={{display: 'inline-block', padding: '0.5rem 1rem', marginTop: '0.5rem'}}>
                    {selectedRequest.status}
                  </span>
                </div>
                
                <div className="form-group">
                  <label>Organization Name</label>
                  <input type="text" value={selectedRequest.organization} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Contact Email</label>
                  <input type="text" value={selectedRequest.email} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" value={selectedRequest.phone || 'Not provided'} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" value={selectedRequest.address || 'Not provided'} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Food Type</label>
                  <input type="text" value={selectedRequest.foodType} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="text" value={selectedRequest.quantity} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Urgency Level</label>
                  <span className={`urgency-badge ${getUrgencyBadge(selectedRequest.urgency)}`} style={{display: 'inline-block', padding: '0.5rem 1rem', marginTop: '0.5rem', textTransform: 'capitalize'}}>
                    {selectedRequest.urgency}
                  </span>
                </div>
                
                <div className="form-group">
                  <label>Beneficiaries</label>
                  <input type="text" value={`${selectedRequest.beneficiaries} people`} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Pickup Preference</label>
                  <input type="text" value={selectedRequest.pickupPreference || 'Not specified'} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Storage Capacity</label>
                  <input type="text" value={selectedRequest.storageCapacity ? `${selectedRequest.storageCapacity} lbs` : 'Not specified'} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Date Requested</label>
                  <input type="text" value={selectedRequest.dateRequested} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Matched Donors</label>
                  <input type="text" value={selectedRequest.matchedDonors} readOnly />
                </div>
                
                {selectedRequest.description && (
                  <div className="form-group full-width">
                    <label>Additional Details</label>
                    <textarea value={selectedRequest.description} readOnly rows="4"></textarea>
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                {selectedRequest.status === 'Pending' && (
                  <>
                    <button className="header-btn btn-danger" onClick={() => handleCancelRequest(selectedRequest.id)}>
                      Cancel Request
                    </button>
                    <button className="header-btn btn-secondary" onClick={() => {
                      setShowDetailsModal(false);
                      handleContactDonor(selectedRequest);
                    }}>
                      Contact Donor
                    </button>
                  </>
                )}
                {selectedRequest.status !== 'Pending' && (
                  <button className="header-btn btn-secondary" onClick={() => {
                    setShowDetailsModal(false);
                    handleContactDonor(selectedRequest);
                  }}>
                    Contact Donor
                  </button>
                )}
                <button className="header-btn btn-primary-gradient" onClick={() => setShowDetailsModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;