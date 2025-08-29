# XanderAI Setup Script for Windows PowerShell

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  XanderAI Environment Setup      " -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (Test-Path .env.local) {
    Write-Host "✓ .env.local file found" -ForegroundColor Green
} else {
    Write-Host "Creating .env.local with placeholder values..." -ForegroundColor Yellow
    
    $envContent = @"
# Supabase Configuration (Using placeholders for build)
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key-for-build

# Add your real values when available:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Clerk Authentication (Optional)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
# CLERK_SECRET_KEY=your-clerk-secret
"@
    
    $envContent | Out-File -FilePath .env.local -Encoding UTF8
    Write-Host "✓ Created .env.local with placeholder values" -ForegroundColor Green
    Write-Host "  (Update with real values when available)" -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!                 " -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Update .env.local with your real Supabase credentials" -ForegroundColor Gray
Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor Gray
Write-Host "3. Visit http://localhost:3000 to see your app" -ForegroundColor Gray
Write-Host ""
Write-Host "For production build: npm run build" -ForegroundColor DarkGray
Write-Host ""

