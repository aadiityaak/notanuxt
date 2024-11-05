<template>
      <div v-if="error" class="error">{{ error }}</div>
      <DataTable :value="data">
        <Column field="name" header="Nama">
          <template #body="slotProps">
            <div class="flex items-center">
              <Avatar shape="circle" >
                {{ slotProps.data.name.charAt(0) }}
              </Avatar> 
              <span class="ml-2">{{ slotProps.data.name }}</span>
            </div>
          </template>
        </Column>
        <Column field="alamat" header="Alamat"></Column>
        <Column field="phone" header="Whatsapp"></Column>
        <Column field="kategori" header="Kategori"></Column>
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
