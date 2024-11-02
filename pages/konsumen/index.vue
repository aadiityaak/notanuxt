<template>
      <div v-if="error" class="error">{{ error }}</div>
      <DataTable :value="data" size="large">
        <Column field="name" header="Nama"></Column>
        <Column field="alamat" header="Alamat"></Column>
        <Column field="phone" header="Whatsapp"></Column>
        <Column header="" >
          <template #body="slotProps">
              <Button severity="primary" @click="viewKonsumen(slotProps.data)" variant="outlined" size="small">
                <Icon name="lucide:eye" />
              </Button>
          </template>
        </Column>
      </DataTable>
  </template>
  
  <script lang="ts" setup>
    definePageMeta({
      title: 'List Konsumen',
    })
    const client = useSanctumClient();
    const { data, error } = await useAsyncData('customers', () =>
        client('/api/customers')
    )

    const viewKonsumen = (konsumen: any) => {
      navigateTo(`/konsumen/${konsumen.id}`)
    }
  </script>
