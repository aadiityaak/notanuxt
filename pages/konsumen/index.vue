<template>
    <div class="mx-auto p-4">
        <div v-if="error" class="error">{{ error }}</div>
        <div class="card">
            <DataTable :value="customers" scrollable tableStyle="min-width: 100rem" >
                <Column field="name" header="Nama" frozen >
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="alamat" header="Alamat">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="whatsapp" header="Whatsapp">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="kategori" header="Kategori">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="pekerjaan" header="Pekeraan">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="bank" header="Bank">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="sertifikat" header="Sertifikat">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="nilai_transaksi" header="Nilai Transaksi">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="harga_real" header="Harga Real">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="harga_kesepakatan" header="Harga Kesepakatan">
                    <template v-if="loading" #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
            </DataTable>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KonsumenPage',
  data() {
    return {
      customers: ref(new Array(10)),
      loading: true,
      error: null,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    const apiUrl = useRuntimeConfig().public.API_URL;
    try {
      const response = await axios.get(`${apiUrl}/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.customers = response.data;
    } catch (error) {
      this.error = 'Gagal memuat data konsumen.';
    } finally {
      this.loading = false;
    }
  },
}
</script>