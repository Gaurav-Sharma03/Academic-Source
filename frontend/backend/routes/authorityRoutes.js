const express = require('express');
const router = express.Router();
const Authority = require('../models/Authority');
const validator = require('validator');

// Register Authority
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingAuthority = await Authority.findOne({ email });
    if (existingAuthority) {
      return res.status(409).json({ error: 'Authority already registered with this email' });
    }

    const newAuthority = new Authority({ name, email, password });
    await newAuthority.save();

    return res.status(201).json({ message: '✅ Authority registered successfully' });
  } catch (error) {
    console.error('❌ Authority Registration Error:', error);
    return res.status(500).json({ error: 'Server error during registration' });
  }
});

module.exports = router;
