<template>
  <header class="header p-4 rounded-lg border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800">
    <div class="flex justify-between items-center">
      <NuxtLink to="/"><LucideHome class="w-6 h-6" /></NuxtLink>
      <Button 
        v-if="isLoggedIn" 
        label="Logout" 
        @click="handleLogout" 
        size="small">
        <LucideLogOut class="w-6 h-6" />Logout
      </Button>
      <NuxtLink v-else to="/login">
        <Button label="Login" size="small">
          <LucideLogIn class="w-6 h-6" />Login
        </Button>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';

// Menggunakan inject untuk mendapatkan status login
const isLoggedIn = inject('isLoggedIn');
const router = useRouter();

const handleLogout = () => {
  // Hapus token dari local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Update status login
  isLoggedIn.value = false;

  // Redirect ke halaman login setelah logout
  router.push('/login');
};
</script>

<style scoped>
/* Gaya khusus untuk header */
</style>