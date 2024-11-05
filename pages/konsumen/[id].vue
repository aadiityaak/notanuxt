<template>
    <Form v-slot="$form" ref="form"  :resolver :validateOnValueUpdate="true" :validateOnBlur="true" @submit="handleSubmit" class="flex flex-col gap-4 w-full">
        <IftaLabel class="mb-3">
            <InputText id="name" name="name" v-model="state.name" class="w-full" />
            <label for="name">Nama Lengkap</label>
            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputText id="phone" name="phone" v-model="state.phone" class="w-full" />
            <label for="phone">No. Whatsapp</label>
            <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.phone.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputText id="alamat" name="alamat" v-model="state.alamat" class="w-full" />
            <label for="alamat">Alamat</label>
            <Message v-if="$form.alamat?.invalid" severity="error" size="small" variant="simple">{{ $form.alamat.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <Select id="kategori" name="kategori" v-model="state.kategori" :options="kategori" optionLabel="name" optionValue="name" :aria-label="state.kategori" class="w-full" />
            <label for="kategori">Kategori</label>
            <Message v-if="$form.kategori?.invalid" severity="error" size="small" variant="simple">{{ $form.kategori.error.message }}</Message>
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
            <InputText id="sertifikat" name="sertifikat" v-model="state.sertifikat" class="w-full" />
            <label for="sertifikat">Sertifikat</label>
            <Message v-if="$form.sertifikat?.invalid" severity="error" size="small" variant="simple">{{ $form.sertifikat.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" name="nilai_transaksi" currency="IDR" locale="id-ID" id="nilai_transaksi" v-model="state.nilai_transaksi" class="w-full" type="number" />
            <label for="nilai_transaksi">Nilai Transaksi</label>
            <Message v-if="$form.nilai_transaksi?.invalid" severity="error" size="small" variant="simple">{{ $form.nilai_transaksi.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" name="harga_real" currency="IDR" locale="id-ID" id="harga_real" v-model="state.harga_real" class="w-full" type="number" />
            <label for="harga_real">Harga Real</label>
            <Message v-if="$form.harga_real?.invalid" severity="error" size="small" variant="simple">{{ $form.harga_real.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" name="harga_kesepakatan" currency="IDR" locale="id-ID" id="harga_kesepakatan" v-model="state.harga_kesepakatan" class="w-full" type="number" />
            <label for="harga_kesepakatan">Harga Kesepakatan</label>
            <Message v-if="$form.harga_kesepakatan?.invalid" severity="error" size="small" variant="simple">{{ $form.harga_kesepakatan.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" name="data_pajak_pembeli" currency="IDR" locale="id-ID" id="data_pajak_pembeli" v-model="state.data_pajak_pembeli" class="w-full" type="number" />
            <label for="data_pajak_pembeli">Data Pajak Pembeli</label>
            <Message v-if="$form.data_pajak_pembeli?.invalid" severity="error" size="small" variant="simple">{{ $form.data_pajak_pembeli.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputNumber mode="currency" name="data_pajak_penjual" currency="IDR" locale="id-ID" id="data_pajak_penjual" v-model="state.data_pajak_penjual" class="w-full" type="number" />
            <label for="data_pajak_penjual">Data Pajak Penjual</label>
            <Message v-if="$form.data_pajak_penjual?.invalid" severity="error" size="small" variant="simple">{{ $form.data_pajak_penjual.error.message }}</Message>
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
    </Form>
</template>

<script setup lang="ts">
import { Message } from 'primevue';

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
const resolver = () => {
    const errors = {} as any;
    if (!state.value.name) {
        errors.name = [{ message: 'Nama Lengkap wajib diisi' }];
    }
    if (!state.value.phone) {
        errors.phone = [{ message: 'No. whatsapp wajib diisi' }];
    }
    if (!state.value.alamat) {
        errors.alamat = [{ message: 'Alamat wajib diisi' }];
    }
    if (!state.value.kategori) {
        errors.kategori = [{ message: 'Pilih salah satu kategori' }];
    }
    if (!state.value.sertifikat) {
        errors.sertifikat = [{ message: 'Sertifikat wajib diisi' }];
    }
    if (!state.value.nilai_transaksi) {
        errors.nilai_transaksi = [{ message: 'Nilai Transaksi wajib diisi' }];
    }
    if (!state.value.harga_real) {
        errors.harga_real = [{ message: 'Harga Real wajib diisi' }];
    }
    if (!state.value.harga_kesepakatan) {
        errors.harga_kesepakatan = [{ message: 'Harga Kesepakatan wajib diisi' }];
    }
    if (!state.value.data_pajak_pembeli) {
        errors.data_pajak_pembeli = [{ message: 'Data Pajak Pembeli wajib diisi' }];
    }
    if (!state.value.data_pajak_penjual) {
        errors.data_pajak_penjual = [{ message: 'Data Pajak Penjual wajib diisi' }];
    }

    return { errors };
}

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

const handleSubmit = async ({ valid }) => {
    if(!valid) return
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
            navigateTo('/konsumen')
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
