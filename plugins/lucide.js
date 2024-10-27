import { defineNuxtPlugin } from '#app'
import { Lucide } from 'lucide-vue-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Lucide)
})