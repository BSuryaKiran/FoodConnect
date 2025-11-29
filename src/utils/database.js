/**
 * FoodConnect Local Database Module
 * Centralized localStorage management for all application data
 * Provides CRUD operations for users, donations, requests, messages, and notifications
 */

// Database Keys
const DB_KEYS = {
  USERS: 'foodconnect_users',
  DONATIONS: 'foodconnect_donations',
  REQUESTS: 'foodconnect_requests',
  MESSAGES: 'foodconnect_messages',
  NOTIFICATIONS: 'foodconnect_notifications',
  CURRENT_USER: 'currentUser'
};

// ==================== USERS MANAGEMENT ====================

/**
 * Get all registered users from database
 * @returns {Array} Array of user objects
 */
export const getAllUsers = () => {
  try {
    const users = localStorage.getItem(DB_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

/**
 * Save users array to database
 * @param {Array} users - Array of user objects
 */
export const saveUsers = (users) => {
  try {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    console.log('✅ Users database updated');
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

/**
 * Find user by email
 * @param {string} email - User email
 * @returns {Object|null} User object or null
 */
export const findUserByEmail = (email) => {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
};

/**
 * Register new user
 * @param {Object} userData - User data (email, password, name, type, etc.)
 * @returns {Object} Newly created user
 */
export const registerUser = (userData) => {
  const users = getAllUsers();
  
  // Check if user already exists
  const existingUser = findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const newUser = {
    ...userData,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  console.log('✅ User registered:', newUser.email);
  return newUser;
};

/**
 * Update user's last login time
 * @param {string} email - User email
 * @returns {Object|null} Updated user or null
 */
export const updateUserLogin = (email) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
    saveUsers(users);
    return users[userIndex];
  }
  return null;
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated user or null
 */
export const updateUserProfile = (userId, updates) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveUsers(users);
    console.log('✅ User profile updated:', userId);
    return users[userIndex];
  }
  return null;
};

// ==================== DONATIONS MANAGEMENT ====================

/**
 * Get all donations for a specific user
 * @param {string} userKey - User identifier (email or id)
 * @returns {Array} Array of donation objects
 */
export const getUserDonations = (userKey) => {
  try {
    const donations = localStorage.getItem(`donations_${userKey}`);
    return donations ? JSON.parse(donations) : [];
  } catch (error) {
    console.error('Error getting donations:', error);
    return [];
  }
};

/**
 * Save donations for a specific user
 * @param {string} userKey - User identifier
 * @param {Array} donations - Array of donation objects
 */
export const saveUserDonations = (userKey, donations) => {
  try {
    localStorage.setItem(`donations_${userKey}`, JSON.stringify(donations));
    console.log('✅ Donations saved for user:', userKey);
  } catch (error) {
    console.error('Error saving donations:', error);
  }
};

/**
 * Add new donation for a user
 * @param {string} userKey - User identifier
 * @param {Object} donation - Donation data
 * @returns {Object} Created donation
 */
export const addDonation = (userKey, donation) => {
  const donations = getUserDonations(userKey);
  const newDonation = {
    ...donation,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  donations.push(newDonation);
  saveUserDonations(userKey, donations);
  console.log('✅ Donation added:', newDonation.id);
  return newDonation;
};

/**
 * Update donation status
 * @param {string} userKey - User identifier
 * @param {number} donationId - Donation ID
 * @param {string} status - New status
 */
export const updateDonationStatus = (userKey, donationId, status) => {
  const donations = getUserDonations(userKey);
  const index = donations.findIndex(d => d.id === donationId);
  
  if (index !== -1) {
    donations[index].status = status;
    donations[index].updatedAt = new Date().toISOString();
    saveUserDonations(userKey, donations);
    console.log('✅ Donation status updated:', donationId, status);
  }
};

/**
 * Delete donation
 * @param {string} userKey - User identifier
 * @param {number} donationId - Donation ID
 */
export const deleteDonation = (userKey, donationId) => {
  const donations = getUserDonations(userKey);
  const filtered = donations.filter(d => d.id !== donationId);
  saveUserDonations(userKey, filtered);
  console.log('✅ Donation deleted:', donationId);
};

// ==================== REQUESTS MANAGEMENT ====================

/**
 * Get all requests for a specific user
 * @param {string} userKey - User identifier
 * @returns {Array} Array of request objects
 */
export const getUserRequests = (userKey) => {
  try {
    const requests = localStorage.getItem(`seekerRequests_${userKey}`);
    return requests ? JSON.parse(requests) : [];
  } catch (error) {
    console.error('Error getting requests:', error);
    return [];
  }
};

/**
 * Save requests for a specific user
 * @param {string} userKey - User identifier
 * @param {Array} requests - Array of request objects
 */
export const saveUserRequests = (userKey, requests) => {
  try {
    localStorage.setItem(`seekerRequests_${userKey}`, JSON.stringify(requests));
    console.log('✅ Requests saved for user:', userKey);
  } catch (error) {
    console.error('Error saving requests:', error);
  }
};

/**
 * Add new request for a user
 * @param {string} userKey - User identifier
 * @param {Object} request - Request data
 * @returns {Object} Created request
 */
export const addRequest = (userKey, request) => {
  const requests = getUserRequests(userKey);
  const newRequest = {
    ...request,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  requests.push(newRequest);
  saveUserRequests(userKey, requests);
  console.log('✅ Request added:', newRequest.id);
  return newRequest;
};

/**
 * Update request status
 * @param {string} userKey - User identifier
 * @param {number} requestId - Request ID
 * @param {string} status - New status
 */
export const updateRequestStatus = (userKey, requestId, status) => {
  const requests = getUserRequests(userKey);
  const index = requests.findIndex(r => r.id === requestId);
  
  if (index !== -1) {
    requests[index].status = status;
    requests[index].updatedAt = new Date().toISOString();
    saveUserRequests(userKey, requests);
    console.log('✅ Request status updated:', requestId, status);
  }
};

/**
 * Delete request
 * @param {string} userKey - User identifier
 * @param {number} requestId - Request ID
 */
export const deleteRequest = (userKey, requestId) => {
  const requests = getUserRequests(userKey);
  const filtered = requests.filter(r => r.id !== requestId);
  saveUserRequests(userKey, filtered);
  console.log('✅ Request deleted:', requestId);
};

// ==================== MESSAGES MANAGEMENT ====================

/**
 * Get all messages for a specific user
 * @param {string} userKey - User identifier
 * @returns {Array} Array of message objects
 */
export const getUserMessages = (userKey) => {
  try {
    const messages = localStorage.getItem(`messages_${userKey}`);
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
};

/**
 * Save messages for a specific user
 * @param {string} userKey - User identifier
 * @param {Array} messages - Array of message objects
 */
export const saveUserMessages = (userKey, messages) => {
  try {
    localStorage.setItem(`messages_${userKey}`, JSON.stringify(messages));
    console.log('✅ Messages saved for user:', userKey);
  } catch (error) {
    console.error('Error saving messages:', error);
  }
};

/**
 * Add new message for a user
 * @param {string} userKey - User identifier
 * @param {Object} message - Message data
 * @returns {Object} Created message
 */
export const addMessage = (userKey, message) => {
  const messages = getUserMessages(userKey);
  const newMessage = {
    ...message,
    id: Date.now(),
    timestamp: new Date().toISOString(),
    read: false
  };
  messages.unshift(newMessage);
  saveUserMessages(userKey, messages);
  console.log('✅ Message added:', newMessage.id);
  return newMessage;
};

/**
 * Mark message as read
 * @param {string} userKey - User identifier
 * @param {number} messageId - Message ID
 */
export const markMessageAsRead = (userKey, messageId) => {
  const messages = getUserMessages(userKey);
  const index = messages.findIndex(m => m.id === messageId);
  
  if (index !== -1) {
    messages[index].read = true;
    saveUserMessages(userKey, messages);
    console.log('✅ Message marked as read:', messageId);
  }
};

/**
 * Delete message
 * @param {string} userKey - User identifier
 * @param {number} messageId - Message ID
 */
export const deleteMessage = (userKey, messageId) => {
  const messages = getUserMessages(userKey);
  const filtered = messages.filter(m => m.id !== messageId);
  saveUserMessages(userKey, filtered);
  console.log('✅ Message deleted:', messageId);
};

// ==================== NOTIFICATIONS MANAGEMENT ====================

/**
 * Get all notifications for a specific user
 * @param {string} userKey - User identifier
 * @returns {Array} Array of notification objects
 */
export const getUserNotifications = (userKey) => {
  try {
    const notifications = localStorage.getItem(`notifications_${userKey}`);
    return notifications ? JSON.parse(notifications) : [];
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

/**
 * Save notifications for a specific user
 * @param {string} userKey - User identifier
 * @param {Array} notifications - Array of notification objects
 */
export const saveUserNotifications = (userKey, notifications) => {
  try {
    localStorage.setItem(`notifications_${userKey}`, JSON.stringify(notifications));
    console.log('✅ Notifications saved for user:', userKey);
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

/**
 * Add new notification for a user
 * @param {string} userKey - User identifier
 * @param {Object} notification - Notification data
 * @returns {Object} Created notification
 */
export const addNotification = (userKey, notification) => {
  const notifications = getUserNotifications(userKey);
  const newNotification = {
    ...notification,
    id: Date.now(),
    timestamp: new Date().toISOString(),
    read: false
  };
  notifications.unshift(newNotification);
  saveUserNotifications(userKey, notifications);
  console.log('✅ Notification added:', newNotification.id);
  return newNotification;
};

/**
 * Mark notification as read
 * @param {string} userKey - User identifier
 * @param {number} notificationId - Notification ID
 */
export const markNotificationAsRead = (userKey, notificationId) => {
  const notifications = getUserNotifications(userKey);
  const index = notifications.findIndex(n => n.id === notificationId);
  
  if (index !== -1) {
    notifications[index].read = true;
    saveUserNotifications(userKey, notifications);
    console.log('✅ Notification marked as read:', notificationId);
  }
};

/**
 * Clear all notifications for a user
 * @param {string} userKey - User identifier
 */
export const clearAllNotifications = (userKey) => {
  saveUserNotifications(userKey, []);
  console.log('✅ All notifications cleared for user:', userKey);
};

// ==================== DATABASE UTILITIES ====================

/**
 * Get database statistics
 * @returns {Object} Database stats
 */
export const getDatabaseStats = () => {
  const users = getAllUsers();
  
  let totalDonations = 0;
  let totalRequests = 0;
  let totalMessages = 0;
  let totalNotifications = 0;

  users.forEach(user => {
    const userKey = user.email || user.id;
    totalDonations += getUserDonations(userKey).length;
    totalRequests += getUserRequests(userKey).length;
    totalMessages += getUserMessages(userKey).length;
    totalNotifications += getUserNotifications(userKey).length;
  });

  return {
    users: users.length,
    donations: totalDonations,
    requests: totalRequests,
    messages: totalMessages,
    notifications: totalNotifications,
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Export all database data (for backup)
 * @returns {Object} Complete database export
 */
export const exportDatabase = () => {
  const users = getAllUsers();
  const data = {
    users: users,
    userData: {}
  };

  users.forEach(user => {
    const userKey = user.email || user.id;
    data.userData[userKey] = {
      donations: getUserDonations(userKey),
      requests: getUserRequests(userKey),
      messages: getUserMessages(userKey),
      notifications: getUserNotifications(userKey)
    };
  });

  console.log('✅ Database exported');
  return data;
};

/**
 * Clear entire database (use with caution)
 */
export const clearDatabase = () => {
  if (window.confirm('⚠️ Are you sure you want to clear the entire database? This action cannot be undone!')) {
    Object.values(DB_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear user-specific data
    const users = getAllUsers();
    users.forEach(user => {
      const userKey = user.email || user.id;
      localStorage.removeItem(`donations_${userKey}`);
      localStorage.removeItem(`seekerRequests_${userKey}`);
      localStorage.removeItem(`messages_${userKey}`);
      localStorage.removeItem(`notifications_${userKey}`);
    });
    
    console.log('✅ Database cleared');
    alert('Database cleared successfully!');
    window.location.reload();
  }
};

/**
 * Log database contents (for debugging)
 */
export const logDatabase = () => {
  console.group('📊 FoodConnect Database Contents');
  console.log('Users:', getAllUsers());
  console.log('Stats:', getDatabaseStats());
  console.groupEnd();
};

export default {
  // Users
  getAllUsers,
  findUserByEmail,
  registerUser,
  updateUserLogin,
  updateUserProfile,
  
  // Donations
  getUserDonations,
  saveUserDonations,
  addDonation,
  updateDonationStatus,
  deleteDonation,
  
  // Requests
  getUserRequests,
  saveUserRequests,
  addRequest,
  updateRequestStatus,
  deleteRequest,
  
  // Messages
  getUserMessages,
  saveUserMessages,
  addMessage,
  markMessageAsRead,
  deleteMessage,
  
  // Notifications
  getUserNotifications,
  saveUserNotifications,
  addNotification,
  markNotificationAsRead,
  clearAllNotifications,
  
  // Utilities
  getDatabaseStats,
  exportDatabase,
  clearDatabase,
  logDatabase
};
