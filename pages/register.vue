<template>
  <RegisterForm />
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: ['sanctum:guest'],
  })
</script>