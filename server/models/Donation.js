const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true,
    default: 'kg'
  },
  expiryDate: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: 'Available',
    enum: ['Available', 'Pending', 'Collected', 'Delivered', 'Expired']
  }
}, {
  timestamps: true
});

// Indexes
donationSchema.index({ userId: 1 });
donationSchema.index({ userEmail: 1 });
donationSchema.index({ status: 1 });

module.exports = mongoose.model('Donation', donationSchema);
