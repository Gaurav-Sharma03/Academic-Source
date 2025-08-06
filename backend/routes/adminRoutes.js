const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const validator = require('validator');

// Register Admin
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ 1. Basic Field Check
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields (name, email, password) are required.' });
    }

    // ✅ 2. Email Format Check
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // ✅ 3. Password Strength Check
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // ✅ 4. Check if Admin Already Exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ error: 'An admin with this email already exists.' });
    }

    // ✅ 5. Prevent Weak/Duplicate Password (optional)
    const samePasswordAdmin = await Admin.findOne({ password });
    if (samePasswordAdmin) {
      return res.status(400).json({ error: 'Please choose a different password.' });
    }

    // ✅ 6. Save New Admin
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    return res.status(201).json({ message: '✅ Admin registered successfully' });
  } catch (error) {
    console.error('❌ Admin Registration Error:', error);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

module.exports = router;
