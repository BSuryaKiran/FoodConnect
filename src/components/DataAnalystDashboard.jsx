// Import React library and hooks for state management and side effects
import React, { useState, useEffect } from 'react';
// Import reusable components
import StatCard from './StatCard.jsx';
import MessageCenter from './MessageCenter.jsx';
import NotificationBell from './NotificationBell.jsx';
// Import shared dashboard styles first, then analyst-specific styles
import './Dashboard.css';
import './DataAnalystDashboard.css';

const DataAnalystDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [timeRange, setTimeRange] = useState('month');
  
  // Timeline-based data
  const timelineData = {
    week: {
      wasteMetrics: {
        totalWastePrevented: 2850,
        wasteReductionRate: 18.2,
        averageWastePerDonation: 7.8,
        environmentalImpact: 9.5
      },
      foodSecurityMetrics: {
        peopleFed: 2340,
        mealsProvided: 9120,
        nutritionScore: 85.3,
        distributionEfficiency: 91.8
      },
      trends: {
        wasteReduction: [
          { period: 'Mon', value: 16.5 },
          { period: 'Tue', value: 17.2 },
          { period: 'Wed', value: 18.1 },
          { period: 'Thu', value: 18.8 },
          { period: 'Fri', value: 19.2 },
          { period: 'Sat', value: 17.9 },
          { period: 'Sun', value: 16.8 }
        ],
        donations: [
          { period: 'Mon', donations: 45, weight: 320 },
          { period: 'Tue', donations: 52, weight: 380 },
          { period: 'Wed', donations: 58, weight: 425 },
          { period: 'Thu', donations: 62, weight: 450 },
          { period: 'Fri', donations: 68, weight: 495 },
          { period: 'Sat', donations: 55, weight: 410 },
          { period: 'Sun', donations: 48, weight: 370 }
        ]
      }
    },
    month: {
      wasteMetrics: {
        totalWastePrevented: 12580,
        wasteReductionRate: 23.5,
        averageWastePerDonation: 8.7,
        environmentalImpact: 41.9
      },
      foodSecurityMetrics: {
        peopleFed: 10340,
        mealsProvided: 40280,
        nutritionScore: 87.5,
        distributionEfficiency: 94.2
      },
      trends: {
        wasteReduction: [
          { period: 'Week 1', value: 21.2 },
          { period: 'Week 2', value: 22.5 },
          { period: 'Week 3', value: 23.8 },
          { period: 'Week 4', value: 25.1 }
        ],
        donations: [
          { period: 'Week 1', donations: 420, weight: 2980 },
          { period: 'Week 2', donations: 445, weight: 3150 },
          { period: 'Week 3', donations: 468, weight: 3320 },
          { period: 'Week 4', donations: 507, weight: 3130 }
        ]
      }
    },
    quarter: {
      wasteMetrics: {
        totalWastePrevented: 38640,
        wasteReductionRate: 21.8,
        averageWastePerDonation: 8.5,
        environmentalImpact: 128.7
      },
      foodSecurityMetrics: {
        peopleFed: 31680,
        mealsProvided: 123520,
        nutritionScore: 86.8,
        distributionEfficiency: 93.5
      },
      trends: {
        wasteReduction: [
          { period: 'Sep', value: 19.5 },
          { period: 'Oct', value: 21.3 },
          { period: 'Nov', value: 23.5 },
          { period: 'Dec', value: 22.9 }
        ],
        donations: [
          { period: 'Sep', donations: 1520, weight: 10480 },
          { period: 'Oct', donations: 1680, weight: 11250 },
          { period: 'Nov', donations: 1840, weight: 12580 },
          { period: 'Dec', donations: 1500, weight: 4330 }
        ]
      }
    },
    year: {
      wasteMetrics: {
        totalWastePrevented: 156720,
        wasteReductionRate: 24.7,
        averageWastePerDonation: 9.2,
        environmentalImpact: 522.4
      },
      foodSecurityMetrics: {
        peopleFed: 128940,
        mealsProvided: 502560,
        nutritionScore: 88.2,
        distributionEfficiency: 95.1
      },
      trends: {
        wasteReduction: [
          { period: 'Jan', value: 22.1 },
          { period: 'Feb', value: 21.8 },
          { period: 'Mar', value: 23.2 },
          { period: 'Apr', value: 24.5 },
          { period: 'May', value: 25.8 },
          { period: 'Jun', value: 26.2 },
          { period: 'Jul', value: 24.9 },
          { period: 'Aug', value: 25.3 },
          { period: 'Sep', value: 24.1 },
          { period: 'Oct', value: 23.7 },
          { period: 'Nov', value: 25.4 },
          { period: 'Dec', value: 24.2 }
        ],
        donations: [
          { period: 'Jan', donations: 1350, weight: 9240 },
          { period: 'Feb', donations: 1280, weight: 8890 },
          { period: 'Mar', donations: 1420, weight: 9780 },
          { period: 'Apr', donations: 1540, weight: 10650 },
          { period: 'May', donations: 1680, weight: 11580 },
          { period: 'Jun', donations: 1750, weight: 12090 },
          { period: 'Jul', donations: 1640, weight: 11320 },
          { period: 'Aug', donations: 1590, weight: 10980 },
          { period: 'Sep', donations: 1520, weight: 10480 },
          { period: 'Oct', donations: 1680, weight: 11250 },
          { period: 'Nov', donations: 1840, weight: 12580 },
          { period: 'Dec', donations: 1430, weight: 9880 }
        ]
      }
    }
  };
  
  const [analyticsData, setAnalyticsData] = useState(timelineData.month);
  
  // Update analytics data when timeRange changes
  useEffect(() => {
    setAnalyticsData(timelineData[timeRange]);
  }, [timeRange]);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New data analysis report ready',
      timestamp: new Date().toLocaleString(),
      type: 'info',
      read: false
    },
    {
      id: 2,
      message: 'Monthly insights generated successfully',
      timestamp: new Date().toLocaleString(),
      type: 'success',
      read: false
    }
  ]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Admin',
      subject: 'Q4 Report Request',
      message: 'Please prepare the quarterly analysis report by end of month.',
      timestamp: new Date().toLocaleString(),
      read: false
    },
    {
      id: 2,
      from: 'Platform Manager',
      subject: 'Data Verification',
      message: 'Can you verify the accuracy of last month\'s waste metrics?',
      timestamp: new Date().toLocaleString(),
      read: false
    }
  ]);

  const [reports, setReports] = useState({
    generated: [
      { 
        id: 1, 
        title: 'Monthly Waste Reduction Analysis', 
        type: 'monthly', 
        date: '2024-11-01', 
        status: 'completed',
        insights: 'Waste reduction increased by 15% compared to last month'
      },
      { 
        id: 2, 
        title: 'Food Security Impact Assessment', 
        type: 'impact', 
        date: '2024-10-28', 
        status: 'completed',
        insights: 'Platform helped feed 12,450 people this month'
      },
      { 
        id: 3, 
        title: 'Donor Behavior Patterns', 
        type: 'behavioral', 
        date: '2024-10-25', 
        status: 'completed',
        insights: 'Peak donation times: 2-4 PM and 8-10 PM on weekdays'
      }
    ],
    pending: [
      { 
        id: 4, 
        title: 'Quarterly Efficiency Report', 
        type: 'quarterly', 
        estimatedCompletion: '2024-12-05',
        progress: 75
      }
    ]
  });

  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      type: 'optimization',
      title: 'Improve Distribution Timing',
      description: 'Analysis shows 23% faster distribution when pickups are scheduled between 2-4 PM',
      priority: 'high',
      impact: 'Reduce food spoilage by ~8%'
    },
    {
      id: 2,
      type: 'expansion',
      title: 'Target New Donor Categories',
      description: 'Cafeterias and catering services show high waste potential but low platform adoption',
      priority: 'medium',
      impact: 'Potential 35% increase in food rescue'
    },
    {
      id: 3,
      type: 'efficiency',
      title: 'Route Optimization',
      description: 'Implementing route optimization could reduce transportation costs by 18%',
      priority: 'medium',
      impact: 'Lower operational costs, faster delivery'
    }
  ]);

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === notificationId ? { ...notif, read: true } : notif)
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleMarkMessageAsRead = (messageId) => {
    setMessages(prev =>
      prev.map(msg => msg.id === messageId ? { ...msg, read: true } : msg)
    );
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const renderMessages = () => (
    <div className="analyst-messages">
      <h2>Communication Center</h2>
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

  const generateReport = (reportType) => {
    const newReport = {
      id: Date.now(),
      title: `${reportType} Analysis - ${new Date().toLocaleDateString('en-IN')}`,
      type: reportType.toLowerCase(),
      estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0
    };
    
    setReports(prev => ({
      ...prev,
      pending: [...prev.pending, newReport]
    }));
    
    // Simulate report generation progress
    setTimeout(() => {
      setReports(prev => ({
        ...prev,
        pending: prev.pending.map(report => 
          report.id === newReport.id ? { ...report, progress: 100, status: 'completed' } : report
        )
      }));
    }, 3000);
  };

  const renderAnalytics = () => {
    const getTimeRangeLabel = () => {
      const labels = {
        week: 'This Week',
        month: 'This Month',
        quarter: 'This Quarter',
        year: 'This Year'
      };
      return labels[timeRange];
    };

    return (
    <div className="analytics-overview">
      <div className="analytics-header">
        <h2>Analytics Dashboard - {getTimeRangeLabel()}</h2>
        <div className="analytics-controls">
          <label htmlFor="timeRange" style={{marginRight: '0.5rem', fontWeight: 500}}>Time Period:</label>
          <select 
            id="timeRange"
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-selector"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '2px solid #4CAF50',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              backgroundColor: 'white',
              color: '#2d3748'
            }}
          >
            <option value="week">📅 This Week</option>
            <option value="month">📆 This Month</option>
            <option value="quarter">📊 This Quarter</option>
            <option value="year">📈 This Year</option>
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        <StatCard 
          title="Waste Prevented" 
          value={`${analyticsData.wasteMetrics.totalWastePrevented.toLocaleString('en-IN')} kg`} 
          icon="♻️" 
          trend={timeRange === 'week' ? '+12.3%' : timeRange === 'month' ? '+15.3%' : timeRange === 'quarter' ? '+18.5%' : '+21.2%'}
        />
        <StatCard 
          title="Waste Reduction Rate" 
          value={`${analyticsData.wasteMetrics.wasteReductionRate}%`} 
          icon="📉" 
          trend={timeRange === 'week' ? '+1.2%' : timeRange === 'month' ? '+2.1%' : timeRange === 'quarter' ? '+3.5%' : '+5.8%'}
        />
        <StatCard 
          title="People Fed" 
          value={analyticsData.foodSecurityMetrics.peopleFed.toLocaleString('en-IN')} 
          icon="👥" 
          trend={timeRange === 'week' ? '+5.7%' : timeRange === 'month' ? '+8.7%' : timeRange === 'quarter' ? '+12.3%' : '+16.9%'}
        />
        <StatCard 
          title="CO₂ Saved" 
          value={`${analyticsData.wasteMetrics.environmentalImpact} tonnes`} 
          icon="🌱" 
          trend={timeRange === 'week' ? '+8.4%' : timeRange === 'month' ? '+12.4%' : timeRange === 'quarter' ? '+15.7%' : '+19.3%'}
        />
      </div>

      <div className="charts-container">
        <div className="chart-section">
          <h3>Waste Reduction Trends</h3>
          <div className="trend-chart">
            {analyticsData.trends.wasteReduction.map((point, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar" 
                  style={{ height: `${(point.value / 30) * 100}%` }}
                ></div>
                <span className="bar-label">{point.period}</span>
                <span className="bar-value">{point.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h3>Donation Volume vs Weight</h3>
          <div className="donation-chart">
            {analyticsData.trends.donations.map((point, index) => (
              <div key={index} className="donation-point">
                <div className="point-info">
                  <strong>{point.period}</strong>
                  <span>{point.donations} donations</span>
                  <span>{point.weight} kg</span>
                </div>
                <div className="point-indicator" style={{
                  width: `${Math.min(100, (point.donations / (timeRange === 'week' ? 70 : timeRange === 'month' ? 510 : timeRange === 'quarter' ? 1840 : 1850)) * 100)}%`,
                  height: `${Math.min(100, (point.weight / (timeRange === 'week' ? 500 : timeRange === 'month' ? 3300 : timeRange === 'quarter' ? 12580 : 12590)) * 100)}%`
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="insights-panel">
        <h3>Key Insights for {getTimeRangeLabel()}</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>🎯 Efficiency Boost</h4>
            <p>Distribution efficiency: {analyticsData.foodSecurityMetrics.distributionEfficiency}%</p>
          </div>
          <div className="insight-card">
            <h4>📈 Average per Donation</h4>
            <p>{analyticsData.wasteMetrics.averageWastePerDonation} kg of food rescued per donation</p>
          </div>
          <div className="insight-card">
            <h4>🍽️ Meals Provided</h4>
            <p>{analyticsData.foodSecurityMetrics.mealsProvided.toLocaleString('en-IN')} meals served during this period</p>
          </div>
        </div>
      </div>
    </div>
  );
  };

  const renderReports = () => (
    <div className="reports-section">
      <div className="report-generation">
        <h3>Generate New Report</h3>
        <div className="report-buttons">
          <button onClick={() => generateReport('Weekly')} className="generate-btn">
            📊 Weekly Summary
          </button>
          <button onClick={() => generateReport('Impact')} className="generate-btn">
            🎯 Impact Assessment
          </button>
          <button onClick={() => generateReport('Efficiency')} className="generate-btn">
            ⚡ Efficiency Analysis
          </button>
          <button onClick={() => generateReport('Predictive')} className="generate-btn">
            🔮 Predictive Analysis
          </button>
        </div>
      </div>

      <div className="reports-list">
        <div className="completed-reports">
          <h3>Recent Reports</h3>
          <div className="reports-grid">
            {reports.generated.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <h4>{report.title}</h4>
                  <span className="report-type">{report.type}</span>
                </div>
                <p className="report-date">Generated: {report.date}</p>
                <p className="report-insights">{report.insights}</p>
                <div className="report-actions">
                  <button className="view-btn">View Report</button>
                  <button className="download-btn">Download PDF</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pending-reports">
          <h3>Reports in Progress</h3>
          {reports.pending.map(report => (
            <div key={report.id} className="pending-report">
              <div className="report-info">
                <h4>{report.title}</h4>
                <p>Expected completion: {report.estimatedCompletion}</p>
              </div>
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${report.progress}%` }}
                  ></div>
                </div>
                <span>{report.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="recommendations-section">
      <h3>AI-Powered Recommendations</h3>
      <div className="recommendations-list">
        {recommendations.map(rec => (
          <div key={rec.id} className="recommendation-card">
            <div className="rec-header">
              <h4>{rec.title}</h4>
              <span className={`priority ${rec.priority}`}>{rec.priority} priority</span>
            </div>
            <p className="rec-description">{rec.description}</p>
            <div className="rec-impact">
              <strong>Expected Impact:</strong> {rec.impact}
            </div>
            <div className="rec-actions">
              <button className="implement-btn">Implement</button>
              <button className="details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header - Consistent with Donor Dashboard */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <span className="logo-icon">📊</span>
            <div>
              <h1 className="dashboard-title">Data Analytics Dashboard</h1>
              <p className="dashboard-subtitle">Welcome back, {user.name}!</p>
            </div>
          </div>
          <div className="header-actions">
            <NotificationBell
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationAsRead}
              onClearAll={handleClearAllNotifications}
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
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
          <button 
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => setActiveTab('reports')}
          >
            📋 Reports
          </button>
          <button 
            className={activeTab === 'recommendations' ? 'active' : ''}
            onClick={() => setActiveTab('recommendations')}
          >
            🎯 Recommendations
          </button>
          <button 
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages
          </button>
        </nav>
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'messages' && renderMessages()}
      </main>
    </div>
  );
};

export default DataAnalystDashboard;