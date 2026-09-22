import app from './app.js';
import { config } from './config/env.js';
import { connectDB } from './config/database.js';
import mongoose from 'mongoose';

const PORT = config.port;

const server = app.listen(PORT, async () => {
  console.log(`\n=================================================`);
  console.log(`🌸 Flora Sky Bloom Studio Backend is running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🌿 Health: http://localhost:${PORT}/api/health`);
  console.log(`💐 Products API: http://localhost:${PORT}/api/products`);
  console.log(`📦 Orders API: http://localhost:${PORT}/api/orders`);
  console.log(`⚙️  Environment: ${config.nodeEnv}`);
  console.log(`=================================================\n`);

  // Initialize MongoDB connection
  await connectDB();
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} signal received: closing HTTP server and database connections`);
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('🍃 MongoDB connection closed.');
  }
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
