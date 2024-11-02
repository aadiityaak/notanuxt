<template>
  <header class="header p-4 rounded-lg border border-surface-200 bg-white dark:bg-surface-800">
    <div class="flex justify-between items-center">
      <NuxtLink to="/"><Icon name="lucide:house"/></NuxtLink>
      <div>
        <NuxtLink to="/notifications" class="relative"><Icon name="lucide:bell"/><Badge class="absolute -top-2 -right-3" severity="danger" size="small" value="5" /></NuxtLink>
        <Button class="ml-4" @click="logout"><Icon name="lucide:log-out"/></Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { logout } = useSanctumAuth()
</script>
