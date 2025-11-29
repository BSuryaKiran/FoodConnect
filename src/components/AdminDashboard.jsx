import React, { useState, useEffect } from 'react';
import StatCard from './StatCard.jsx';
import MessageCenter from './MessageCenter.jsx';
import NotificationBell from './NotificationBell.jsx';
import './Dashboard.css';
import './AdminDashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New user approval pending',
      timestamp: new Date().toLocaleString(),
      type: 'info',
      read: false
    },
    {
      id: 2,
      message: 'System backup completed successfully',
      timestamp: new Date().toLocaleString(),
      type: 'success',
      read: false
    }
  ]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'System',
      subject: 'Platform Update',
      message: 'New features have been added to the platform.',
      timestamp: new Date().toLocaleString(),
      read: false
    },
    {
      id: 2,
      from: 'Support Team',
      subject: 'User Feedback',
      message: 'Multiple users have requested additional filtering options.',
      timestamp: new Date().toLocaleString(),
      read: false
    }
  ]);
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 1247,
    activeDonors: 342,
    recipientOrgs: 156,
    dataAnalysts: 12,
    totalDonations: 5432,
    totalWeight: 12580,
    wasteReduced: 89.5,
    foodSecurity: 78.3
  });

  const [userManagement, setUserManagement] = useState({
    pendingApprovals: [
      { id: 1, name: 'Taj Garden Restaurant', type: 'donor', email: 'contact@tajgarden.in', requestDate: '2024-11-25' },
      { id: 2, name: 'Mumbai Food Bank', type: 'recipient', email: 'admin@mumbaifoodbank.org.in', requestDate: '2024-11-24' },
      { id: 3, name: 'Dr. Priya Sharma', type: 'analyst', email: 'p.sharma@iit.ac.in', requestDate: '2024-11-23' }
    ],
    recentActivity: [
      { id: 1, action: 'New donation posted', user: 'Big Bazaar', time: '2 hours ago', type: 'donation' },
      { id: 2, action: 'Report generated', user: 'Food Analyst Team', time: '4 hours ago', type: 'report' },
      { id: 3, action: 'User approved', user: 'Annapurna Shelter', time: '1 day ago', type: 'approval' }
    ]
  });

  const [contentModeration, setContentModeration] = useState({
    flaggedContent: [
      { id: 1, type: 'donation', title: 'Expired dairy products', reporter: 'SafeFood Org', severity: 'high' },
      { id: 2, type: 'message', title: 'Inappropriate language in chat', reporter: 'Auto-moderator', severity: 'medium' }
    ],
    systemAlerts: [
      { id: 1, type: 'warning', message: 'High server load detected', time: '30 minutes ago' },
      { id: 2, type: 'info', message: 'Daily backup completed successfully', time: '2 hours ago' }
    ]
  });

  const handleUserApproval = (userId, approved) => {
    setUserManagement(prev => ({
      ...prev,
      pendingApprovals: prev.pendingApprovals.filter(user => user.id !== userId)
    }));
    
    // Add to recent activity
    const user = userManagement.pendingApprovals.find(u => u.id === userId);
    if (user) {
      setUserManagement(prev => ({
        ...prev,
        recentActivity: [
          { 
            id: Date.now(), 
            action: approved ? 'User approved' : 'User rejected', 
            user: user.name, 
            time: 'Just now', 
            type: 'approval' 
          },
          ...prev.recentActivity.slice(0, 9)
        ]
      }));
    }
  };

  const handleContentAction = (contentId, action) => {
    setContentModeration(prev => ({
      ...prev,
      flaggedContent: prev.flaggedContent.filter(item => item.id !== contentId)
    }));
  };

  const handleMarkMessageAsRead = (messageId) => {
    setMessages(prev => 
      prev.map(msg => msg.id === messageId ? { ...msg, read: true } : msg)
    );
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === notificationId ? { ...notif, read: true } : notif)
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const renderMessages = () => (
    <div className="admin-messages">
      <h2>Platform Messages</h2>
      <div className="messages-list">
        {messages.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No messages</p>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`message-item ${message.read ? 'read' : 'unread'}`}>
              <div className="message-info">
                <h4>{message.subject}</h4>
                <p><strong>From:</strong> {message.from}</p>
                <p className="message-text">{message.message}</p>
                <small>{message.timestamp}</small>
              </div>
              <div className="message-actions">
                {!message.read && (
                  <button 
                    className="mark-read-btn"
                    onClick={() => handleMarkMessageAsRead(message.id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="admin-overview">
      <div className="stats-grid">
        <StatCard title="Total Users" value={platformStats.totalUsers} icon="👥" />
        <StatCard title="Active Donors" value={platformStats.activeDonors} icon="🏪" />
        <StatCard title="Recipient Organizations" value={platformStats.recipientOrgs} icon="🏛️" />
        <StatCard title="Data Analysts" value={platformStats.dataAnalysts} icon="📊" />
        <StatCard title="Total Donations" value={platformStats.totalDonations} icon="📦" />
        <StatCard title="Food Rescued (kg)" value={`${platformStats.totalWeight} kg`} icon="⚖️" />
        <StatCard title="Waste Reduction %" value={`${platformStats.wasteReduced}%`} icon="♻️" />
        <StatCard title="Food Security Index" value={`${platformStats.foodSecurity}%`} icon="🛡️" />
      </div>
      
      <div className="admin-charts">
        <div className="chart-container">
          <h3>Platform Growth</h3>
          <div className="growth-chart">
            <div className="growth-item">
              <span>Users This Month</span>
              <div className="progress-bar">
                <div className="progress" style={{width: '75%'}}></div>
              </div>
              <span>+234</span>
            </div>
            <div className="growth-item">
              <span>Donations This Month</span>
              <div className="progress-bar">
                <div className="progress" style={{width: '89%'}}></div>
              </div>
              <span>+567</span>
            </div>
            <div className="growth-item">
              <span>Food Rescued This Month</span>
              <div className="progress-bar">
                <div className="progress" style={{width: '92%'}}></div>
              </div>
              <span>+2.3 tonnes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="user-management">
      <div className="pending-approvals">
        <h3>Pending User Approvals</h3>
        <div className="approvals-list">
          {userManagement.pendingApprovals.map(user => (
            <div key={user.id} className="approval-item">
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <span className={`user-type ${user.type}`}>{user.type}</span>
                <small>Requested: {user.requestDate}</small>
              </div>
              <div className="approval-actions">
                <button 
                  className="approve-btn"
                  onClick={() => handleUserApproval(user.id, true)}
                >
                  Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleUserApproval(user.id, false)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {userManagement.recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'donation' ? '📦' : 
                 activity.type === 'report' ? '📊' : '✅'}
              </div>
              <div className="activity-content">
                <p>{activity.action}</p>
                <small>by {activity.user} • {activity.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentModeration = () => (
    <div className="content-moderation">
      <div className="flagged-content">
        <h3>Flagged Content</h3>
        <div className="flagged-list">
          {contentModeration.flaggedContent.map(item => (
            <div key={item.id} className="flagged-item">
              <div className="flagged-info">
                <h4>{item.title}</h4>
                <p>Type: {item.type}</p>
                <p>Reported by: {item.reporter}</p>
                <span className={`severity ${item.severity}`}>{item.severity} priority</span>
              </div>
              <div className="moderation-actions">
                <button 
                  className="review-btn"
                  onClick={() => handleContentAction(item.id, 'review')}
                >
                  Review
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => handleContentAction(item.id, 'remove')}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="system-alerts">
        <h3>System Alerts</h3>
        <div className="alerts-list">
          {contentModeration.systemAlerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.type}`}>
              <div className="alert-icon">
                {alert.type === 'warning' ? '⚠️' : 'ℹ️'}
              </div>
              <div className="alert-content">
                <p>{alert.message}</p>
                <small>{alert.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard admin-dashboard">
      <header className="dashboard-header admin-header">
        <div className="header-left">
          <div className="admin-badge">
            <span className="badge-icon">👑</span>
            <span className="badge-text">APP HEAD</span>
          </div>
          <div className="header-info">
            <h1>Administrator Dashboard</h1>
            <p className="admin-subtitle">Platform Control & Management</p>
            <p className="admin-name">Logged in as: <strong>{user.name}</strong></p>
          </div>
        </div>
        <div className="header-right">
          <NotificationBell 
            notifications={notifications}
            onMarkAsRead={handleMarkNotificationAsRead}
            onClearAll={handleClearAllNotifications}
          />
          <button className="logout-btn admin-logout-btn" onClick={onLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 User Management
        </button>
        <button 
          className={activeTab === 'content' ? 'active' : ''}
          onClick={() => setActiveTab('content')}
        >
          🛡️ Content Moderation
        </button>
        <button 
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          💬 Messages
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'content' && renderContentModeration()}
        {activeTab === 'messages' && renderMessages()}
      </main>
    </div>
  );
};

export default AdminDashboard;