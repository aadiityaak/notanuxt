<template>
  <header class="header p-4 rounded-lg border border-surface-200 bg-white dark:bg-surface-800">
    <div class="flex justify-between items-center">
      <NuxtLink to="/"><LucideHome class="w-6 h-6" /></NuxtLink>
      <Button 
        v-if="isAuthenticated" 
        label="Logout" 
        @click="logout" 
        size="small"
        severity="danger"
        outlined >
        <LucideLogOut class="w-6 h-6" />Logout
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
const { isAuthenticated, logout } = useSanctumAuth()
</script>

<style scoped>
/* Gaya khusus untuk header */
</style>