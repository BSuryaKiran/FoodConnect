const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Get all donations for a user
router.get('/user/:userEmail', async (req, res) => {
  try {
    const donations = await Donation.find({ userEmail: req.params.userEmail })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      donations: donations
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get donations', 
      error: error.message 
    });
  }
});

// Create new donation
router.post('/', async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();

    console.log('✅ Donation created:', newDonation._id);

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      donation: newDonation
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create donation', 
      error: error.message 
    });
  }
});

// Update donation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Donation not found' 
      });
    }

    console.log('✅ Donation status updated:', donation._id, status);

    res.json({
      success: true,
      message: 'Donation status updated',
      donation: donation
    });
  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update donation', 
      error: error.message 
    });
  }
});

// Delete donation
router.delete('/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Donation not found' 
      });
    }

    console.log('✅ Donation deleted:', req.params.id);

    res.json({
      success: true,
      message: 'Donation deleted successfully'
    });
  } catch (error) {
    console.error('Delete donation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete donation', 
      error: error.message 
    });
  }
});

module.exports = router;
