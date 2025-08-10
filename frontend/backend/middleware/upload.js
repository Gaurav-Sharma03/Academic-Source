import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Use __dirname safely in ES modules (if needed)
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type; // Expected: 'notes', 'papers', 'syllabus', or 'books'
    let folder = '';

    if (['notes', 'papers', 'syllabus'].includes(type)) {
  folder = path.join(__dirname, `uploads/resources/${type}`);
} else if (type === 'books') {
  folder = path.join(__dirname, 'uploads/books');
} else if (type === 'trusted') {
  folder = path.join(__dirname, 'uploads/trusted');
} else if (type === 'purchasers') {
  folder = path.join(__dirname, 'uploads/purchasers');
} else {
  folder = path.join(__dirname, 'uploads/others');
}


    // Ensure directory exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(/\.[^/.]+$/, '');
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
