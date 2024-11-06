<template>
    <div v-if="error" class="error">{{ error }}</div>
    <DataTable :value="data">
      <Column field="customer.name" header="Konsumen"></Column>
      <Column header="Tanggal Order">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.created_at) }}
        </template>
      </Column>
      <Column field="service" header="Layanan"></Column>
      <Column field="price" header="Biaya">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.price) }}
        </template>
      </Column>
      <Column header="">
        <template #body="slotProps">
          <Button severity="primary" @click="viewOrder(slotProps.data)" variant="outlined" size="small">
            <Icon name="lucide:eye" />
          </Button>
        </template>
      </Column>
    </DataTable>
</template>

<script lang="ts" setup>
  definePageMeta({
    title: 'List Order',
  })
  const client = useSanctumClient();
  const { data, error } = await useAsyncData('orders', () =>
      client('/api/orders')
  )
  const viewOrder = (order: any) => {
    navigateTo(`/order/${order.id}`)
  }
  const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('id-ID', options);
  };
</script>
