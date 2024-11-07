<template>
    <div v-if="error" class="error">{{ error }}</div>
    <DataTable :value="data.data" v-if="data" size="large">
        <Column field="avatar" header="Avatar">
          <template #body="slotProps">
              <Avatar :image="storageUrl + '/' + slotProps.data.avatar" v-if="slotProps.data && slotProps.data.avatar !== null" shape="circle" :alt="slotProps.data.name"/>
              <Avatar v-else shape="circle" >{{ slotProps.data.name.charAt(0) }}</Avatar>
          </template>
        </Column>
        <Column field="name" header="Nama"></Column>
        <Column field="email" header="email"></Column>
        <Column field="position" header="Jabatan" ></Column>
        <Column header="" >
          <template #body="slotProps">
              <Button severity="primary" @click="viewKaryawan(slotProps.data)" variant="outlined" size="small">
                <Icon name="lucide:eye" />
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
    const route = useRoute();
    const config = useSanctumConfig();
    const storageUrl = config.baseUrl + '/storage';
    const client = useSanctumClient();
    const page = ref(route.query.page ? Number(route.query.page) : 1);
    definePageMeta({
        title: 'List Karyawan',
    })
    const { data, error, refresh } = await useAsyncData('users', () =>
        client(`/api/karyawans?page=${page.value}`)
    )
    const onPageChange = (event: { page: number, first: number, rows: number, pageCount: number }) => {
        page.value = event.page + 1;
        navigateTo(`/karyawan?page=${page.value}`);
    };
    onMounted(() => {
        page.value = route.query.page ? Number(route.query.page) : 1;
    })
    watch(page, (newPage) => {
        refresh();
    });
    const viewKaryawan = (karyawan: any) => navigateTo(`/karyawan/${karyawan.id}`)
</script>

