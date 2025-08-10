const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // You can make this optional if needed
  },
  seller: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // You may add match regex to validate email
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
