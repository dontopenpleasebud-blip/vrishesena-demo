import { Package } from '../models/Package.js';

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ sortOrder: 1, packageId: 1 });
    res.json({ success: true, count: packages.length, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create package
// @route   POST /api/packages
// @access  Private (Admin)
export const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private (Admin)
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, data: pkg });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private (Admin)
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    await pkg.deleteOne();
    res.json({ success: true, message: 'Package removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
