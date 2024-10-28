<template>
  <div class="dashboard">
    <main class="dashboard__main">
      <div class="flex">
        <MenuVertical />
        <div class="container p-4">
        <Header />
        <slot />
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