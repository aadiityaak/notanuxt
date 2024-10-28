<template>
  <div class="dashboard">
    <main class="bg-gray-100 dark:bg-gray-900">
      <div class="flex">
        <MenuVertical />
        <div class="container p-4">
        <Header />
        <div class="bg-white shadow rounded-lg p-4 mb-4 mt-4">
          <slot />
        </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',
  middleware: 'auth'
}
</script>