<template>
  <div v-if="error" class="error">{{ error }}</div>
  <DataTable :value="data.data" v-if="data.data">
    <Column field="name" header="Nama">
      <template #body="slotProps">
        <div class="flex items-center">
          <Avatar shape="circle" v-if="slotProps.data.avatar">
            {{ slotProps.data.name.charAt(0) }}
          </Avatar>
          <span class="ml-2">{{ slotProps.data.name }}</span>
        </div>
      </template>
    </Column>
    <Column field="alamat" header="Alamat"></Column>
    <Column field="phone" header="Whatsapp"></Column>
    <Column field="kategori" header="Kategori"></Column>
    <Column header="">
      <template #body="slotProps">
        <Button
          severity="primary"
          @click="viewKonsumen(slotProps.data)"
          variant="outlined"
          size="small"
        >
          <Icon name="lucide:eye" class="text-rose-700" />
        </Button>
      </template>
    </Column>
  </DataTable>
  <div v-else class="text-center">Tidak ada konsumen</div>
  <Paginator
    :rows="data.per_page"
    :totalRecords="data.total"
    :page="page - 1"
    @page="onPageChange"
    aria-label="page"
  >
    <template #start="slotProps">
      Halaman {{ slotProps.state.page + 1 }} Menampilkan {{ slotProps.state.first }} - {{ slotProps.state.rows + slotProps.state.page * slotProps.state.rows }} Data
    </template>
  </Paginator>
</template>

<script lang="ts" setup>
const page = ref(1);
const client = useSanctumClient();

definePageMeta({
  title: 'List Konsumen',
});

const { data, error, refresh } = await useAsyncData('customers', () =>
  client(`/api/customers?page=${page.value}`)
);

const viewKonsumen = (konsumen: any) => {
  navigateTo(`/konsumen/${konsumen.id}`);
};

const onPageChange = (event: { page: number, first: number, rows: number, pageCount: number }) => {
  page.value = event.page + 1; 
};

watch(page, (newPage) => {
  refresh();
});
</script>
