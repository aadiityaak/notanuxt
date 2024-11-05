<template>
    <IftaLabel class="mb-3">
        <component :is="inputType" v-model="model" v-bind="inputProps" class="w-full" />
        <label :for="name">{{ label }}</label>
        <Message v-if="error" severity="error" size="small" variant="simple">{{ error.message }}</Message>
    </IftaLabel>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    name: String,
    label: String,
    model: Object,
    inputType: String,
    inputProps: Object
});

const error = computed(() => {
    const formField = $form[props.name];
    return formField?.invalid ? formField.error : null;
});
</script>