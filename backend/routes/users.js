const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, bloodGroup, isDonor, address, isAvailable } = req.body;
    
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (bloodGroup) updateFields.bloodGroup = bloodGroup;
    if (isDonor !== undefined) updateFields.isDonor = isDonor;
    if (address) updateFields.address = address;
    if (isAvailable !== undefined) updateFields.isAvailable = isAvailable;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updateFields },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/users/donor-info
// @desc    Update donor health information
// @access  Private
router.put('/donor-info', auth, async (req, res) => {
  try {
    const donorInfo = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { donorInfo, isDonor: true } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Donor information saved successfully', user });
  } catch (error) {
    console.error('Error saving donor info:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/users/donors
// @desc    Get available donors by blood group
// @access  Private
router.get('/donors', auth, async (req, res) => {
  try {
    const { bloodGroup, latitude, longitude, maxDistance } = req.query;
    
    let query = { isDonor: true, isAvailable: true };
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    let donors;
    if (latitude && longitude) {
      // Geospatial query for nearby donors
      donors = await User.find({
        ...query,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            $maxDistance: maxDistance ? parseInt(maxDistance) : 10000 // 10km default
          }
        }
      }).select('-password');
    } else {
      donors = await User.find(query).select('-password');
    }

    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
