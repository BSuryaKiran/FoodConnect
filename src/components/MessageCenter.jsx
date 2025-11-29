// Import React library and useState hook for component state management
import React, { useState } from 'react';
// Import component-specific CSS styles
import './MessageCenter.css';

/**
 * MessageCenter Component
 * Provides a dropdown interface for viewing and managing messages
 * Features include: message list, message details view, mark as read, and delete
 * 
 * @param {Array} messages - Array of message objects with sender, subject, body, etc.
 * @param {Function} onMarkAsRead - Callback to mark a message as read
 * @param {Function} onDeleteMessage - Callback to delete a message
 */
const MessageCenter = ({ messages, onMarkAsRead, onDeleteMessage }) => {
  // State to control dropdown visibility (open/closed)
  const [isOpen, setIsOpen] = useState(false);
  // State to track which message is currently selected for detailed view
  const [selectedMessage, setSelectedMessage] = useState(null);
  
  // Calculate count of unread messages by filtering messages array
  const unreadCount = messages.filter(m => !m.read).length;

  /**
   * Toggle message center dropdown open/closed
   * Switches between showing and hiding the message list
   */
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Select a message to view its full details
   * Automatically marks message as read if it's unread
   * @param {Object} message - The message object to display
   */
  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    // If message hasn't been read yet, mark it as read
    if (!message.read) {
      onMarkAsRead(message.id);
    }
  };

  /**
   * Go back from message detail view to message list
   * Clears the selected message state
   */
  const handleBack = () => {
    setSelectedMessage(null);
  };

  /**
   * Delete a message and return to message list
   * @param {number} id - ID of message to delete
   */
  const handleDelete = (id) => {
    onDeleteMessage(id);
    // Clear selected message after deletion
    setSelectedMessage(null);
  };

  /**
   * Format timestamp to readable date and time format
   * Uses Indian locale format (e.g., "28 Nov 2024, 02:30 PM")
   * @param {string} timestamp - ISO timestamp string
   * @returns {string} Formatted date and time string
   */
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    // Format with Indian locale settings
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Get appropriate avatar emoji based on sender type
   * @param {string} sender - Name/type of message sender
   * @returns {string} Emoji representing the sender
   */
  const getSenderAvatar = (sender) => {
    // Map sender types to their corresponding emoji avatars
    const avatars = {
      'System': '🤖',
      'Admin': '👨‍💼',
      'Support': '💁',
      'Donor': '🍽️',
      'Seeker': '🤝'
    };
    // Return matching avatar or default user icon
    return avatars[sender] || '👤';
  };

  return (
    <div className="message-center-container">
      <button 
        className="message-center-btn" 
        onClick={handleToggle}
        aria-label="Messages"
      >
        <span className="message-icon">💬</span>
        {unreadCount > 0 && (
          <span className="message-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="message-overlay" onClick={() => setIsOpen(false)} />
          <div className="message-dropdown">
            {!selectedMessage ? (
              <>
                <div className="message-header">
                  <h3>Messages</h3>
                  <button 
                    className="close-btn" 
                    onClick={() => setIsOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="message-list">
                  {messages.length === 0 ? (
                    <div className="no-messages">
                      <span className="no-msg-icon">📭</span>
                      <p>No messages</p>
                    </div>
                  ) : (
                    messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`message-item ${!message.read ? 'unread' : ''}`}
                        onClick={() => handleSelectMessage(message)}
                      >
                        <span className="sender-avatar">
                          {getSenderAvatar(message.sender)}
                        </span>
                        <div className="msg-preview">
                          <div className="msg-header-row">
                            <span className="msg-sender">{message.sender}</span>
                            <span className="msg-time">{formatTime(message.timestamp)}</span>
                          </div>
                          <p className="msg-subject">{message.subject}</p>
                          <p className="msg-preview-text">{message.preview}</p>
                        </div>
                        {!message.read && <span className="unread-indicator"></span>}
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="message-header">
                  <button className="back-btn" onClick={handleBack}>
                    ← Back
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    🗑️
                  </button>
                </div>

                <div className="message-detail">
                  <div className="message-detail-header">
                    <div className="sender-info">
                      <span className="sender-avatar-large">
                        {getSenderAvatar(selectedMessage.sender)}
                      </span>
                      <div>
                        <h4>{selectedMessage.sender}</h4>
                        <span className="detail-time">
                          {formatTime(selectedMessage.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="message-subject">{selectedMessage.subject}</h3>
                  
                  <div className="message-body">
                    {selectedMessage.body}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MessageCenter;
