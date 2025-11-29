/**
 * API Service Module
 * Centralized API communication layer for FoodConnect application
 * Replaces localStorage with MongoDB Atlas backend calls
 */

// API Configuration
// Set your deployed backend URL in VITE_API_URL environment variable
// For development: uses proxy (/api -> http://localhost:5000/api)
// For production: uses environment variable or falls back to Render/Railway deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                     (import.meta.env.DEV ? '/api' : 'https://foodconnect-api.onrender.com/api');

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== AUTHENTICATION ====================

export const authAPI = {
  /**
   * Register new user
   */
  register: async (userData) => {
    return await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Login user
   */
  login: async (credentials) => {
    return await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Get user profile
   */
  getProfile: async (userId) => {
    return await apiCall(`/auth/profile/${userId}`);
  },
};

// ==================== DONATIONS ====================

export const donationsAPI = {
  /**
   * Get all donations for a user
   */
  getUserDonations: async (userEmail) => {
    return await apiCall(`/donations/user/${encodeURIComponent(userEmail)}`);
  },

  /**
   * Create new donation
   */
  createDonation: async (donationData) => {
    return await apiCall('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  },

  /**
   * Update donation status
   */
  updateStatus: async (donationId, status) => {
    return await apiCall(`/donations/${donationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Delete donation
   */
  deleteDonation: async (donationId) => {
    return await apiCall(`/donations/${donationId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== REQUESTS ====================

export const requestsAPI = {
  /**
   * Get all requests for a user
   */
  getUserRequests: async (userEmail) => {
    return await apiCall(`/requests/user/${encodeURIComponent(userEmail)}`);
  },

  /**
   * Create new request
   */
  createRequest: async (requestData) => {
    return await apiCall('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  /**
   * Update request status
   */
  updateStatus: async (requestId, status) => {
    return await apiCall(`/requests/${requestId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Delete request
   */
  deleteRequest: async (requestId) => {
    return await apiCall(`/requests/${requestId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== MESSAGES ====================

export const messagesAPI = {
  /**
   * Get all messages for a user
   */
  getUserMessages: async (userEmail) => {
    return await apiCall(`/messages/user/${encodeURIComponent(userEmail)}`);
  },

  /**
   * Create new message
   */
  createMessage: async (messageData) => {
    return await apiCall('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  /**
   * Mark message as read
   */
  markAsRead: async (messageId) => {
    return await apiCall(`/messages/${messageId}/read`, {
      method: 'PATCH',
    });
  },

  /**
   * Delete message
   */
  deleteMessage: async (messageId) => {
    return await apiCall(`/messages/${messageId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== NOTIFICATIONS ====================

export const notificationsAPI = {
  /**
   * Get all notifications for a user
   */
  getUserNotifications: async (userEmail) => {
    return await apiCall(`/notifications/user/${encodeURIComponent(userEmail)}`);
  },

  /**
   * Create new notification
   */
  createNotification: async (notificationData) => {
    return await apiCall('/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId) => {
    return await apiCall(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  },

  /**
   * Clear all notifications for a user
   */
  clearAll: async (userEmail) => {
    return await apiCall(`/notifications/user/${encodeURIComponent(userEmail)}`, {
      method: 'DELETE',
    });
  },

  /**
   * Delete single notification
   */
  deleteNotification: async (notificationId) => {
    return await apiCall(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== HEALTH CHECK ====================

export const healthCheck = async () => {
  return await apiCall('/health');
};

export default {
  auth: authAPI,
  donations: donationsAPI,
  requests: requestsAPI,
  messages: messagesAPI,
  notifications: notificationsAPI,
  healthCheck,
};
