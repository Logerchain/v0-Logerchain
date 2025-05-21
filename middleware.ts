import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/signin",
  "/signup",
  "/about",
  "/contact",
  "/product", // Main product listing page remains public
]

// Check if the path matches any of the public routes
const isPublicRoute = (path: string) => {
  return publicRoutes.some((route) => {
    // Exact match for root and authentication routes
    if (route === path) return true
    // For other routes, check if the path starts with the route
    return path.startsWith(route) && (path === route || path.charAt(route.length) === "/")
  })
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the user is authenticated by looking for the isLoggedIn cookie
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true"

  // If the route is not public and the user is not logged in, redirect to signin
  if (!isPublicRoute(pathname) && !isLoggedIn) {
    // Create the redirect URL with the original path as a query parameter
    // Note: After sign-in/sign-up, users will be redirected to the home page
    // but we keep the redirect parameter for potential future use
    const redirectUrl = new URL("/signin", request.url)
    redirectUrl.searchParams.set("redirect", pathname)

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
}
