# Supabase Authentication Setup

## Important: Environment Variables Required

To complete the Supabase authentication setup for this project, you need to add the following environment variables to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or your production URL
```

## Getting Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Go to Settings > API
4. Copy your Project URL and anon public key

## Database Setup

Your Supabase project is configured to use the built-in Auth schema. The authentication system will automatically:
- Create user accounts in the `auth.users` table
- Handle email confirmation
- Manage sessions with secure cookies

## Optional: Profile Table

If you want to store additional user profile information, you can create a profiles table:

```sql
-- Create a table for public profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,

  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING ((SELECT auth.uid()) = id);

-- Trigger to create profile on signup
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Authentication Features

The application now includes:
- ✅ Email/Password authentication
- ✅ Protected routes with middleware
- ✅ Session management with cookies
- ✅ Sign up with email confirmation
- ✅ Sign in/Sign out functionality
- ✅ User profile in navigation
- ✅ Protected admin and platform routes

## Testing the Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000
3. Click on "Sign In" to create a new account
4. Check your email for the confirmation link
5. Once confirmed, you'll be able to access protected routes

## Email Templates (Optional)

To customize the email templates in Supabase:
1. Go to Authentication > Email Templates in your Supabase dashboard
2. Customize the confirmation email template
3. Update the redirect URL to match your site

## Security Notes

- The middleware automatically refreshes expired auth tokens
- Sessions are stored in secure, httpOnly cookies
- All protected routes require authentication
- The anon key is safe to use in the browser (it's meant to be public)
- Never expose your service role key in client-side code

## Troubleshooting

If you encounter issues:
1. Ensure your Supabase project is running
2. Check that environment variables are correctly set
3. Verify email settings in Supabase dashboard
4. Check browser console for error messages
5. Ensure cookies are enabled in your browser

## Next Steps

1. Add your Supabase credentials to `.env.local`
2. Test the authentication flow
3. Optionally set up the profiles table for extended user data
4. Configure email templates in Supabase dashboard
5. Deploy to production with proper environment variables

