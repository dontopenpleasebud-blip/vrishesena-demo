import { Cause } from '../models/Cause.js';

// @desc    Get all causes (with optional filtering by category or search)
// @route   GET /api/causes
// @access  Public
export const getCauses = async (req, res) => {
  try {
    const { category, search, all } = req.query;
    const filter = {};

    // By default, public only sees active causes unless explicitly requesting all (for admin)
    if (!all) {
      filter.isActive = true;
    }

    if (category && category.toLowerCase() !== 'all') {
      filter.categories = { $in: [category.toLowerCase()] };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    const causes = await Cause.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    res.json({
      success: true,
      count: causes.length,
      data: causes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single cause by slug
// @route   GET /api/causes/slug/:slug
// @access  Public
export const getCauseBySlug = async (req, res) => {
  try {
    const cause = await Cause.findOne({ slug: req.params.slug });
    if (!cause) {
      return res.status(404).json({ success: false, message: 'Cause not found' });
    }
    res.json({ success: true, data: cause });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single cause by ID
// @route   GET /api/causes/:id
// @access  Public
export const getCauseById = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({ success: false, message: 'Cause not found' });
    }
    res.json({ success: true, data: cause });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new cause
// @route   POST /api/causes
// @access  Private (Admin)
export const createCause = async (req, res) => {
  try {
    const { title, slug, tagline, description, categories, unitPrice, unitLabel, currency, targetAmount, image, bannerImage, isFeatured, isActive, sortOrder } = req.body;

    const existing = await Cause.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A cause with this slug already exists' });
    }

    const cause = await Cause.create({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, ''),
      tagline,
      description,
      categories: categories || ['all'],
      unitPrice,
      unitLabel: unitLabel || 'Unit',
      currency: currency || '₹',
      targetAmount: targetAmount || 100000,
      image,
      bannerImage,
      isFeatured: !!isFeatured,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0,
    });

    res.status(201).json({ success: true, data: cause });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update cause
// @route   PUT /api/causes/:id
// @access  Private (Admin)
export const updateCause = async (req, res) => {
  try {
    let cause = await Cause.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({ success: false, message: 'Cause not found' });
    }

    cause = await Cause.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: cause });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete cause
// @route   DELETE /api/causes/:id
// @access  Private (Admin)
export const deleteCause = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({ success: false, message: 'Cause not found' });
    }

    await cause.deleteOne();
    res.json({ success: true, message: 'Cause removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
