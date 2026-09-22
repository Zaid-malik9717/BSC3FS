# How to Run Flora Sky Bloom Studio (Backend & Frontend)

This guide shows you how to run both the **Backend API** and **Frontend UI** together.

---

## 📍 Current Status

Both servers are **currently running** on your laptop:
- 🌸 **Frontend**: [http://localhost:5173](http://localhost:5173)
- 🌿 **Backend API**: [http://localhost:5000](http://localhost:5000) (Health: [http://localhost:5000/api/health](http://localhost:5000/api/health))

---

## 📁 Project Directory Structure

```
BSC3/
├── package.json                       <-- Root runner
├── run-all.js                         <-- Concurrently runs both
├── start-all.bat                      <-- Double-click to launch both
├── start-backend.bat                  <-- Double-click to launch backend
├── start-frontend.bat                 <-- Double-click to launch frontend
└── stitch_sky_bloom_studio/
    ├── backend/                       <-- Express.js REST API
    │   ├── src/
    │   ├── data/
    │   └── package.json
    └── Frontend/                      <-- React + Vite App
        ├── src/
        └── package.json
```

---

## 🚀 Method 1: Single Command from Root (Recommended)

Open a terminal in `c:\Users\DELL\Downloads\AI Even SEM\BSC3` and run:

```bash
npm run dev
```
*(This uses `run-all.js` to concurrently start both the backend on port 5000 and the frontend on port 5173).*

---

## 🖱️ Method 2: Double-Click Batch File (Easiest for Windows)

In Windows File Explorer, navigate to `c:\Users\DELL\Downloads\AI Even SEM\BSC3`:
- Double-click **`start-all.bat`**
- Two command prompt windows will automatically open:
  - Window 1: **Backend Server** on `http://localhost:5000`
  - Window 2: **Frontend Dev Server** on `http://localhost:5173`

---

## 💻 Method 3: Running Separately in Two Terminals

If you want to run each server in its own terminal window:

### Terminal 1: Backend Server
```powershell
cd "stitch_sky_bloom_studio\backend"
npm run dev
```
> Server starts on `http://localhost:5000`

### Terminal 2: Frontend Client
```powershell
cd "stitch_sky_bloom_studio\Frontend"
npm run dev
```
> Client starts on `http://localhost:5173`

---

## 🧪 Testing the APIs

You can test the backend endpoints directly in your browser or PowerShell:

- **Health Check**: `http://localhost:5000/api/health`
- **Product Catalog**: `http://localhost:5000/api/products`
- **Single Product**: `http://localhost:5000/api/products/cloud-blue-hydrangea`
- **Builder Options**: `http://localhost:5000/api/builder/options`
- **Active Promos**: `http://localhost:5000/api/promos`
- **Orders List**: `http://localhost:5000/api/orders`
