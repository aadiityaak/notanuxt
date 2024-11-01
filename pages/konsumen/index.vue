<template>
    <div class="mx-auto p-4">
      <div v-if="error" class="error">{{ error }}</div>
      <div class="card">
        <DataTable :value="data" scrollable tableStyle="min-width: 100rem">
          <Column field="name" header="Nama" frozen></Column>
          <Column field="alamat" header="Alamat"></Column>
          <Column field="phone" header="Whatsapp"></Column>
          <Column field="kategori" header="Kategori"></Column>
          <Column field="pekerjaan" header="Pekerjaan"></Column>
          <Column field="bank" header="Bank"></Column>
          <Column field="sertifikat" header="Sertifikat"></Column>
          <Column field="nilai_transaksi" header="Nilai Transaksi"></Column>
          <Column field="harga_real" header="Harga Real"></Column>
          <Column field="harga_kesepakatan" header="Harga Kesepakatan"></Column>
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
