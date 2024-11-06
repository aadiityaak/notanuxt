<template>
  <header class="header p-4 rounded-lg border-0 bg-gray-50 dark:bg-gray-900">
    <div class="flex justify-between items-center max-w-[1200px] mx-auto">
      <NuxtLink v-if="isAuthenticated" to="/dashboard"><Icon name="lucide:house"/></NuxtLink>
      <h1 v-else class="text-2xl font-bold text-sm">App</h1>
      <div>
        <span @click="toggleDarkMode()" class="cursor-pointer">
            <Icon v-if="dark" name="lucide:sun" class="text-amber-400" />
            <Icon v-else name="lucide:moon" class="text-gray-700"/>
        </span>
        <span v-if="isAuthenticated" class="ml-4 cursor-pointer" @click="logout">
          <Icon name="lucide:log-out"/>
        </span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { logout, isAuthenticated  } = useSanctumAuth()
const dark = ref(document.documentElement.classList.contains('dark'))
// Fungsi toggle dark mode
function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    dark.value = isDark
    localStorage.setItem('darkMode', isDark ? 'true' : 'false'); // Simpan status dark mode di localStorage
}
// Pastikan dark mode tetap aktif saat reload
onMounted(() => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
      document.documentElement.classList.add('dark');
      dark.value = true  
    }
});


</script>
