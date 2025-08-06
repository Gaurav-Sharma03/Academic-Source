const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Book = require('../models/Book'); // Make sure this path is correct

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/books');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({ storage });




/**
 * @route   POST /api/books
 * @desc    Add a new book
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, seller, email, price } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image file is required' });

    const image = `/uploads/books/${req.file.filename}`;
    const newBook = new Book({ name, seller, email, price, image });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error saving book:', err);
    res.status(500).json({ error: 'Failed to save book' });
  }
});

/**
 * @route   GET /api/books
 * @desc    Get all books
 */
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

/**
 * @route   PUT /api/books/:id
 * @desc    Update a book
 */
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, seller, email, price } = req.body;

    const updateData = { name, seller, email, price };

    // If a new image is uploaded, include it
    if (req.file) {
      updateData.image = `/uploads/books/${req.file.filename}`;
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });

    res.json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

/**
 * @route   DELETE /api/books/:id
 * @desc    Delete a book
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: 'Book not found' });

    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;
