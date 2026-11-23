import { sitePath } from '../lib/paths.mjs';

export function GET({ site }) {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL(sitePath('/sitemap.xml'), site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
  });
}
