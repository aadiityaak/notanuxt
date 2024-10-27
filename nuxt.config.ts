import Aura from '@primevue/themes/aura';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  plugins: ['~/plugins/lucide.js'],
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
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost:3000/api', 
    },
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