@echo off
title Flora Sky Bloom Studio - Full Stack App
echo =============================================================
echo Starting Flora Sky Bloom Studio (Backend + Frontend)
echo =============================================================
echo.

start "Flora Backend API (Port 5000)" cmd /k "cd stitch_sky_bloom_studio\backend && npm run dev"
timeout /t 2 >nul
start "Flora Frontend UI (Port 5173)" cmd /k "cd stitch_sky_bloom_studio\Frontend && npm run dev"

echo.
echo Both servers started!
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000
echo =============================================================
pause
