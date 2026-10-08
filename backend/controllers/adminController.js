import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { Cause } from '../models/Cause.js';
import { Package } from '../models/Package.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'thaagam_secret_2026', {
    expiresIn: '30d',
  });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current admin profile
// @route   GET /api/admin/me
// @access  Private (Admin)
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard metrics & overview
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    const totalCauses = await Cause.countDocuments();
    const activeCauses = await Cause.countDocuments({ isActive: true });
    const totalPackages = await Package.countDocuments();
    const activePackages = await Package.countDocuments({ isActive: true });

    // Aggregated category counts
    const categories = ['food', 'animals', 'birthday', 'environment', 'education', 'orphanage', 'healthcare', 'livelihood', 'others'];
    const categoryCounts = {};
    for (const cat of categories) {
      categoryCounts[cat] = await Cause.countDocuments({ categories: cat });
    }

    const recentCauses = await Cause.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        totalCauses,
        activeCauses,
        totalPackages,
        activePackages,
        categoryCounts,
        recentCauses,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
