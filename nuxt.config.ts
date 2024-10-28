import Lara from '@primevue/themes/lara';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@primevue/nuxt-module', 'nuxt-lucide-icons'],
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: false ,
        }
      },
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