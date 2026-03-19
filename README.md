# X2X Creative Portfolio & AI Hub

A high-performance, modern web application built with **Next.js**, **React 19**, and **TypeScript**. This project serves as a professional portfolio, a Markdown-driven blog, and a sophisticated AI-powered chat platform. Designed with a focus on visual impact, technical rigor, and seamless user experience.

---

## 🚀 Core Features

### 🤖 X2X Assistant (AI Chat System)
- **Real-time Streaming**: Powered by `openai-edge-stream` for instantaneous AI responses (OpenAI GPT-4o integration).
- **Session Persistence**: Full chat history stored in **MongoDB**, allowing users to revisit previous conversations.
- **Context-Aware Conversations**: Implements a sliding window memory (last 10 messages) for coherent, multi-turn dialogues.
- **Edge Runtime Optimized**: API routes utilize Next.js Edge Runtime for minimal latency and high scalability.
- **Markdown Rendering**: Support for full Markdown formatting in AI responses via `react-markdown` with syntax highlighting.

### 🎨 Immersive UI & Visuals
- **Interactive 3D Backgrounds**: High-performance particle systems and wave effects built with **Three.js** and **OGL**.
- **Advanced Animations**: Fluid UI transitions and complex state-driven animations using **Framer Motion** and **React Spring**.
- **Dynamic 3D Typography**: Custom-built 3D rotating text hero section with perspective-aware CSS transformations.
- **Glassmorphism & Modern Styling**: Sophisticated design language using **Tailwind CSS 4**, featuring custom gradients and frosted-glass effects.

### 📁 Dynamic Portfolio & Blog Engines
- **Markdown-Driven Content**: Entire project showcase and blog are powered by Markdown files with **Gray-Matter** front-matter parsing.
- **Category Filtering**: Interactive project filtering system (Frontend, Backend, Tools, etc.) with animated transitions.
- **SSG & ISR**: Optimized performance using **Static Site Generation** and **Incremental Static Regeneration** (revalidating every hour).
- **Rich Media Support**: Integrated project modals for detailed case studies and technical breakdowns.

### 🔐 Enterprise-Grade Security
- **Auth0 Integration**: Secure authentication and Single Sign-On (SSO) via `@auth0/nextjs-auth0`.
- **Role-Based Access Control (RBAC)**: Custom middleware and hook-based role validation (e.g., "Member" role requirement for full AI features).
- **Protected API Routes**: Secure backend communication with session-based validation.

---

## 🛠️ Technical Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Next.js 16 (Pages Router), TypeScript 5, Tailwind CSS 4 |
| **UI Components** | Radix UI, Flowbite React, Lucide React, FontAwesome 7 |
| **State & Motion** | Framer Motion, React Spring |
| **3D & Graphics** | Three.js, OGL, Vanta.js |
| **Backend & AI** | OpenAI API, openai-edge-stream, MongoDB 7, Next.js Edge Runtime |
| **Authentication** | Auth0 (`@auth0/nextjs-auth0`) |
| **Content** | Markdown (Remark/Rehype), Gray-Matter |
| **Utilities** | clsx, tailwind-merge, class-variance-authority, date-fns, uuid |
| **Testing** | Vitest 4, React Testing Library, jsdom |

---

## 🏗️ Engineering Excellence

- **TypeScript First**: Strict type safety across the entire codebase for robust development.
- **Component-Driven Architecture**: Modular, reusable UI components using **Radix UI** primitives and **Flowbite React**.
- **Performance Focused**:
    - Optimized font loading with `next/font/google` (Geist).
    - Dynamic imports for heavy 3D components to minimize initial bundle size.
    - Efficient API communication via Edge functions.
- **Testing Suite**: Unit and component testing with **Vitest 4** and **React Testing Library**, with coverage reporting via `@vitest/coverage-v8`.
- **Weather Integration**: Dynamic ISR-based weather widget fetching real-time data for a personalized dashboard feel.

---

## 📁 Project Structure

```txt
├── components/          # Reusable UI components (Atomic design)
│   ├── chats/           # AI Chat specific components
│   ├── projects/        # Portfolio showcase components
│   └── ui/              # Base UI primitives (Radix/Flowbite)
├── pages/               # Next.js Page Router (Dynamic & Static)
│   ├── api/             # Backend API routes (Chat, Auth, Utils)
│   └── chats/           # Protected AI Hub routes
├── lib/                 # Core logic, DB clients, and utility functions
├── posts/               # Blog content (Markdown)
├── projects/            # Project case studies (Markdown)
├── public/              # Static assets and images
├── hooks/               # Custom React hooks
└── __tests__/           # Vitest test suites
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- MongoDB instance (local or Atlas)
- Auth0 account
- OpenAI API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/next-playground.git
   cd next-playground
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory:
   ```env
   # OpenAI
   OPENAI_API_KEY=

   # MongoDB
   MONGODB_URI=

   # Auth0
   AUTH0_SECRET=
   AUTH0_BASE_URL=
   AUTH0_ISSUER_BASE_URL=
   AUTH0_CLIENT_ID=
   AUTH0_CLIENT_SECRET=
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

This project uses **Vitest** and **React Testing Library**.

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Test files are located in `__tests__/` and follow the `*.test.tsx` naming convention.

---

## 📦 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |

---

## 👨‍💻 Author

**Chris (Yujun) Xiong**
Full Stack Developer | Creative Programmer