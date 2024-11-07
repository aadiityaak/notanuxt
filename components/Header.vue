<template>
  <header class="header p-4 rounded-lg border-0 bg-zinc-50 dark:bg-zinc-900">
    <div class="flex justify-between items-center mx-auto">
      <div class="flex items-center">
        <Icon name="lucide:menu" class="text-2xl cursor-pointer" />
      </div>
      <div>
        <span @click="toggleDarkMode()" class="cursor-pointer">
            <Icon v-if="dark" name="lucide:sun" class="text-amber-400" />
            <Icon v-else name="lucide:moon" class="text-zinc-700"/>
        </span>
        <span class="ml-4 cursor-pointer" @click="logout">
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
