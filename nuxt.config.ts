import Lara from '@primevue/themes/lara';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@primevue/nuxt-module', 'nuxt-lucide-icons', 'nuxt-auth-sanctum', '@nuxt/icon'],
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
  sanctum: {
    baseUrl: process.env.API_URL,
    redirect: {
      onAuthOnly: '/login',
      onGuestOnly: '/dashboard',
      onLogout: '/login'
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