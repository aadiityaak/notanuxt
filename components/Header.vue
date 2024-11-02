<template>
  <header class="header p-4 rounded-lg border border-surface-200 bg-white dark:bg-surface-800">
    <div class="flex justify-between items-center">
      <NuxtLink to="/"><Icon name="lucide:house"/></NuxtLink>
      <NuxtLink to="/notifications" class="relative"><Icon name="lucide:bell"/><Badge class="absolute -top-2 -right-3" severity="danger" size="small" value="5" /></NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const { logout } = useSanctumAuth()
const toggle = (event: Event) => {
    menu.value.toggle(event);
}
const menu = ref();
const items = ref([
    { label: 'Profile', icon: 'lucide:user', to: '/profile' },
    { label: 'Logout', icon: 'lucide:log-out', command: () => logout() },
]);
</script>

<style scoped>
/* Gaya khusus untuk header */
</style>