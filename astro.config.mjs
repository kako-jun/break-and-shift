import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kako-jun.github.io',
  base: '/break-and-shift',
  trailingSlash: 'ignore',
  integrations: [tailwind(), react(), sitemap()],
  build: {
    assets: '_assets',
  },
});
