import mongoose from 'mongoose';

const causeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a cause title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a unique slug'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    tagline: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    categories: {
      type: [String],
      default: ['all'],
      index: true,
    },
    unitPrice: {
      type: Number,
      required: [true, 'Please provide unit price'],
      min: 0,
    },
    unitLabel: {
      type: String,
      default: 'Unit',
      trim: true,
    },
    currency: {
      type: String,
      default: '₹',
    },
    targetAmount: {
      type: Number,
      default: 100000,
    },
    raisedAmount: {
      type: Number,
      default: 0,
    },
    donorCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Please provide cause card image URL'],
    },
    bannerImage: {
      type: String,
      default: '',
    },
    whatsappShareText: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Cause = mongoose.model('Cause', causeSchema);
