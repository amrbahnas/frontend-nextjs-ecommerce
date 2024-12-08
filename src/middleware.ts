import createMiddleware from 'next-intl/middleware';
import { locales } from '../i18n.config';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  // Whether to add locale prefix for default locale
  localePrefix: 'always'
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};