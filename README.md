# XanderAI - Enterprise AI Workforce Platform

XanderAI is a comprehensive platform designed to help enterprises leverage AI to enhance team productivity and reduce operational costs.

## Features

- **AI Teams Management**: Create, monitor, and optimize AI-powered teams
- **Analytics Dashboard**: Track performance and efficiency metrics
- **Intelligent Tools**: Built-in AI-powered tools for various workflows
- **Company Management**: Organize your enterprise with team and user management
- **Authentication**: Secure login and user management with Clerk

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
xaimainapp/
├── app/                    # Next.js App Router
│   ├── administration/     # Admin settings and controls
│   ├── authentication/     # Auth pages (login, signup, onboarding)
│   ├── company/            # Company structure (teams, members, workflows)
│   ├── intelligence/       # AI intelligence features
│   ├── platform/           # Main platform pages
│   └── tools/              # Specialized tools and utilities
├── components/             # React components
│   ├── auth/               # Authentication components
│   ├── blocks/             # Reusable content blocks
│   ├── dashboard/          # Dashboard-specific components
│   ├── hooks/              # Component-specific hooks
│   ├── transitions/        # Animation components
│   └── ui/                 # UI component library
├── hooks/                  # Application hooks
├── lib/                    # Utility functions and libraries
├── public/                 # Static assets
└── styles/                 # Global styles
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Clerk](https://clerk.dev/) - Authentication
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Recharts](https://recharts.org/) - Chart components
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

## Development Guidelines

1. Follow the established component structure
2. Maintain consistent styling using the Tailwind classes
3. Reuse UI components from the component library
4. Keep pages organized within their functional areas

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
