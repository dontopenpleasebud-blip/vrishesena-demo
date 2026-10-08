import express from 'express';
import {
  getCauses,
  getCauseBySlug,
  getCauseById,
  createCause,
  updateCause,
  deleteCause,
} from '../controllers/causeController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCauses)
  .post(protectAdmin, createCause);

router.route('/slug/:slug')
  .get(getCauseBySlug);

router.route('/:id')
  .get(getCauseById)
  .put(protectAdmin, updateCause)
  .delete(protectAdmin, deleteCause);

export default router;
