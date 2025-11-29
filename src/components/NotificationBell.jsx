// Import React library and useState hook for state management
import React, { useState } from 'react';
// Import component-specific styles
import './NotificationBell.css';

/**
 * NotificationBell Component
 * Displays a bell icon with notification count badge
 * Shows dropdown with list of notifications when clicked
 * 
 * @param {Array} notifications - Array of notification objects
 * @param {Function} onMarkAsRead - Callback function to mark notification as read
 * @param {Function} onClearAll - Callback function to clear all notifications
 */
const NotificationBell = ({ notifications, onMarkAsRead, onClearAll }) => {
  // State to control dropdown visibility (open/closed)
  const [isOpen, setIsOpen] = useState(false);
  
  // Calculate number of unread notifications by filtering notifications array
  const unreadCount = notifications.filter(n => !n.read).length;

  /**
   * Toggle dropdown open/closed state
   * Switches between showing and hiding notifications
   */
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Mark a specific notification as read
   * @param {number} id - Notification ID to mark as read
   */
  const handleMarkAsRead = (id) => {
    onMarkAsRead(id);
  };

  /**
   * Clear all notifications and close dropdown
   * Removes all notifications from the list
   */
  const handleClearAll = () => {
    onClearAll();
    setIsOpen(false);
  };

  /**
   * Get appropriate icon emoji based on notification type
   * @param {string} type - Notification type (success, info, warning, message)
   * @returns {string} Emoji icon corresponding to the type
   */
  const getNotificationIcon = (type) => {
    // Map notification types to emoji icons
    const icons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      message: '💬'
    };
    // Return matching icon or default bell icon if type not found
    return icons[type] || '🔔';
  };

  /**
   * Format timestamp to relative time (e.g., "2h ago", "Just now")
   * @param {string} timestamp - ISO timestamp string
   * @returns {string} Human-readable relative time
   */
  const formatTime = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    // Calculate difference in milliseconds
    const diffMs = now - notifTime;
    // Convert to minutes, hours, and days
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    // Return appropriate time format based on how long ago
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // Component render
  return (
    <div className="notification-bell-container">
      {/* Bell button with unread count badge */}
      <button 
        className="notification-bell-btn" 
        onClick={handleToggle}
        aria-label="Notifications"
      >
        {/* Bell icon emoji */}
        <span className="bell-icon">🔔</span>
        {/* Show badge with unread count only if there are unread notifications */}
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {/* Dropdown content - only shown when isOpen is true */}
      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div className="notification-overlay" onClick={() => setIsOpen(false)} />
          {/* Dropdown container with notifications */}
          <div className="notification-dropdown">
            {/* Header with title and clear all button */}
            <div className="notification-header">
              <h3>Notifications</h3>
              {/* Show clear all button only if there are notifications */}
              {notifications.length > 0 && (
                <button 
                  className="clear-all-btn" 
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* List of notifications */}
            <div className="notification-list">
              {/* Show empty state if no notifications */}
              {notifications.length === 0 ? (
                <div className="no-notifications">
                  <span className="no-notif-icon">🔕</span>
                  <p>No notifications</p>
                </div>
              ) : (
                // Map through notifications array and render each notification
                notifications.map(notification => (
                  <div 
                    key={notification.id}  // Unique key for React list rendering
                    // Apply 'unread' class if notification hasn't been read
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    // Mark notification as read when clicked
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    {/* Notification type icon */}
                    <span className="notif-icon">
                      {getNotificationIcon(notification.type)}
                    </span>
                    {/* Notification content */}
                    <div className="notif-content">
                      <p className="notif-title">{notification.title}</p>
                      <p className="notif-message">{notification.message}</p>
                      <span className="notif-time">{formatTime(notification.timestamp)}</span>
                    </div>
                    {/* Show unread indicator dot if notification is unread */}
                    {!notification.read && <span className="unread-dot"></span>}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Export component for use in other files
export default NotificationBell;
