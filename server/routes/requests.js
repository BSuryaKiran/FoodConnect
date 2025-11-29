const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Get all requests for a user
router.get('/user/:userEmail', async (req, res) => {
  try {
    const requests = await Request.find({ userEmail: req.params.userEmail })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      requests: requests
    });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get requests', 
      error: error.message 
    });
  }
});

// Create new request
router.post('/', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();

    console.log('✅ Request created:', newRequest._id);

    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      request: newRequest
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create request', 
      error: error.message 
    });
  }
});

// Update request status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Request not found' 
      });
    }

    console.log('✅ Request status updated:', request._id, status);

    res.json({
      success: true,
      message: 'Request status updated',
      request: request
    });
  } catch (error) {
    console.error('Update request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update request', 
      error: error.message 
    });
  }
});

// Delete request
router.delete('/:id', async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Request not found' 
      });
    }

    console.log('✅ Request deleted:', req.params.id);

    res.json({
      success: true,
      message: 'Request deleted successfully'
    });
  } catch (error) {
    console.error('Delete request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete request', 
      error: error.message 
    });
  }
});

module.exports = router;
