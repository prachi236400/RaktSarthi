const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/bloodbanks', require('./routes/bloodbanks'));
app.use('/api/blood-banks', require('./routes/bloodbanks')); // Alias for blood bank routes
app.use('/api/blood-camps', require('./routes/bloodCamps'));
app.use('/api/donor-health', require('./routes/donorHealth'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/events', require('./routes/events'));
app.use('/api/admin', require('./routes/admin')); // Admin routes for Excel export

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'RaktSarthi API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
