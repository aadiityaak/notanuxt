<template>
    <div class="container mx-auto p-4">
        <div class="text-center">
            <h1 class="text-3xl font-bold mb-4">Selamat Datang</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Middleware untuk redirect jika token tidak ada
if (process.client && !localStorage.getItem('token')) {
  // Redirect ke halaman login
  window.location.href = '/login';
}
</script>
