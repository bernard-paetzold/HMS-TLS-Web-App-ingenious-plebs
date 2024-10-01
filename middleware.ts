import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

/* 
  At the momement the middleware requests the user's info on every route
  to validate whether or not they have access to that route. This serves
  the purpose and will not hinder us in development but should be optimized
  for production.
*/

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();

  // Allow users without a token to access the login page or redirect to login if necessary
  if (!token) {
    if (url.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users/edit/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    // Request failed, redirect to login and delete cookie
    if (!response.ok) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("token");
      return res;
    }

    // User authenticated
    const user = await response.json();

    // If the user is visiting the login page, redirect them to their respective dashboard
    if (["/", "/login"].includes(url.pathname)) {
      if (user.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      if (user.role === "lecturer") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      // Students should be denied access
      if (user.role === "student") {
        await fetch(`${process.env.BACKEND_URL}/auth/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const res = NextResponse.redirect(new URL("/login", request.url));
        res.cookies.delete("token");
        return res;
      }
    }

    // Ensure admins are redirected to the admin dashboard if visiting non-admin dashboard or root url
    if (
      user.role === "admin" &&
      (url.pathname.startsWith("/dashboard") || url.pathname === "/admin")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Non-admins accessing admin routes are redirected to the general dashboard
    if (user.role !== "admin" && url.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
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
