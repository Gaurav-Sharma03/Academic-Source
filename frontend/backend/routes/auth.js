// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

// Import Mongoose models
const Admin = require('../models/Admin');
const User = require('../models/User');
const Authority = require('../models/Authority');

// Environment secret
const JWT_SECRET = process.env.JWT_SECRET || '9f4a5c71d1332ad9b0d6aa379a6f95ad3bc26dd39d6e7596e578dbb4294dd7d4';

// Rate limiter to avoid brute-force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10,
  message: 'Too many login attempts. Try again in 15 minutes.',
});

// Role-wise model mapping
const roleModels = {
  admin: Admin,
  user: User,
  authority: Authority,
};

// 🔐 Login Route
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required.' });
    }

    const RoleModel = roleModels[role.toLowerCase()];
    if (!RoleModel) {
      return res.status(400).json({ error: 'Invalid role selected.' });
    }

    const user = await RoleModel.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: role.toLowerCase(),
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: `${role} login successful`,
      token,
      role: role.toLowerCase(),
      user: {
        id: user._id,
        name: user.name || '',
        email: user.email,
      },
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
