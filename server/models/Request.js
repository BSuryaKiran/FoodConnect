const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  address: {
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
  urgency: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical']
  },
  beneficiaries: {
    type: Number,
    required: true
  },
  description: String,
  pickupPreference: {
    type: String,
    default: 'delivery',
    enum: ['delivery', 'pickup', 'either']
  },
  storageCapacity: Number,
  distance: {
    type: Number,
    default: 5
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  deliveryFeePaid: {
    type: Boolean,
    default: false
  },
  paymentMethod: String,
  paymentDate: Date,
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Matched', 'In Transit', 'Delivered', 'Cancelled']
  },
  dateRequested: {
    type: String
  },
  matchedDonors: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
requestSchema.index({ userId: 1 });
requestSchema.index({ userEmail: 1 });
requestSchema.index({ status: 1 });

module.exports = mongoose.model('Request', requestSchema);
