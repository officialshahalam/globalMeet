import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'

// ****************************************** PROTECT Specific Route *********************
// const protectedRoute=createRouteMatcher([
//   '/',
//   '/upcoming',
//   '/meeting(.*)',
//   '/previous',
//   '/recordings',
//   '/personal-room',
// ]);

// export default clerkMiddleware(
//   async(auth, request) => {
//       if (protectedRoute(request)) {
//          await auth.protect();
//       }
//   }
// )


// ****************************************** PROTECT All Route *********************
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)','/']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}