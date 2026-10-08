import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import causeRoutes from './routes/causeRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins for dev flexibility (or configure CLIENT_URL)
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vrishasena Foundation API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/causes', causeRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Vrishasena Foundation Backend server running on http://localhost:${PORT}`);
  console.log(`📋 API Health Check available at http://localhost:${PORT}/api/health`);
  console.log(`📦 Causes endpoint: http://localhost:${PORT}/api/causes`);
  console.log(`🔑 Admin Auth endpoint: http://localhost:${PORT}/api/admin/login`);
});
