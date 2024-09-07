const User = require('../models/User');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName } = req.body;
  const avatar = req.file ? req.file.filename : null;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    if (avatar) {
      // Delete the old avatar if it exists
      if (user.image) {
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', user.image));
      }
      user.image = avatar;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
