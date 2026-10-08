# 🌟 Thaagam Foundation Web App & Admin Portal

This repository contains the complete frontend and backend for the **Thaagam Foundation NGO Web Application**.

---

## 🏗️ Architecture & Tech Stack

- **Frontend**: React 18, Vite 8, React Router v7, Vanilla CSS, Splide.js
- **Backend**: Node.js (ES Modules), Express.js, MongoDB (Mongoose)
- **Authentication**: JWT & Bcrypt for Admin control
- **Seeded Data**: 34 realistic causes across 9 categories + 5 packages matching the original thaagam.org design.

---

## 🚀 How to Run Locally

### 1. Start MongoDB
Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017/` (or update `backend/.env` with your Mongo Atlas URI).

### 2. Start Backend Server
```bash
cd backend
npm install
npm run seed     # (Only needed once: seeds 34 causes, 5 packages & superadmin user)
npm run dev      # Runs with nodemon on http://localhost:5000
```

### 3. Start Frontend App
```bash
cd frontend
npm install
npm run dev      # Runs Vite dev server on http://localhost:5173
```

---

## 🔑 Admin Portal Credentials

- **Admin Login Route**: `http://localhost:5173/admin/login`
- **Admin Dashboard**: `http://localhost:5173/admin/dashboard`
- **Default Email**: `admin@thaagam.org`
- **Default Password**: `adminthaagam123`
*(A convenient one-click "Click to Fill Default Credentials" button is provided on the login page for quick access!)*

---

## 🎯 Features Implemented

1. **Dynamic Home Page Causes (`/`)**:
   - Live causes dynamically fetched from MongoDB via `GET http://localhost:5000/api/causes`.
   - Category filtering (`All`, `Packages`, `Food`, `Birthday`, `Environment`, `Animals`, `Education`, `Orphanage`, `Healthcare`, `Livelihood`).
   - Packages tab displays interactive package cards.
   - Live search input filters causes by title, tagline, and description.
   - Retains 100% of thaagam.org's original structure, styles, classes, and micro-interactions.

2. **Admin Dashboard Portal (`/admin/dashboard`)**:
   - **Metrics Overview**: Real-time counter of total causes, active causes, packages, and database connection.
   - **Causes Management**: View all causes with thumbnails, titles, price, unit label, and category tags.
   - **Live Active Toggle**: One-click status switch to show or hide any campaign on the live website.
   - **Add New Cause Form / Modal**: Create new campaigns with title, auto-slug generator, unit price, label, image URL, categories, and active status.
   - **Edit Cause**: Modify existing causes in real-time.
   - **Delete Cause**: Delete outdated or finished campaigns.
   - **Package Management**: Add/edit package cards displayed under the Homepage Packages tab.
   - **Category Analytics**: Progress bars visualizing cause inventory across categories.
