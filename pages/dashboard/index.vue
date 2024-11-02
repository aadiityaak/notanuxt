<template>
    <div>
        dashboard
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    title: 'Dashboard',
    middleware: ['sanctum:auth'],
})
</script>