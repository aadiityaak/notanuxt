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
            <InputText id="nilai_transaksi" v-model="state.nilai_transaksi" class="w-full" type="number" />
            <label for="nilai_transaksi">Nilai Transaksi</label>
        </FloatLabel>
        <FloatLabel variant="on" class="mb-4">
            <InputText id="harga_real" v-model="state.harga_real" class="w-full" type="number" />
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
        <Message severity="success" v-if="message">{{ message }}</Message>
        <div class="flex justify-between">
            <div>
                <Button label="Back" size="small" type="button" @click="router.back()"><Icon name="lucide:arrow-left" /> Back</Button>
                <Button label="Update" size="small" type="submit" severity="info" class="ml-4"><Icon name="lucide:user-plus"/> Update</Button>
            </div>
            <Button label="Delete" size="small" severity="danger" type="button" @click="visible = true"><Icon name="lucide:trash" /> Delete</Button>
            <Dialog v-model:visible="visible" modal class="w-full max-w-xl">
                <template #header>
                    <h3 class="text-xl font-bold"><Icon name="lucide:trash" /> Hapus Konsumen</h3>
                </template>
                <p>Yakin ingin menghapus user <em><b>{{ state.name }}</b>?</em></p>
                <template #footer>
                    <Button size ="small" severity="secondary" @click="visible = false" > <Icon name="lucide:x" /> Batal</Button>
                    <Button label="Ya" size ="small" severity="danger" @click="handleDelete" > <Icon name="lucide:trash" /> Ya</Button>
                </template>
            </Dialog>
        </div>
    </form>
</template>

<script setup lang="ts">
    const router = useRouter()
    definePageMeta({
        title: 'Edit Konsumen',
    })
    const client = useSanctumClient()
    const idUser = useRoute().params.id
    const message = ref('')
    const visible = ref(false)

    const handleUpdate = async () => {
        await client(`/api/customers/${idUser}`, {
            method: 'PUT',
            body: state.value
        })
        message.value = 'Update Success'
    }

    const handleDelete = async () => {
        await client(`/api/customers/${idUser}`, {
            method: 'DELETE'
        })
        router.back()
    }

    const { data, error } = await useAsyncData(`customers-${idUser}`, () =>
        client(`/api/customers/${idUser}`)
    )
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
    })
</script>