import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("user-session")?.value;
  const url = request.nextUrl.clone();

  // Allow users without a session to access the login page or redirect to login if necessary
  // Students will never have a session
  if (!sessionCookie) {
    if (url.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const session = JSON.parse(sessionCookie);
    const role = session.user.role;

    // Prematurely check if user can access certain routes based on role to avoid hitting the DB multiple times

    // If the user is visiting the login page, redirect them to their respective dashboard
    if (["/", "/login"].includes(url.pathname)) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      if (role === "lecturer") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    // Ensure admins are redirected to the admin dashboard if visiting non-admin dashboard or root url
    if (
      role === "admin" &&
      (url.pathname.startsWith("/dashboard") || url.pathname === "/admin")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Lecturers accessing admin routes are redirected to the general dashboard
    if (role === "lecturer" && url.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // User allowed on route -> Check token validity
    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/check-token/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.token,
        },
      }
    );

    // Token invalid, redirect to login and delete cookie
    if (!response.ok) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("user-session");
      return res;
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Error in middleware:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Don't match essential routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
