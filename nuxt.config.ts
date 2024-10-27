import Aura from '@primevue/themes/aura';
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
          preset: Aura
      }
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
