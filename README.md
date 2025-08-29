# XanderAI - Enterprise AI Workforce Platform

## 🚀 Overview

XanderAI is an enterprise-grade AI workforce management platform that enables businesses to deploy, manage, and scale AI agents across their organization. Built with Next.js 15, TypeScript, and Supabase authentication.

## 📁 Project Structure

```
xaimainapp/
├── src/                     # Source code directory
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── administration/ # Admin dashboard pages
│   │   ├── auth/           # Auth API routes (callback, signout)
│   │   ├── authentication/ # Login/signup/onboarding pages
│   │   ├── company/        # Company management (teams, workflows)
│   │   ├── intelligence/   # Analytics and reporting
│   │   ├── platform/       # Main platform pages
│   │   ├── recap/          # User recap/summary pages
│   │   └── tools/          # AI tools and workspace
│   ├── components/          # Reusable React components
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI component library
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Core libraries and utilities
│   └── utils/              # Utility functions and helpers
│       └── supabase/       # Supabase client configurations
├── public/                  # Static assets
├── middleware.ts           # Next.js middleware for auth
└── next.config.ts          # Next.js configuration
```

## 🔧 Tech Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5.9.2
- **Authentication**: Supabase Auth (SSR)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS 4.1.12 (alpha)
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: React hooks + Context
- **Charts**: Recharts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Key Features

### Platform Features
- **AI Agent Management**: Deploy and manage AI agents across departments
- **Team Collaboration**: Create teams and assign AI agents
- **Workflow Builder**: Visual workflow creation for AI automation
- **Analytics Dashboard**: Real-time performance metrics and insights
- **Cost Tracking**: Monitor AI usage and cost savings

### Technical Features
- **Server-Side Rendering (SSR)**: Fast initial page loads with Next.js 15
- **Type Safety**: Full TypeScript support
- **Authentication**: Secure auth with Supabase (email/password)
- **Protected Routes**: Middleware-based route protection
- **Responsive Design**: Mobile-first responsive UI
- **Dark Mode**: Built-in dark theme support

## 📝 Development Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🗂️ Main Application Routes

### Public Routes
- `/` - Landing page
- `/authentication/login` - User login
- `/authentication/signup` - User registration

### Protected Routes (Requires Authentication)
- `/platform/dashboard` - Main dashboard
- `/platform/overview` - Platform overview
- `/company/teams` - Team management
- `/company/workflows` - Workflow builder
- `/tools/agent-plan` - AI agent planner
- `/tools/workspace` - AI workspace
- `/intelligence/analytics` - Analytics dashboard
- `/administration/*` - Admin settings

## 🔐 Authentication Flow

1. User signs up with email/password
2. Email confirmation sent via Supabase
3. User confirms email through callback route
4. Session stored in secure httpOnly cookies
5. Middleware handles session refresh
6. Protected routes check authentication status

## 🏗️ Architecture Decisions

### Why src/ folder structure?
- Better organization and separation of source code from config
- Cleaner project root
- Industry standard for large-scale applications

### Why Supabase?
- Built-in authentication with SSR support
- Real-time capabilities
- PostgreSQL database
- Row Level Security (RLS)
- Cost-effective for scaling

### Why App Router?
- Better performance with React Server Components
- Simplified data fetching
- Built-in layouts and loading states
- Improved routing with parallel routes

## 🤝 Contributing

This is a private enterprise application. For internal contributors:

1. Create a feature branch from `main`
2. Make your changes following the code style
3. Test thoroughly including auth flows
4. Submit a pull request with detailed description

## 📄 License

Proprietary - XanderAI © 2025. All rights reserved.

## 📞 Support

For internal support, contact the development team or create an issue in the internal tracker.

---

Built with ❤️ by the XanderAI Team
