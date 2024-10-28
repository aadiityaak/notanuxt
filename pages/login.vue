<template>
  <div class="h-screen content-center justify-center">
    <div class="login-container py-5 max-w-[400px] mx-auto rounded-lg border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800 p-4 min-h-[50vh]">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <div v-if="isLoggedIn">
        <Message severity="success" class="mb-5 mt-3">Anda sudah login.</Message>
        <Button label="Ke Beranda" @click="goHome" ><LucideHome class="w-6 h-6" />Ke Beranda</Button>
      </div>
      <div v-else>
        <FloatLabel variant="on" class="mb-4">
          <InputText id="on_label" v-model="email" variant="filled" size="large" class="w-full" />
          <label for="on_label">Email</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
          <InputText id="on_label" v-model="password" type="password" variant="filled" size="large" class="w-full" />
          <label for="in_label">Password</label>
        </FloatLabel>
        <Button label="Login" @click="handleLogin" ><LucideLogIn /> Login</Button>
        <Message v-if="error" severity="error">{{ error }}</Message>
      </div>
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
      return process.client && !!localStorage.getItem('token'); 
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

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Ensure user is serializable

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

</style>