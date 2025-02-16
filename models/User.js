const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String },
  displayName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
