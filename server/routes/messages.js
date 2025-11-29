const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages for a user
router.get('/user/:userEmail', async (req, res) => {
  try {
    const messages = await Message.find({ userEmail: req.params.userEmail })
      .sort({ timestamp: -1 });
    
    res.json({
      success: true,
      messages: messages
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get messages', 
      error: error.message 
    });
  }
});

// Create new message
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    console.log('✅ Message created:', newMessage._id);

    res.status(201).json({
      success: true,
      message: 'Message created successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create message', 
      error: error.message 
    });
  }
});

// Mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    res.json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to mark message as read', 
      error: error.message 
    });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    console.log('✅ Message deleted:', req.params.id);

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete message', 
      error: error.message 
    });
  }
});

module.exports = router;
