const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/v1/users', userRoutes);


// Middleware to handle non-existent routes
app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

// Centralized error handler
app.use((err, req, res, next) => {
   if (err.name === 'ValidationError') {
      // Handle validation errors
      return res.status(400).json({ message: err.message });
   }

   if (err.status === 404) {
      // Handle non-existent route errors
      return res.status(404).json({ message: 'Route not found' });
   }

   // Default to 500 server error
   res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));

