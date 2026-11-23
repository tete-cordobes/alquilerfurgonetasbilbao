import { defineConfig } from 'astro/config';

const deployment = new URL(process.env.PAGES_BASE_URL || 'https://tete-cordobes.github.io/alquilerfurgonetasbilbao/');

export default defineConfig({
  site: deployment.origin,
  base: deployment.pathname,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
