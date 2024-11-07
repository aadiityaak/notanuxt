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
        <div class="flex justify-end">
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
          @click="showDialog(slotProps.data)" >
            <Icon name="lucide:eye" class="text-rose-700" />
          </Button>
          <Button 
          class="ml-2"
          severity="primary"
          variant="outlined"
          size="small"
          @click="deleteKonsumen(slotProps.data.id)">
            <Icon name="lucide:trash" class="text-rose-700" />
          </Button>
        </div>
      </template>
    </Column>
  </DataTable>
  <div v-else class="text-center">Tidak ada konsumen</div>
  <DynamicDialog />
  <ConfirmPopup>
    <template #container="{ message, acceptCallback, rejectCallback }" class="!shadow-0">
      <div class="rounded p-4">
        <span>{{ message.message }}</span>
        <div class="flex items-center gap-2 mt-4">
            <Button label="Hapus" @click="acceptCallback" size="small"></Button>
            <Button label="Batal" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
        </div>
    </div>
  </template>
  </ConfirmPopup>
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
const route = useRoute()
const dialog = useDialog()
const confirm = useConfirm()
const DetailKonsumen = defineAsyncComponent(() => import('~/components/DetailKonsumen.vue'))
const page = ref(route.query.page ? Number(route.query.page) : 1);
const client = useSanctumClient()
definePageMeta({
  title: 'List Konsumen',
})
const { data, error, refresh } = await useAsyncData('customers', () =>
  client(`/api/customers?page=${page.value}`)
)
const viewKonsumen = (konsumen: any) => {
  navigateTo(`/konsumen/${konsumen.id}`);
}
const deleteKonsumen = async (id: number) => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus konsumen ini?',
    header: 'Konfirmasi',
    icon: 'lucide:alert-triangle',
    rejectProps: {
      label: 'Batal',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
        label: 'Hapus'
    },
    accept: async () => {
      await client(`/api/customers/${id}`, {
        method: 'DELETE',
      });
      refresh();
    },
  })
}

const onPageChange = (event: { page: number, first: number, rows: number, pageCount: number }) => {
  page.value = event.page + 1; 
  navigateTo(`/konsumen?page=${page.value}`);
}

const showDialog = (konsumen: any) => {
  dialog.open(DetailKonsumen, {
      data: konsumen,
      props: {
          header: `${konsumen.name}`,
          dismissableMask: true,
          dismissable: true,
          class: 'w-full max-w-[500px]',
          modal: true
      } as any,
  });
}

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
})
</script>
