<script setup lang="ts">
// You might choose this based on an API call or logged-in status
const layout = "dashboard";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
