const express = require('express');
const router = express.Router();
const Cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { setCode, verifyCode, removeCode } = require('../utils/emailCodeStore');

// 🔐 Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g., your Gmail
    pass: process.env.EMAIL_PASS,
  },
});

// Step 1: Send verification code
router.post('/register/send-code', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <h2 style="color: #2d6cdf;">🎓 Welcome to AcademicSource!</h2>
      <p>Hi there 👋,</p>
      <p>Thanks for joining our academic community! To complete your registration, please verify your email address using the code below:</p>

      <div style="background-color: #e3f0ff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h1 style="color: #2d6cdf; font-size: 36px; letter-spacing: 2px;">${code}</h1>
      </div>

      <p>⏰ This code is valid for <strong>10 minutes</strong>. Please enter it in the registration form to activate your account.</p>
      <p>If you did not request this, feel free to ignore this email.</p>

      <br>
      <p>Warm regards,<br><strong>The AcademicSource Team</strong></p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"AcademicSource" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎓 Welcome to AcademicSource – Verify Your Email',
      html: htmlContent,
    });

    setCode(email, code); // store with 10-minute expiry
    res.json({ message: '📧 Verification code sent to your email.' });
  } catch (err) {
    console.error('❌ Email sending error:', err.message);
    res.status(500).json({ error: 'Failed to send verification email.' });
  }
});

// Step 2: Verify code and register user
router.post('/register/verify', async (req, res) => {
  const { name, email, password, code } = req.body;

  if (!name || !email || !password || !code) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const isValid = verifyCode(email, code);
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid or expired verification code' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  removeCode(email); // Clean up
  res.status(201).json({ message: '✅ User registered successfully' });
});
module.exports = router;
