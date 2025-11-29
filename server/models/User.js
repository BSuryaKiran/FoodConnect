const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['donor', 'recipient', 'seeker', 'admin', 'analyst']
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  organization: {
    type: String
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ type: 1 });

module.exports = mongoose.model('User', userSchema);
