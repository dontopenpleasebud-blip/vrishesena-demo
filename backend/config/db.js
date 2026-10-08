import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vrishasena_db');
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Please ensure MongoDB is running locally (mongod) or provide a valid MONGODB_URI in backend/.env');
  }
};
