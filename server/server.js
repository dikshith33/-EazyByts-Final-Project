import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './models/index.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//  Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Database Connection
db.sequelize.sync()
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Database connection failed:', err));
