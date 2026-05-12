# Prep AI Agent – Frontend

React + Vite + TypeScript + Tailwind CSS frontend for an AI-powered interview preparation platform.  
Upload your resume, add a job description, and get a personalised interview report including match score, technical/behavioral questions, skill gaps, and a preparation plan.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Login/register with access token (stored in memory) & refresh token (HTTP‑only cookie)
- 📄 **Resume Upload** – PDF upload with preview
- 🤖 **AI Report Generation** – Display interactive report cards
- 📱 **Responsive UI** – Tailwind CSS, mobile-first design
- 🧩 **Feature‑Based Architecture** – Scalable folder structure
- ⚡ **Fast Development** – Vite + HMR + TypeScript
- 🛡️ **Protected Routes** – Authenticated views only

---

## 📦 Tech Stack

| Category       | Technology                               |
|----------------|------------------------------------------|
| Framework      | React 18 + Vite                          |
| Language       | TypeScript                               |
| Styling        | Tailwind CSS + tailwind-merge            |
| State Management | Zustand (auth store)                   |
| HTTP Client    | Axios (interceptors, withCredentials)    |
| Routing        | React Router v6 (createBrowserRouter)    |
| Forms & Validation | React Hook Form + Zod                |
| Notifications  | React Hot Toast                          |
| Icons          | Lucide React                             |
| Data Fetching  | Tanstack Query                           |

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn or bun

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/swapnilz07/interview-prep-ai-client.git
   cd interview-prep-ai-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access application**
   Open http://localhost:3000 in your browser

## Folder Structure

```
src/
├── components/              # Reusable components
├── features/               # Feature-based modules
├── shared/                 # Shared utilities & config
├── store/                  # Zustand stores
├── hooks/                  # Custom React hooks
├── lib/                    # Library functions
└── App.tsx                 # Root component
```
---

**Built with ❤️ using React and Vite**

**Author:** Swapnil Zakade