<template>
    <div v-if="error" class="error">{{ error }}</div>
    <DataTable :value="data" size="large">
        <Column field="avatar" header="Avatar">
          <template #body="slotProps">
              <Avatar :image="storageUrl + '/' + slotProps.data.avatar" v-if="slotProps.data.avatar" shape="circle" :alt="slotProps.data.name"/>
              <Avatar v-else label="U" shape="circle" />
          </template>
        </Column>
        <Column field="name" header="Nama"></Column>
        <Column field="email" header="email"></Column>
        <Column field="position" header="Jabatan" ></Column>
        <Column field="is_admin" header="Administrator"></Column>
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
    </Paginator>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const page = ref(route.query.page ? Number(route.query.page) : 1);
    definePageMeta({
        title: 'List Karyawan',
    })
    const config = useSanctumConfig();
    const storageUrl = config.baseUrl + '/storage';
    const client = useSanctumClient();
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

