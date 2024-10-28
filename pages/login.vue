<template>
  <div class="h-screen content-center justify-center">
    <div class="login-container py-5 max-w-[400px] mx-auto rounded-lg border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800 p-4 min-h-[40vh] flex flex-col justify-center">
      <h1 class="text-2xl font-bold mb-[40px]">Login</h1>
      <div v-if="isLoggedIn">
        <Message severity="success" class="mb-5 mt-3">Anda sudah login.</Message>
        <Button label="Ke Beranda" @click="goHome"><LucideHome class="w-6 h-6" />Ke Beranda</Button>
      </div>
      <div v-else>
        <FloatLabel variant="on" class="mb-4">
          <InputText id="on_label" v-model="email" variant="filled" size="large" class="w-full" />
          <label for="on_label">Email</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
          <InputText id="in_label" v-model="password" type="password" variant="filled" size="large" class="w-full" />
          <label for="in_label">Password</label>
        </FloatLabel>
        <Button label="Login" @click="handleLogin" class="mt-4"><LucideLogIn /> Login</Button>
        <Message v-if="error" severity="error">{{ error }}</Message>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const isLoggedIn = inject('isLoggedIn'); 
const router = useRouter();

const handleLogin = async () => {
  const apiUrl = useRuntimeConfig().public.API_URL;
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); 

    isLoggedIn.value = true; 
    router.push('/'); 
  } catch (err) {
    error.value = err.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.';
  }
};

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
/* Gaya khusus untuk halaman login */
</style>