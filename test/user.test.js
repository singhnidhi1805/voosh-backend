const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

let token;
let userId;

beforeAll(async () => {
  const user = new User({ email: 'testuser@example.com', password: 'password123' });
  await user.save();
  userId = user.id;
  token = jwt.sign({ user: { id: user.id } }, keys.jwtSecret, { expiresIn: 360000 });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Endpoints', () => {
  it('should get user profile', async () => {
    const res = await request(app)
      .get('/api/user')
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email');
  });
});
