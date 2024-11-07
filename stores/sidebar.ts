import { defineStore } from 'pinia';
import { ref } from 'vue';

export const toggleSidebar = defineStore('sidebar', () => {
  const sidebar = ref(true)
  const toggle = () => {
    sidebar.value = !sidebar.value
  }
  return { sidebar, toggle }
})