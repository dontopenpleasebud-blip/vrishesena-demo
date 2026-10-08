import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a package title'],
      trim: true,
    },
    packageId: {
      type: Number,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
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

export const Package = mongoose.model('Package', packageSchema);
