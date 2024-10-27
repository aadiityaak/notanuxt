<template>
    <div class="login-container py-5 max-w-[400px] mx-auto">
      <h1>Login</h1>
      <InputText v-model="email" placeholder="Email" class="mb-2 w-full" />
      <Password v-model="password" placeholder="Password" class="mb-2 w-full" toggleMask />
      <Button label="Login" @click="handleLogin" />
      <p v-if="error" class="error">{{ error }}</p>
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
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post(`${process.env.API_URL}/login`, {
            email: this.email,
            password: this.password
          });
          
          // Save token to local storage or state management
          localStorage.setItem('token', response.data.token);
          
          // Redirect to homepage
          this.$router.push('/');
        } catch (err) {
          this.error = 'Email atau password salah.';
        }
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