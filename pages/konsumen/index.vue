<template>
      <div v-if="error" class="error">{{ error }}</div>
      <DataTable :value="data">
        <Column field="name" header="Nama"></Column>
        <Column field="alamat" header="Alamat"></Column>
        <Column field="phone" header="Whatsapp"></Column>
        <Column field="action" header="Action"></Column>
      </DataTable>
  </template>
  
  <script lang="ts" setup>
    definePageMeta({
      title: 'List Konsumen',
    })
    const client = useSanctumClient();
    const customers = ref([]);
    const { data, error, refresh } = await useAsyncData('users', () =>
        client('/api/customers')
    )
    console.log(process.env.API_URL);
  </script>
