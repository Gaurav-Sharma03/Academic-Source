const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',  // Reference to University model
    required: true,
  },
  universityName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
 
  type: {
    type: String,
    enum: ['notes', 'syllabus', 'papers'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
