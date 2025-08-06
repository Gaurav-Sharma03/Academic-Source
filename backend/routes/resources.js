const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Resource = require('../models/Resource');
const University = require('../models/University');

// Valid resource types
const resourceTypes = ['notes', 'papers', 'syllabus'];
const baseUploadDir = path.join(__dirname, '../uploads/resources');

// Ensure main and sub directories exist
if (!fs.existsSync(baseUploadDir)) {
  fs.mkdirSync(baseUploadDir, { recursive: true });
}
resourceTypes.forEach(type => {
  const typeDir = path.join(baseUploadDir, type);
  if (!fs.existsSync(typeDir)) {
    fs.mkdirSync(typeDir, { recursive: true });
  }
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type;
    if (!resourceTypes.includes(type)) {
      return cb(new Error('Invalid resource type'), false);
    }

    const uploadPath = path.join(baseUploadDir, type);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

/**
 * @route   POST /api/resources/upload
 * @desc    Upload academic resource
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { university, department, course, semester, type, title } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: '❌ No file uploaded' });
    }

    const universityDoc = await University.findById(university);
    if (!universityDoc) {
      return res.status(404).json({ error: '❌ University not found' });
    }

    const newResource = new Resource({
      university,
      universityName: universityDoc.name,
      department,
      course,
      semester,
      type,
      title,
      fileUrl: `/uploads/resources/${type}/${req.file.filename}`
    });

    await newResource.save();
    res.status(201).json({ message: '✅ File uploaded successfully', data: newResource });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

/**
 * @route   GET /api/resources
 * @desc    Get all resources (optionally filterable)
 */
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const resources = await Resource.find(filters).populate('university');
    res.json(resources);
  } catch (err) {
    console.error('❌ Error fetching resources:', err);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

/**
 * @route   GET /api/resources/download/:id
 * @desc    Download a file by resource ID
 */
router.get('/download/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource || !resource.fileUrl) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = path.join(__dirname, '..', resource.fileUrl);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File does not exist on server' });
    }

    return res.download(filePath, path.basename(filePath));
  } catch (err) {
    console.error('❌ Download error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   DELETE /api/resources/:id
 * @desc    Delete a resource and remove the file
 */
router.delete('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    const filePath = path.join(__dirname, '..', resource.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Resource deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
