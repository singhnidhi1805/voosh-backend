
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const passport = require('./config/passport');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Middleware
app.use(helmet());
app.use(express.json({ extended: false }));

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true in production when using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app; // for testing
