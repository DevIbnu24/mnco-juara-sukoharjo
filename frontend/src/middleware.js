import { NextResponse } from "next/server";

export function middleware(request) {
  // Hanya lindungi rute yang diawali dengan /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Cek apakah ada tiket masuk bernama 'admin_session'
    const session = request.cookies.get("admin_session");

    if (!session) {
      // Jika tidak ada tiket, paksa arahkan ke halaman login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

// Konfigurasi agar middleware ini hanya mengecek folder admin
export const config = {
  matcher: ["/admin/:path*"],
};
