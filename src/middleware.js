import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("ycresttoken")?.value;

  // Guest blocked routes
  const guestBlockedPaths = ["/admin", "/dashboard", "/register"];

  // 🔹 If no token → Guest
  if (!token) {
    // Agar guest kisi blocked route pe gaya → redirect to login
    if (guestBlockedPaths.some((path) => pathname.startsWith(path))) {
      // console.log("🚫 Guest tried to access restricted page:", pathname);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Guest ko baqi sab routes allow
    return NextResponse.next();
  }

  // 🔹 If token present → Verify it
  try {
    const { payload } = await jwtVerify(token, secret);
    // console.log("✅ Verified Token Payload:", payload);

    // 👑 Only admin can access admin routes
    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      // console.log("🚫 Non-admin tried to access admin route:", pathname);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Already logged in → prevent login/register
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    // console.log("❌ Invalid token:", err.message);
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
