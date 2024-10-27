import Aura from '@primevue/themes/aura';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
});