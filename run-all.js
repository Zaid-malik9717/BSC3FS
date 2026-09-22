import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('\n=============================================================');
console.log('🌸 Starting Flora Sky Bloom Studio (Backend & Frontend)...');
console.log('=============================================================\n');

// 1. Start Backend
const backendDir = path.join(__dirname, 'stitch_sky_bloom_studio', 'backend');
const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

// 2. Start Frontend
const frontendDir = path.join(__dirname, 'stitch_sky_bloom_studio', 'Frontend');
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

backend.on('error', (err) => console.error('[Backend Process Error]:', err));
frontend.on('error', (err) => console.error('[Frontend Process Error]:', err));

function shutdown() {
  console.log('\n🛑 Stopping servers...');
  backend.kill();
  frontend.kill();
  process.exit();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
