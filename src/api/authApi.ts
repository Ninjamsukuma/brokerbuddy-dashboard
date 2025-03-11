
import axios from 'axios';

// This is just a demonstration of what the API calls would look like
// In a real application, you would need a proper backend server
// with Express.js, MongoDB, and JWT implementation

const API_URL = 'http://localhost:5000/api';

export const login = async (identifier: string, password: string) => {
  // In a real app, this would make an actual API call:
  // return axios.post(`${API_URL}/auth/login`, { identifier, password });
  
  // For demo purposes only
  return Promise.resolve({
    data: {
      user: {
        id: '123456',
        name: 'John Doe',
        email: identifier.includes('@') ? identifier : null,
        phone: !identifier.includes('@') ? identifier : null,
        role: 'client',
      },
      token: 'mock-jwt-token'
    }
  });
};

export const register = async (userData: {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: 'client' | 'broker';
}) => {
  // In a real app, this would make an actual API call:
  // return axios.post(`${API_URL}/auth/register`, userData);
  
  // For demo purposes only
  return Promise.resolve({
    data: {
      user: {
        id: '123456',
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
      },
      token: 'mock-jwt-token'
    }
  });
};

// The backend structure would look like this:
/*
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/broker-app');

// User model schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, sparse: true, unique: true },
  phone: { type: String, sparse: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'broker'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Register route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    
    if (!name || !password || !role || !(email || phone)) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = email 
      ? await User.findOne({ email }) 
      : await User.findOne({ phone });
      
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role
    });
    
    await user.save();
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1d' }
    );
    
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    
    if (!identifier || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if email or phone
    const isEmail = identifier.includes('@');
    
    // Find user
    const user = isEmail
      ? await User.findOne({ email: identifier })
      : await User.findOne({ phone: identifier });
      
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1d' }
    );
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
app.get('/api/profile', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Get user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/
