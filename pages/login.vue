<template>
  <div class="login-container py-5 max-w-[400px] mx-auto">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <div v-if="isLoggedIn">
      <p>Anda sudah login.</p>
      <Button label="Ke Beranda" @click="goHome" ><Lucide icon="House" class="w-6 h-6" />Home</Button>
    </div>
    <div v-else>
      <InputText v-model="email" placeholder="Email" class="mb-2 w-full" />
      <Password v-model="password" placeholder="Password" class="mb-2 w-full" toggleMask />
      <Button label="Login" @click="handleLogin" ><LogIn /> Login</Button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token'); // Memeriksa apakah token ada
    }
  },
  methods: {
    async handleLogin() {
      const apiUrl = useRuntimeConfig().public.API_URL;
      try {
        const response = await axios.post(apiUrl + '/login', {
          email: this.email,
          password: this.password
        });

        // Simpan token dan informasi pengguna
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Simpan informasi pengguna

        // Redirect ke homepage
        this.$router.push('/');
      } catch (err) {
        this.error = err.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.';
      }
    },
    goHome() {
      this.$router.push('/'); // Arahkan ke halaman utama
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
  text-align: center;
}
</style>