import express from 'express';
import {
  loginAdmin,
  getAdminProfile,
  getDashboardStats,
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protectAdmin, getAdminProfile);
router.get('/dashboard', protectAdmin, getDashboardStats);

export default router;
