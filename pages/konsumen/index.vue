<template>
  <div v-if="error" class="error">{{ error }}</div>
  <DataTable :value="data.data" striped-rows v-if="data.data">
    <Column field="name" header="Nama">
      <template #body="slotProps">
        <div class="flex items-center">
          <Avatar shape="circle">
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
        <div class="flex">
          <Button
            severity="primary"
            @click="viewKonsumen(slotProps.data)"
            variant="outlined"
            size="small"
          >
            <Icon name="lucide:pencil" class="text-rose-700" />
          </Button>
          <Button 
          class="ml-2"
          severity="primary"
          variant="outlined" 
          size="small" 
          @click="showDialog(slotProps.data.id)" >
            <Icon name="lucide:eye" class="text-rose-700" />
          </Button>
        </div>
        <Dialog v-model:visible="visible[slotProps.data.id]" modal header="Header">
          <template #header>
            <h3 class="text-xl font-bold">
              <Avatar shape="circle" >{{ slotProps.data.name.charAt(0) }} </Avatar>
              {{ slotProps.data.name }}
            </h3>
          </template>
          <div class="w-full">
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
              <div class="font-bold">Whatsapp</div>
              <div class="text-right">{{ slotProps.data.phone }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
              <div class="font-bold">Alamat</div>
              <div class="text-right">{{ slotProps.data.alamat }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
              <div class="font-bold">Kategori</div>
              <div class="text-right">{{ slotProps.data.kategori }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800" v-if="slotProps.data.kategori === 'Perorangan'">
              <div class="font-bold">Pekerjaan</div>
              <div class="text-right">{{ slotProps.data.pekerjaan }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800" v-if="slotProps.data.kategori === 'Bank'">
              <div class="font-bold">Bank</div>
              <div class="text-right">{{ slotProps.data.bank }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
              <div class="font-bold">Sertifikat</div>
              <div class="text-right">{{ slotProps.data.sertifikat }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
              <div class="font-bold">Nilai Transaksi</div>
              <div class="text-right">{{ formatRupiah(slotProps.data.nilai_transaksi) }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
              <div class="font-bold">Harga Real</div>
              <div class="text-right">{{ formatRupiah(slotProps.data.harga_real) }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
              <div class="font-bold">Harga Kesepakatan</div>
              <div class="text-right">{{ formatRupiah(slotProps.data.harga_kesepakatan) }}</div>
            </div>
            <div class="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
              <div class="font-bold">Data Pajak Pembeli</div>
              <div class="text-right">{{ formatRupiah(slotProps.data.data_pajak_pembeli) }}</div>
            </div>
            <div class="flex justify-between py-2">
              <div class="font-bold">Data Pajak Penjual</div>
              <div class="text-right">{{ formatRupiah(slotProps.data.data_pajak_penjual) }}</div>
            </div>
          </div>
        </Dialog>
      </template>
    </Column>
  </DataTable>
  <div v-else class="text-center">Tidak ada konsumen</div>
  <Paginator
    :rows="data.per_page"
    :totalRecords="data.total"
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
const route = useRoute();
const visible = ref({} as any);
const page = ref(route.query.page ? Number(route.query.page) : 1);
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
  navigateTo(`/konsumen?page=${page.value}`);
};

const showDialog = (id: number) => {
  visible.value[id] = !visible.value[id];
};

onMounted(() => {
  page.value = route.query.page ? Number(route.query.page) : 1
})
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
}
watch(page, (newPage) => {
  refresh();
});
</script>
