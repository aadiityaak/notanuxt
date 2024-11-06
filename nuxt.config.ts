import Lara from '@primevue/themes/lara';
import { definePreset } from '@primevue/themes';
const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
        50: '{rose.50}',
        100: '{rose.100}',
        200: '{rose.200}',
        300: '{rose.300}',
        400: '{rose.400}',
        500: '{rose.500}',
        600: '{rose.600}',
        700: '{rose.700}',
        800: '{rose.800}',
        900: '{rose.900}',
        950: '{rose.950}'
    },
    colorScheme: {
        light: {
            primary: {
                color: '{rose.950}',
                inverseColor: '#ffffff',
                hoverColor: '{rose.900}',
                activeColor: '{rose.800}'
            }
        },
        dark: {
            primary: {
                color: '{rose.50}',
                inverseColor: '{rose.950}',
                hoverColor: '{rose.100}',
                activeColor: '{rose.200}'
            },
        }
    }
  }
});
export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    'nuxt-auth-sanctum',
    '@nuxt/icon',
    '@pinia/nuxt',
    'nuxt-zod-i18n',
    '@nuxtjs/i18n'
  ],
  ssr: false,
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark',
        }
      },
    }
  },
  sanctum: {
    mode: 'cookie',
    baseUrl: process.env.API_URL,
    redirectIfAuthenticated: true,
    redirectIfUnauthenticated: true,
    redirect: {
      keepRequestedRoute: true,
      onAuthOnly: '/login',
      onGuestOnly: '/dashboard',
      onLogout: '/login'
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: true,
    },
    logLevel: 5,
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