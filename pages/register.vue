<script lang="ts" setup>
definePageMeta({
  middleware: ['sanctum:guest'],
})
</script>

<template>
  <RegisterForm />
</template>

<style scoped></style>