<template>
  <NuxtLoadingIndicator />
  <NuxtLayout :name="layoutCondition">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  const { isAuthenticated } = useSanctumAuth();
  const layoutCondition = computed(() => (isAuthenticated.value ? 'dashboard' : 'default'));
</script>

<style>
html.dark {
  color: #cfcfcf;
}
</style>