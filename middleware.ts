import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse, URLPattern } from 'next/server';
import { Roles } from 'utils/enums';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!.*\\.).*)'
    // '/((?!.*|api|_next/static|_next/image|favicon.ico).*)'
  ]
};

export const publicRoutes = [
  '/auth/register',
  '/auth/login-new',
  '/auth/forgot-pw',
  '/auth/register-verification',
  '/auth/reset-password',
  '/auth/reset-verification',
  '/patient'
];

function verifyOrRedirectRoute(continueRoute: boolean, redirectUrl: NextURL, isLogin?: boolean): NextResponse {
  if (continueRoute && !isLogin) {
    return NextResponse.next();
  }
  return NextResponse.redirect(redirectUrl);
}

export default function middleware(req: NextRequest) {
  const verify = req.cookies.get('token');
  const role: any = req.cookies.get('role');
  const url = req.nextUrl.clone();

  if (url.pathname === '/') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  const pattern = new URLPattern();
  const pageName = pattern.exec(url)?.pathname.input.split(/\/\d/)[0];
  if (!pageName) {
    return NextResponse.next();
  }

  if (verify) {
    if (
      (url.pathname.startsWith('/employee') && role?.value !== Roles.EMPLOYEE) ||
      (url.pathname.startsWith('/nurse') && role?.value !== Roles.ADMIN && role?.value !== Roles.SUPERADMIN) ||
      (url.pathname.startsWith('/ward') && role?.value !== Roles.WARDADMIN)
    ) {
      url.pathname = '/dashboard';
      return verifyOrRedirectRoute(publicRoutes.includes(pageName), url);
    }
    url.pathname = '/dashboard';
    return verifyOrRedirectRoute(true, url, pageName.startsWith('/auth'));
  }
  url.pathname = '/auth/login-new';
  return verifyOrRedirectRoute(publicRoutes.includes(pageName), url);
}
