import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // single-page mode na rota raiz: SvelteKit injeta SSR onde possivel
      // Pages serve assets estaticos + Worker para SSR dinamico
      routes: {
        include: ['/*'],
        exclude: ['<all>'],
      },
    }),
  },
};

export default config;
