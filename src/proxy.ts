import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/proxy';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  return await updateSession(request, response);
};

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};