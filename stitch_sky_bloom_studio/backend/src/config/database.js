import mongoose from 'mongoose';
import { config } from './env.js';

let isConnected = false;

const readyStateMap = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
};

export const getDatabaseStatus = () => {
  const stateCode = mongoose.connection.readyState;
  return {
    state: readyStateMap[stateCode] || 'unknown',
    isConnected: stateCode === 1,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null
  };
};

export const connectDB = async () => {
  const uri = config.mongodbUri;

  if (!uri) {
    console.warn('⚠️  MONGODB_URI is not defined in environment variables.');
    return;
  }

  if (uri.includes('<db_password>')) {
    console.warn('\n⚠️  -------------------------------------------------------------');
    console.warn('⚠️  MongoDB Connection Warning:');
    console.warn('⚠️  Your MONGODB_URI still contains the placeholder "<db_password>".');
    console.warn('⚠️  Please replace "<db_password>" with your MongoDB Atlas password');
    console.warn('⚠️  in stitch_sky_bloom_studio/backend/.env');
    console.warn('⚠️  -------------------------------------------------------------\n');
  }

  try {
    mongoose.connection.on('connected', () => {
      isConnected = true;
      console.log(`🍃 MongoDB Connected: ${mongoose.connection.host} / ${mongoose.connection.name}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Connection Error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('⚠️  MongoDB Disconnected.');
    });

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    if (uri.includes('<db_password>')) {
      console.error('💡 Hint: Check stitch_sky_bloom_studio/backend/.env and provide the actual password.');
    }
  }
};

export default connectDB;
