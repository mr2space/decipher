import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import { logger } from '../logger.js';

configDotenv();

const mongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
    logger.info("Connected to MongoDB");
  } catch (error) {
    console.error('Database connection error: ', error);
    logger.error(`MongoDB connection error: ${error.message}`);
  }
};

export { mongo };
