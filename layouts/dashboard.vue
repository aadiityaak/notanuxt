<template>
  <div class="dashboard">
    <main class="bg-gray-100 dark:bg-gray-900">
      <div class="flex">
        <MenuVertical />
        <div class="container p-4 max-w-[calc(100vw-340px)]">
          <Header />
          <div class="bg-white shadow rounded-lg p-4 mb-4 mt-4">
            <slot />
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
</script>