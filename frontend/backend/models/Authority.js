const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authoritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Authority name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['authority'],
    default: 'authority',
  },
  department: {
    type: String, // e.g., "Computer Science"
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 Hash password before save
authoritySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔑 Match password method
authoritySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Authority', authoritySchema);
