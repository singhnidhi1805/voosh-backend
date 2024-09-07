const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controller/userController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// @route    GET api/user
// @desc     Get user profile
// @access   Private
router.get('/', auth, getUserProfile);

// @route    PUT api/user
// @desc     Update user profile
// @access   Private
router.put(
  '/',
  [
    auth,
    upload.single('avatar'),
    [
      check('firstName', 'First name is required').not().isEmpty(),
      check('lastName', 'Last name is required').not().isEmpty(),
    ],
  ],
  updateUserProfile
);

module.exports = router;
