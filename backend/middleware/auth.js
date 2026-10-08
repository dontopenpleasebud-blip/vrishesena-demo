import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'thaagam_secret_2026');
      req.admin = await Admin.findById(decoded.id).select('-password');
      if (!req.admin || !req.admin.isActive) {
        return res.status(401).json({ success: false, message: 'Admin not found or inactive' });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token', error: error.message });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'No authorization token provided' });
  }
};
