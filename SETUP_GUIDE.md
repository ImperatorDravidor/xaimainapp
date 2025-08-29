# Quick Setup Guide for XanderAI

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- A Supabase account (free tier works)
- Git (for version control)

## Step 1: Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Getting Supabase Credentials:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (or use existing)
3. Navigate to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 4: First Time Setup

1. Visit the signup page
2. Create an account with your email
3. Check your email for confirmation
4. Click the confirmation link
5. You're ready to use the platform!

## Project Structure

The project uses a `src/` folder structure:

```
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable React components
├── hooks/        # Custom React hooks
├── lib/          # Core libraries
└── utils/        # Utilities (including Supabase clients)
```

## Common Issues

### Build Errors

If you encounter build errors related to authentication:
- Ensure your `.env.local` file exists with valid Supabase credentials
- The build process needs environment variables even for static generation

### Authentication Not Working

- Check that your Supabase project is active
- Verify email settings in Supabase dashboard (Authentication → Email Templates)
- Ensure cookies are enabled in your browser

### Port Already in Use

If port 3000 is busy, the dev server will use 3001. Update `NEXT_PUBLIC_SITE_URL` accordingly.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. Explore the dashboard at `/platform/dashboard`
2. Create teams at `/company/teams`
3. Build workflows at `/company/workflows`
4. View analytics at `/intelligence/analytics`

## Support

For issues or questions, refer to the main README.md or contact the development team.

