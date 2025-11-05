// Import Clerk middleware and helper for defining public routes
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// clerkMiddleware: handles authentication and session verification on the server side
// createRouteMatcher: helps define which routes are public or require special roles

import { NextResponse } from 'next/server';
// NextResponse: utility from Next.js for returning responses like redirects

// Define which routes are public (do not require authentication)
const isPublicRoute = createRouteMatcher([
  '/', // Homepage - accessible by anyone
  '/sign-in(.*)', // Sign-in page and all subroutes (e.g., /sign-in/xyz)
  '/sign-up(.*)', // Sign-up page and all subroutes
]);

// Define which routes are admin-only
const isAdminRoute = createRouteMatcher(['/upload']);
// /upload page will only be accessible to users with role 'admin'

// Export the default middleware configuration
export default clerkMiddleware(async (auth, req) => {
  // Get session claims (information from JWT about the user)
  const { sessionClaims } = await auth();

  // Determine if the current user is an admin
  const isAdmin = sessionClaims?.metadata?.role === 'admin';
  // Optional chaining ?. prevents errors if sessionClaims or metadata are undefined

  // If the route is admin-only and the user is NOT admin
  if (isAdminRoute(req) && !isAdmin) {
    const url = new URL('/', req.url);
    // Redirect non-admin users to homepage
    return NextResponse.redirect(url);
  }

  // Check if the incoming request does NOT match any public routes
  if (!isPublicRoute(req)) {
    // If it's not public, protect the route — only authenticated users can access it
    await auth.protect();
    // Automatically redirects unauthenticated users to the sign-in page
  }

  // If none of the above conditions match, the request continues normally
});

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    // Run middleware for all routes EXCEPT:
    // - Next.js internal routes (/_next)
    // - Static assets like HTML, CSS, JS, images, fonts, etc.
    // The regex below ensures those files are skipped for performance
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always apply the middleware to API routes (both /api/* and /trpc/*)
    // This ensures that API endpoints are also protected if needed
    '/(api|trpc)(.*)',
  ],
};
