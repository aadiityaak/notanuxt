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
</template>

<script lang="ts" setup>
    definePageMeta({
        title: 'List Karyawan',
    })
    const config = useSanctumConfig();
    const storageUrl = config.baseUrl + '/storage';
    const client = useSanctumClient();
    const { data, error } = await useAsyncData('users', () =>
        client('/api/karyawans')
    )
    const viewKaryawan = (karyawan: any) => navigateTo(`/karyawan/${karyawan.id}`)
</script>

