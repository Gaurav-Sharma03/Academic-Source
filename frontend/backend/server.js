const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (for images, PDFs, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Import route handlers
const statsRoutes = require('./routes/statsRoutes');
const universityRoutes = require('./routes/universityRoutes');
const resourceRoutes = require('./routes/resources');
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth'); // 🔑 Universal login route
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authorityRoutes = require('./routes/authorityRoutes');


// ✅ Mount routes
app.use('/api/universities', universityRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', authRoutes); // 🔑 /api/login
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/authority', authorityRoutes);
// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('🚀 AcademicSource API is running...');
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
