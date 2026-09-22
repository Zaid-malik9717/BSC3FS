import os from 'os';
import { getDatabaseStatus } from '../config/database.js';

export const healthController = {
  check(req, res) {
    const dbStatus = getDatabaseStatus();
    res.json({
      status: 'healthy',
      service: 'Flora Sky Bloom Studio API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: dbStatus,
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
      }
    });
  }
};
