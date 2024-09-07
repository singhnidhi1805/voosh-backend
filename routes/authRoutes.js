
// const express = require('express');
// const router = express.Router();
// const { register, login } = require('../controller/authController');
// const passport = require('passport');

// // @route    POST api/auth/register
// // @desc     Register user
// // @access   Public
// router.post('/register', register);

// // @route    POST api/auth/login
// // @desc     Authenticate user & get token
// // @access   Public
// router.post('/login', login);

// // @route    GET api/auth/google
// // @desc     Authenticate user with Google
// // @access   Public
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // @route    GET api/auth/google/callback
// // @desc     Google auth callback
// // @access   Public
// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect to the dashboard
//     res.redirect('http://localhost:3000/dashboard');
//   }
// );

// module.exports = router;

const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authController');
const passport = require('passport');

// Register user
router.post('/register', register);

// Authenticate user & get token
router.post('/login', login);

// Authenticate user with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google auth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the dashboard
    res.redirect('https://vooshfrontend.vercel.app/dashboard');
  }
);

module.exports = router;
