# Word2Sentence — Frontend Web Client

This is the React + Vite single-page application client for the **Word2Sentence** vocabulary platform. It utilizes Tailwind CSS, custom glassmorphism components, and Framer Motion micro-animations to deliver a modern, premium design aesthetic.

---

## 🚀 Getting Started

### 1. Installation
Navigate to this directory and install dependencies:
```bash
npm install --legacy-peer-deps
```

### 2. Environment Variables
Create a local `.env` file mapping to your API port (by default `5000`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Development Server
Run the local hot-reloading development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Code Formatting & Linting
Enforce style and code quality rules:
*   Lint: `npm run lint`
*   Auto-Format: `npm run format`

### 5. Production Build
Prepare build artifacts for static hosting deployment:
```bash
npm run build
```
The compiled files will compile into the `dist/` directory.
