import express from 'express';
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPackages)
  .post(protectAdmin, createPackage);

router.route('/:id')
  .put(protectAdmin, updatePackage)
  .delete(protectAdmin, deletePackage);

export default router;
