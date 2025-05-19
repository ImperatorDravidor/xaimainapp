import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define which routes should be protected (require authentication)
const isProtectedRoute = createRouteMatcher([
  '/platform/(.*)',
  '/intelligence/(.*)',
  '/company/(.*)',
  '/tools/(.*)',
  '/administration/(.*)',
  '/recap',
  '/authentication/onboarding'
])

// Define which routes should be accessible only to non-authenticated users
const isAuthRoute = createRouteMatcher([
  '/authentication/login',
  '/authentication/signup'
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  const path = new URL(req.url).pathname

  // For protected routes, redirect to login if not authenticated
  if (isProtectedRoute(req) && !userId) {
    const loginUrl = new URL('/authentication/login', req.url)
    loginUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute(req) && userId) {
    // Always send users to dashboard when they're already logged in
    return NextResponse.redirect(new URL('/platform/dashboard', req.url))
  }

  // Home page should not auto-redirect
  // We should assume logged-out state by default, so no redirection

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
} 