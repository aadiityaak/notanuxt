<template>
    <div v-if="error" class="error">{{ error }}</div>
    <DataTable :value="data.data">
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
      <Column header="" class="flex justify-end gap-2">
        <template #body="slotProps">
          <Button severity="primary" variant="outlined" size="small">
            <Icon name="lucide:eye" />
          </Button>
          <Button severity="primary" variant="outlined" size="small">
            <Icon name="lucide:list" />
            <Badge value="2" class="ml-1" severity="danger"/>
          </Button>
          <Button severity="primary" @click="viewOrder(slotProps.data)" variant="outlined" size="small">
            <Icon name="lucide:pencil" />
          </Button>
          <Button severity="primary" variant="outlined" size="small">
            <Icon name="lucide:trash" />
          </Button>
        </template>
      </Column>
    </DataTable>
    <Paginator
      :rows="data.per_page"
      :totalRecords="data.total"
      :page="page - 1"
      @page="onPageChange"
      aria-label="page"
      :pt="{
      root: (event) => {
        const itemForPage =  data.per_page;
        const currentPage =  page - 1;
        event.state.d_first = itemForPage * currentPage;
      },
    }"
    >
      <template #start="slotProps">
        Halaman {{ slotProps.state.page + 1 }} Menampilkan {{ slotProps.state.first }} - {{ slotProps.state.rows + slotProps.state.page * slotProps.state.rows }} Data
      </template>
    </Paginator>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const page = ref(route.query.page ? Number(route.query.page) : 1);
  definePageMeta({
    title: 'List Order',
  })
  const client = useSanctumClient();
  const { data, error, refresh } = await useAsyncData('orders', () =>
    client(`/api/orders/?page=${page.value}`)
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
  const onPageChange = (event: { page: number, first: number, rows: number, pageCount: number }) => {
    page.value = event.page + 1; 
    navigateTo(`/order?page=${page.value}`);
  };

  watch(page, (newPage) => {
    refresh();
  });
</script>
