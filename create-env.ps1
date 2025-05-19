# Clerk environment variables
# Replace these with your actual Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Set the URL for the sign-in, sign-up, and after sign-in pages
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/authentication/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/authentication/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/authentication/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/authentication/onboarding

$content = @"
# Clerk environment variables
# Replace these with your actual Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Set the URL for the sign-in, sign-up, and after sign-in pages
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/authentication/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/authentication/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/authentication/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/authentication/onboarding
"@

Set-Content -Path ".env.local" -Value $content
Write-Host ".env.local file created successfully" 