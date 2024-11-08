<template>
    <div v-if="error" class="error">{{ error }}</div>
    <DataTable :value="data.data" v-if="data" size="large">
        <Column field="avatar" header="Avatar">
          <template #body="slotProps">
              <Avatar :image="storageUrl + '/' + slotProps.data.avatar" v-if="slotProps.data && slotProps.data.avatar !== null" shape="circle" :alt="slotProps.data.name"/>
              <Avatar v-else shape="circle" class="text-rose-700">{{ slotProps.data.name.charAt(0) }}</Avatar>
          </template>
        </Column>
        <Column header="Nama">
          <template #body="slotProps">
            {{ slotProps.data.name }} <span v-if="slotProps.data.is_admin === 1"><Icon name="lucide:verified" class="text-sky-700" /></span>
          </template>
        </Column>
        <Column field="email" header="email"></Column>
        <Column field="position" header="Jabatan" ></Column>
        <Column header="" >
          <template #body="slotProps">
            <div class="flex justify-end">
              <Button severity="primary" @click="viewKaryawan(slotProps.data)" variant="outlined" size="small">
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
                @click="deleteUser(slotProps.data.id)">
                  <Icon name="lucide:trash" class="text-rose-700" />
                </Button>
                
            </div>
          </template>
        </Column>
    </DataTable>
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
    <Toast />
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
      Menampilkan {{ slotProps.state.first }} - {{ slotProps.state.rows + slotProps.state.page * slotProps.state.rows }} data.
    </template>
    </Paginator>
</template>

<script lang="ts" setup>
    const route = useRoute()
    const confirm = useConfirm()
    const dialog = useDialog()
    const toast = useToast()
    const config = useSanctumConfig()
    const storageUrl = config.baseUrl + '/storage'
    const client = useSanctumClient()
    const DetailKaryawan = defineAsyncComponent(() => import('~/components/DetailKaryawan.vue'))

    const page = ref(route.query.page ? Number(route.query.page) : 1)
    definePageMeta({
        title: 'List Karyawan',
    })
    const { data, error, refresh } = await useAsyncData('users', () =>
        client(`/api/karyawans?page=${page.value}`)
    )
    const onPageChange = (event: { page: number, first: number, rows: number, pageCount: number }) => {
        page.value = event.page + 1;
        navigateTo(`/karyawan?page=${page.value}`)
    };
    onMounted(() => {
        page.value = route.query.page ? Number(route.query.page) : 1;
    })
    const showDialog = (karyawan: any) => {
      dialog.open(DetailKaryawan, {
          data: karyawan,
          props: {
              header: `${karyawan.name}`,
              size: 'xl',
              showHeader: false,
              dismissableMask: true,
              dismissable: true,
              class: 'w-full max-w-[500px]',
              modal: true
          } as any,
      });
    };
    const deleteUser = async (id: number) => {
      confirm.require({
      message: 'Apakah Anda yakin ingin menghapus user ini?',
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
        try {
          await client(`/api/karyawans/${id}`, {
            method: 'DELETE',
          });
          toast.add({ severity: 'success', summary: 'Success', detail: 'Delete user berhasil!', life: 3000 })
          refresh();
        }
        catch (error: any) {
          let message = ''
          console.log(error.response)
          if (error.response.status === 403) {
            message = 'Anda tidak memiliki akses untuk menghapus data user ini.'
          } else {
            message = 'Terjadi kesalahan.'
          }
          toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
        }

      },
    });
    }
    watch(page, (newPage) => {
        refresh();
    });
    const viewKaryawan = (karyawan: any) => navigateTo(`/karyawan/${karyawan.id}`)
</script>

