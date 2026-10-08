import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import causeRoutes from './routes/causeRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, '../frontend/dist');

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

// Serve Frontend Static Files in Production
app.use(express.static(frontendDistPath));

// Fallback for React Router (SPA) - Express 5 compatible
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
    if (err) {
      next();
    }
  });
});

// 404 Handler for undefined API routes
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
