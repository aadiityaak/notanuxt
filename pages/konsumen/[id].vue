<template>
    <form @submit.prevent="handleSubmit" ref="form">
        <IftaLabel class="mb-3">
            <InputText id="name" v-model="state.name" class="w-full" />
            <label for="name">Nama Lengkap</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputText id="phone" v-model="state.phone" class="w-full" />
            <label for="phone">No. Whatsapp</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputText id="alamat" v-model="state.alamat" class="w-full" />
            <label for="alamat">Alamat</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <Select id="kategori" v-model="state.kategori" :options="kategori" optionLabel="name" optionValue="name" :aria-label="state.kategori" class="w-full" />
            <label for="kategori">Kategori</label>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="state.kategori === 'Bank'">
            <Select id="bank" v-model="state.bank" :options="bank" optionLabel="name" optionValue="name" class="w-full" />
            <label for="bank">Bank</label>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="state.kategori === 'Perorangan'">
            <MultiSelect id="pekerjaan" v-model="state.pekerjaan" :options="pekerjaan" optionLabel="name" optionValue="name" filter class="w-full" />
            <label for="pekerjaan">Pekerjaan</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputText id="sertifikat" v-model="state.sertifikat" class="w-full" />
            <label for="sertifikat">Sertifikat</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" currency="IDR" locale="id-ID" id="nilai_transaksi" v-model="state.nilai_transaksi" class="w-full" type="number" />
            <label for="nilai_transaksi">Nilai Transaksi</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" currency="IDR" locale="id-ID" id="harga_real" v-model="state.harga_real" class="w-full" type="number" />
            <label for="harga_real">Harga Real</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" currency="IDR" locale="id-ID" id="harga_kesepakatan" v-model="state.harga_kesepakatan" class="w-full" type="number" />
            <label for="harga_kesepakatan">Harga Kesepakatan</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" currency="IDR" locale="id-ID" id="data_pajak_pembeli" v-model="state.data_pajak_pembeli" class="w-full" type="number" />
            <label for="data_pajak_pembeli">Data Pajak Pembeli</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" currency="IDR" locale="id-ID" id="data_pajak_penjual" v-model="state.data_pajak_penjual" class="w-full" type="number" />
            <label for="data_pajak_penjual">Data Pajak Penjual</label>
        </IftaLabel>
        <Toast />
        <div class="flex justify-between">
            <div>
                <Button label="Back" size="small" type="button" @click="router.back()">
                    <Icon name="lucide:arrow-left" /> Back
                </Button>
                <Button label="Save" size="small" type="submit" severity="info" class="ml-4">
                    <Icon name="lucide:user-plus"/> {{ newUser ? 'Tambah Konsumen' : 'Update Konsumen' }}
                </Button>
            </div>
            <Button v-if="newUser === false" label="Delete" size="small" severity="danger" type="button" @click="visible = true">
                <Icon name="lucide:trash" /> Delete
            </Button>
            <Dialog v-model:visible="visible" modal class="w-full max-w-xl">
                <template #header>
                    <h3 class="text-xl font-bold"><Icon name="lucide:trash" /> Hapus Konsumen</h3>
                </template>
                <p>Yakin ingin menghapus user <em><b>{{ state.name }}</b>?</em></p>
                <template #footer>
                    <Button size ="small" severity="secondary" @click="visible = false"> 
                        <Icon name="lucide:x" /> Batal
                    </Button>
                    <Button label="Ya" size ="small" severity="danger" @click="handleDelete">
                        <Icon name="lucide:trash" /> Ya
                    </Button>
                </template>
            </Dialog>
        </div>
    </form>
</template>

<script setup lang="ts">
const router = useRouter()
const client = useSanctumClient()
const toast = useToast()
const idUser = useRoute().params.id
const newUser = idUser == 'new'
const data = ref({})
const visible = ref(false)
const state = ref({
    name: '',
    phone: '',
    alamat: '',
    bank: '',
    kategori: '',
    pekerjaan: [],
    sertifikat: '',
    nilai_transaksi: '',
    harga_real: '',
    harga_kesepakatan: '',
    data_pajak_pembeli: '',
    data_pajak_penjual: '',
})

const kategori = [
    { name: 'Bank' },
    { name: 'Perorangan' },
]
const pekerjaan = [
    { name: 'SKMHT' },
    { name: 'APHT'},
    { name: 'Fidusia' },
    { name: 'Jual beli' },
    { name: 'Hibah' },
    { name: 'Turun waris' },
    { name: 'Aphb' },
    { name: 'Pendirian PT' },
    { name: 'Pendirian CV' },
    { name: 'Pendirian yayasan' },
    { name: 'Pendirian PT perorangan' },
    { name: 'Pendirian akta cabang' },
    { name: 'Perubahan PT' },
    { name: 'Perub CV' },
    { name: 'Perub Yayasan' },
    { name: 'Pecah sertifikat' },
    { name: 'Pengeringan' },
    { name: 'PBG' },
    { name: 'Peningkatan Hak' },
]
const bank = [
    { name: 'BPR BBA' },
    { name: 'BPR Pala Pusat' },
    { name: 'BPR Pala Cabang' },
    { name: 'BPR Danamas Prime' },
    { name: 'BPR Arum Mandiri' },
    { name: 'BPRS Madina Mandiri' },
    { name: 'BMT Sejahtera Ummat' },
]

const handleSubmit = async () => {
    if(newUser) {
        try {
            await client('/api/customers', {
                method: 'POST',
                body: state.value
            })
            toast.add({ severity: 'success', summary: 'Success', detail: 'Tambah konsumen berhasil!', life: 3000 })
            navigateTo('/konsumen')
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Tambah konsumen gagal!', life: 3000 })
        }
    } else {
        try {
            await client(`/api/customers/${idUser}`, {
                method: 'PUT',
                body: state.value
            })
            toast.add({ severity: 'success', summary: 'Success', detail: 'Update konsumen berhasil!', life: 3000 })
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Update konsumen gagal!', life: 3000 })
        }
        
    }
}

const handleDelete = async () => {
    await client(`/api/customers/${idUser}`, {
        method: 'DELETE'
    })
    router.back()
}

onMounted(async () => {
    if(!newUser) {
        try {
            const response = await client(`/api/customers/${idUser}`)
            state.value = { ...state.value, ...response }

            if (typeof state.value.pekerjaan === 'string') {
                try {
                    state.value.pekerjaan = JSON.parse(state.value.pekerjaan);
                } catch (error) {
                    state.value.pekerjaan = state.value.pekerjaan.split(',');
                }
            } else if (!Array.isArray(state.value.pekerjaan)) {
                state.value.pekerjaan = [];
            }
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data konsumen!', life: 3000 });
        }
    }
})
</script>
