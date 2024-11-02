<template>

</template>

<script lang="ts" setup>
    definePageMeta({
        title: 'Profile',
        middleware: ['sanctum:auth'],
    })
</script>