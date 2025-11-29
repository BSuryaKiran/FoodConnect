const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications for a user
router.get('/user/:userEmail', async (req, res) => {
  try {
    const notifications = await Notification.find({ userEmail: req.params.userEmail })
      .sort({ timestamp: -1 });
    
    res.json({
      success: true,
      notifications: notifications
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get notifications', 
      error: error.message 
    });
  }
});

// Create new notification
router.post('/', async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();

    console.log('✅ Notification created:', newNotification._id);

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: newNotification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create notification', 
      error: error.message 
    });
  }
});

// Mark notification as read
router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notification
    });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to mark notification as read', 
      error: error.message 
    });
  }
});

// Clear all notifications for a user
router.delete('/user/:userEmail', async (req, res) => {
  try {
    await Notification.deleteMany({ userEmail: req.params.userEmail });

    console.log('✅ All notifications cleared for:', req.params.userEmail);

    res.json({
      success: true,
      message: 'All notifications cleared'
    });
  } catch (error) {
    console.error('Clear notifications error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to clear notifications', 
      error: error.message 
    });
  }
});

// Delete single notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    console.log('✅ Notification deleted:', req.params.id);

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete notification', 
      error: error.message 
    });
  }
});

module.exports = router;
