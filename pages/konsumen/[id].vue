<template>
    <form @submit.prevent="handleUpdate" ref="form">
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
            <InputText id="nilai_transaksi" v-model="state.nilai_transaksi" class="w-full" />
            <label for="nilai_transaksi">Nilai Transaksi</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="harga_real" v-model="state.harga_real" class="w-full" />
            <label for="harga_real">Harga Real</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="harga_kesepakatan" v-model="state.harga_kesepakatan" class="w-full" />
            <label for="harga_kesepakatan">Harga Kesepakatan</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="data_pajak_pembeli" v-model="state.data_pajak_pembeli" class="w-full" />
            <label for="data_pajak_pembeli">Data Pajak Pembeli</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="data_pajak_penjual" v-model="state.data_pajak_penjual" class="w-full" />
            <label for="data_pajak_penjual">Data Pajak Penjual</label>
        </FloatLabel>
        <Message severity="success" v-if="message">{{ message }}</Message>
        <Button label="{{ textButton }}" type="submit" class="mt-4"><Icon name="lucide:user-plus"/> {{ textButton }}</Button>
    </form>
</template>

<script setup lang="ts">
import Message from 'primevue/message';

    const client = useSanctumClient()
    const idUser = useRoute().params.id
    const textButton = ref('Register')
    const message = ref('')

    const handleUpdate = async () => {
        await client(`/api/customers/${idUser}`, {
            method: 'PUT',
            body: state.value
        })
        message.value = 'Update Success'
    }
    const { data, error } = await useAsyncData(`customers-${idUser}`, () =>
        client(`/api/customers/${idUser}`)
    )
    definePageMeta({
        title: 'Edit Konsumen',
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

    onMounted(() => {
        if (data.value) {
            state.value = { ...state.value, ...data.value };
        }
        textButton.value = 'Update'
    })

</script>