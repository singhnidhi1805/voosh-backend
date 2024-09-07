const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');
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

describe('Task Endpoints', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('x-auth-token', token)
      .send({
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '2022-12-31',
        column: 'todo',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
