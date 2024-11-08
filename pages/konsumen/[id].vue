<template>
    <Form v-slot="$form" ref="form"  :resolver :validateOnValueUpdate="true" :validateOnBlur="true" @submit="handleSubmit" class="flex flex-col gap-4 w-full">
        <IftaLabel class="mb-3">
            <InputText id="name" name="name" v-model="state.name" class="w-full" variant="filled" />
            <label for="name">Nama Lengkap</label>
            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputText id="phone" name="phone" v-model="state.phone" class="w-full" variant="filled"/>
            <label for="phone">No. Whatsapp</label>
            <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.phone.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputText id="alamat" name="alamat" v-model="state.alamat" class="w-full" variant="filled"/>
            <label for="alamat">Alamat</label>
            <Message v-if="$form.alamat?.invalid" severity="error" size="small" variant="simple">{{ $form.alamat.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <Select id="kategori" name="kategori" v-model="state.kategori" :options="kategori" optionLabel="name" optionValue="name" :aria-label="state.kategori" class="w-full" variant="filled" />
            <label for="kategori">Kategori</label>
            <Message v-if="$form.kategori?.invalid" severity="error" size="small" variant="simple">{{ $form.kategori.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="state.kategori === 'Bank'">
            <Select id="bank" v-model="state.bank" :options="bank" optionLabel="name" optionValue="name" class="w-full" variant="filled"/>
            <label for="bank">Bank</label>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="state.kategori === 'Perorangan'">
            <MultiSelect id="pekerjaan" v-model="state.pekerjaan" :options="pekerjaan" optionLabel="name" optionValue="name" filter class="w-full" variant="filled"/>
            <label for="pekerjaan">Pekerjaan</label>
        </IftaLabel>
        <IftaLabel class="mb-3">
            <InputText id="sertifikat" name="sertifikat" v-model="state.sertifikat" class="w-full" variant="filled"/>
            <label for="sertifikat">Sertifikat</label>
            <Message v-if="$form.sertifikat?.invalid" severity="error" size="small" variant="simple">{{ $form.sertifikat.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="canSee">
            <InputNumber mode="currency" name="nilai_transaksi" currency="IDR" locale="id-ID" id="nilai_transaksi" v-model="state.nilai_transaksi" class="w-full" type="number" variant="filled"/>
            <label for="nilai_transaksi">Nilai Transaksi</label>
            <Message v-if="$form.nilai_transaksi?.invalid" severity="error" size="small" variant="simple">{{ $form.nilai_transaksi.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="canSee">
            <InputNumber mode="currency" name="harga_real" currency="IDR" locale="id-ID" id="harga_real" v-model="state.harga_real" class="w-full" type="number" variant="filled"/>
            <label for="harga_real">Harga Real</label>
            <Message v-if="$form.harga_real?.invalid" severity="error" size="small" variant="simple">{{ $form.harga_real.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="canSee">
            <InputNumber mode="currency" name="harga_kesepakatan" currency="IDR" locale="id-ID" id="harga_kesepakatan" v-model="state.harga_kesepakatan" class="w-full" type="number" variant="filled" />
            <label for="harga_kesepakatan">Harga Kesepakatan</label>
            <Message v-if="$form.harga_kesepakatan?.invalid" severity="error" size="small" variant="simple">{{ $form.harga_kesepakatan.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="canSee">
            <InputNumber mode="currency" name="data_pajak_pembeli" currency="IDR" locale="id-ID" id="data_pajak_pembeli" v-model="state.data_pajak_pembeli" class="w-full" type="number" variant="filled" />
            <label for="data_pajak_pembeli">Data Pajak Pembeli</label>
            <Message v-if="$form.data_pajak_pembeli?.invalid" severity="error" size="small" variant="simple">{{ $form.data_pajak_pembeli.error.message }}</Message>
        </IftaLabel>
        <IftaLabel class="mb-3" v-if="canSee">
            <InputNumber mode="currency" name="data_pajak_penjual" currency="IDR" locale="id-ID" id="data_pajak_penjual" v-model="state.data_pajak_penjual" class="w-full" type="number" variant="filled" />
            <label for="data_pajak_penjual">Data Pajak Penjual</label>
            <Message v-if="$form.data_pajak_penjual?.invalid" severity="error" size="small" variant="simple">{{ $form.data_pajak_penjual.error.message }}</Message>
        </IftaLabel>
        <Toast />
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
        <div class="flex justify-between">
            <div>
                <Button label="Back" size="small" type="button" variant="outlined" severity="primary" @click="router.back()">
                    <Icon name="lucide:arrow-left" class="text-rose-700" /> Back
                </Button>
                <Button label="Save" size="small" type="submit" variant="outlined" severity="primary" class="ml-2">
                    <Icon name="lucide:user-plus" class="text-rose-700" /> {{ newUser ? 'Tambah Konsumen' : 'Update Konsumen' }}
                </Button>
            </div>
            <Button label="Delete" size="small" variant="outlined" severity="primary" @click="deleteKonsumen(state.id)">
                <Icon name="lucide:trash" variant="outline" class="text-rose-700" /> Delete
            </Button>
        </div>
    </Form>
</template>

<script setup lang="ts">
const user = useSanctumUser() as any
const router = useRouter()
const client = useSanctumClient()
const toast = useToast()
const confirm = useConfirm()
const idUser = useRoute().params.id
const newUser = idUser == 'new'
definePageMeta({
    title: 'Kelola Konsumen'
})
const canSee = computed(() => {
    return user.value.is_admin === 1 || user.value.position === 'Keuangan'
})
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
} as any)
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
            const response = await client('/api/customers', {
                method: 'POST',
                body: state.value
            })
            toast.add({ severity: 'success', summary: 'Success', detail: 'Tambah konsumen berhasil!', life: 3000 })
            navigateTo(`/order/new?customer=${response.id}`)
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

const deleteKonsumen = async (id: number) => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus konsumen ini?',
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
      await client(`/api/customers/${id}`, {
        method: 'DELETE',
      });
      router.back();
    },
  })
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
