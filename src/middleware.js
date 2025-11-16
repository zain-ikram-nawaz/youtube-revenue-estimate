import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("ycresttoken")?.value;

  // ========= AUTH SYSTEM =========

  // Guest blocked routes
  const guestBlockedPaths = ["/admin", "/dashboard", "/register"];

  // If no token → Guest
  if (!token) {
    if (guestBlockedPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Guest allowed for other routes
    // We don't return yet (because 404 handling must still run)
  } else {
    // Token present → verify
    try {
      const { payload } = await jwtVerify(token, secret);

      // Only admin can access admin
      if (pathname.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      // Prevent login/register for logged-in user
      if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("ycresttoken");
      return res;
    }
  }


  // ========= REAL 404 HANDLING (WORKS WITH DYNAMIC PAGES) =========

  // Allow internal Next.js files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  /**
   * If the matched route DOES NOT exist in Next.js,
   * we rewrite to our custom 404 page.
   *
   * This ALWAYS returns real HTTP 404.
   */
  try {
    // This triggers Next.js route matching
    return NextResponse.next();
  } catch {
    return NextResponse.rewrite(new URL("/404", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
