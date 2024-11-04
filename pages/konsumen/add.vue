<template>
    <form @submit.prevent="handleSubmit" ref="form">
        <FloatLabel variant="on" class="mb-4">
            <InputText id="name" v-model="state.name" class="w-full" />
            <label for="name">Nama Lengkap</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="phone" v-model="state.phone" class="w-full" />
            <label for="phone">No. Whatsapp</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="alamat" v-model="state.alamat" class="w-full" />
            <label for="alamat">Alamat</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="kategori" v-model="state.kategori" class="w-full" />
            <label for="kategori">Kategori</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="pekerjaan" v-model="state.pekerjaan" class="w-full" />
            <label for="pekerjaan">Pekerjaan</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="sertifikat" v-model="state.sertifikat" class="w-full" />
            <label for="sertifikat">Sertifikat</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="nilai_transaksi" v-model="state.nilai_transaksi" class="w-full" type="number" />
            <label for="nilai_transaksi">Nilai Transaksi</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="harga_real" v-model="state.harga_real" class="w-full" type="number"/>
            <label for="harga_real">Harga Real</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="harga_kesepakatan" v-model="state.harga_kesepakatan" class="w-full" type="number" />
            <label for="harga_kesepakatan">Harga Kesepakatan</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="data_pajak_pembeli" v-model="state.data_pajak_pembeli" class="w-full" type="number" />
            <label for="data_pajak_pembeli">Data Pajak Pembeli</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="data_pajak_penjual" v-model="state.data_pajak_penjual" class="w-full" type="number" />
            <label for="data_pajak_penjual">Data Pajak Penjual</label>
        </FloatLabel>
        <Button label="Register" type="submit" class="mt-4"><Icon name="lucide:user-plus"/> Tambah Konsumen</Button>
    </form>
</template>

<script setup lang="ts">
    definePageMeta({
        title: 'Tambah Konsumen',
    })
    const state = ref({
        name: '',
        phone: '',
        alamat: '',
        kategori: '',
        pekerjaan: '',
        sertifikat: '',
        nilai_transaksi: '',
        harga_real: '',
        harga_kesepakatan: '',
        data_pajak_pembeli: '',
        data_pajak_penjual: '',
    })
    const client = useSanctumClient();
    const customers = ref([]);

    const handleSubmit = async () => {
        await client('/api/customers', {
            method: 'POST',
            body: state.value
        })
        navigateTo('/konsumen')
    }

    
</script>