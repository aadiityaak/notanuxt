<template>
    <div class="mx-auto p-4">
      <div v-if="error" class="error">{{ error }}</div>
      <div class="card">
        <DataTable :value="data">
          <Column field="name" header="Nama"></Column>
          <Column field="alamat" header="Alamat"></Column>
          <Column field="phone" header="Whatsapp"></Column>
          <Column field="action" header="Action"></Column>
        </DataTable>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    const client = useSanctumClient();
    const customers = ref([]);
    const { data, error, refresh } = await useAsyncData('users', () =>
        client('/api/customers')
    );
    console.log(process.env.API_URL);
  </script>
