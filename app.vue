<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import { useRouter } from 'vue-router';

// State untuk menyimpan status login
const isLoggedIn = ref(process.client && !!localStorage.getItem('token'));

// Provide status login ke seluruh aplikasi
provide('isLoggedIn', isLoggedIn);

// Menggunakan computed property untuk menentukan layout
const layout = computed(() => {
  return isLoggedIn.value ? 'dashboard' : 'default';
});
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>