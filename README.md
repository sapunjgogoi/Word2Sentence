# Word2Sentence — AI-Powered Vocabulary Learning Platform

Word2Sentence is a full-stack, gamified vocabulary learning platform designed to help users systematically build and retain their English vocabulary. Through curated daily words, active sentence construction, real-time feedback, streaks, quizzes, and spelling challenges, the platform transforms vocabulary study into a premium, interactive daily habit.

---

## 🚀 Key Features

*   **Custom User Tracks**: Choose between *Beginner*, *Intermediate*, *Advanced*, or *IELTS* focus levels.
*   **Daily Word System**: Handpicked words aligned with your level featuring definitions, origins, example sentences, IPA notation, and images.
*   **Sentence Challenge**: Construct your own daily sentence using the Word of the Day to build active language usage.
*   **Streak & Gamification**: Earn Experience Points (XP), collect streak days, and access streak recovery windows.
*   **Spelling Bee & Pronunciation Practice**: Interactive text-to-speech audio spelling challenges and client-side voice pronunciation testing.
*   **Centralized API Integrity**: Clean validation patterns, standardized JSON response outputs, and centralized Express error handling.

---

## 🛠️ Technology Stack

*   **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Framer Motion
*   **Backend**: Node.js, Express, JWT Stateless Authentication, Bcrypt Hashing, Express Rate Limits
*   **Database**: MongoDB Atlas (Mongoose ODM)
*   **Styling**: Premium Glassmorphic Design, curated HSL dark mode, Outfit and JetBrains typography

---

## 📂 Project Structure

```text
Word2Sentence/
 ├── backend/
 │    ├── config/           # MongoDB configuration
 │    ├── controllers/      # Route controllers (Auth, etc.)
 │    ├── middleware/       # JWT verifications & Error handler
 │    ├── models/           # Mongoose Database Models (User)
 │    ├── routes/           # Endpoint mappings
 │    ├── utils/            # Async helpers (asyncHandler)
 │    ├── .env
 │    └── server.js
 └── frontend/
      ├── src/
      │    ├── context/     # React state Context (AuthContext)
      │    ├── pages/       # Dashboard, Register, Login views
      │    ├── services/    # Axios client instance (api.js)
      │    ├── App.jsx      # Navigation routing guards
      │    └── index.css    # Custom CSS variables & glass panels
      ├── .env
      └── vite.config.js
```

---

## ⚡ Setup & Installation

### Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed.

### 1. Database & Server Configuration
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install server-side dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your parameters:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```
4. Start the Express development server:
   ```bash
   npm run dev
   ```

### 2. Client Application Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install UI dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Copy `.env.example` to `.env` and map your API endpoint:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Spin up the Vite dev server:
   ```bash
   npm run dev
   ```
5. Open your web browser to `http://localhost:5173`.
