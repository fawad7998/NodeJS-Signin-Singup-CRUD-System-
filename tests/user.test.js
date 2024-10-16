const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const schema = require('../model/userSchema');
const bcrypt = require('bcryptjs');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(
    'mongodb+srv://fawad7998:fawad7998@cluster0.jueeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await schema.deleteMany();
});

describe('User API tests', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/v1/register').send({
      email: 'testuser@email.com',
      name: 'Test User',
      password: 'Password123',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('newUser');
    expect(res.body.message).toEqual('User Created Successfully');
  });

  it('should not register user with an existing email', async () => {
    await schema.create({
      email: 'testuser@email.com',
      name: 'Test User',
      password: 'Password123',
    });

    const res = await request(app).post('/api/v1/register').send({
      email: 'testuser@email.com',
      name: 'Another User',
      password: 'AnotherPassword',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email already exists');
  });

  it('should log in an existing user', async () => {
    const user = await schema.create({
      email: 'loginuser@email.com',
      name: 'Login User',
      password: await bcrypt.hash('Password123', 10),
    });

    const res = await request(app).post('/api/v1/login').send({
      email: 'loginuser@email.com',
      password: 'Password123',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login Successfully');
  });

  it('should not log in with incorrect password', async () => {
    const user = await schema.create({
      email: 'wrongpassuser@email.com',
      name: 'Wrong Pass User',
      password: await bcrypt.hash('Password123', 10),
    });

    const res = await request(app).post('/api/v1/login').send({
      email: 'wrongpassuser@email.com',
      password: 'WrongPassword123',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials!');
  });

  it('should return 404 if user does not exist during login', async () => {
    const res = await request(app).post('/api/v1/login').send({
      email: 'nonexistent@email.com',
      password: 'Password123',
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'User not found!');
  });
});
