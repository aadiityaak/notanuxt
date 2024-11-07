<template>
    <form @submit.prevent="handleSubmit" ref="form" class="flex flex-col gap-4 w-full">
        <IftaLabel>
            <InputText name="name" id="name" v-model="state.name" class="w-full" variant="filled"/>
            <label for="name">Nama Lengkap</label>
        </IftaLabel>
        <IftaLabel>
            <InputText name="phone" id="phone" v-model="state.phone" class="w-full" variant="filled"/>
            <label for="phone">No. Whatsapp</label>
        </IftaLabel>
        <IftaLabel>
            <InputText name="address" id="address" v-model="state.address" class="w-full" variant="filled"/>
            <label for="address">Alamat</label>
        </IftaLabel>
        <IftaLabel>
            <Select id="position" name="position" v-model="state.position" :options="jabatan" optionLabel="name" optionValue="name" :aria-label="state.position" class="w-full" variant="filled" />
            <label for="position">Jabatan</label>
        </IftaLabel>
        <IftaLabel>
            <InputText name="email" id="email" v-model="state.email" class="w-full" variant="filled"/>
            <label for="email">Email</label>
        </IftaLabel>
        <div>
            <Toast />
            <Button label="Update" type="submit"><Icon name="lucide:user-plus"/> Update Data Karyawan</Button>
        </div>
    </form>
</template>

<script setup lang="ts">
    const toast = useToast()
    const jabatan = [
        { name: 'Manager' },
        { name: 'Staff' },
        { name: 'Karyawan' },
        { name: 'Owner' },
        { name: 'Keuangan' },
    ]
    const state = ref({
        name: '',
        phone: '',
        address: '',
        position: '',
        email: '',
    })
    const client = useSanctumClient()
    const idUser = useRoute().params.id
    const message = ref('')

    const handleSubmit = async () => {
        try {
            const response = await client(`/api/karyawans/${idUser}`, {
                method: 'PUT',
                body: state.value
            })
            toast.add({ severity: 'success', summary: 'Success', detail: 'Update karyawan berhasil!', life: 3000 })
        }
        catch (error : any) {
            if (error.response.status === 403) {
                message.value = 'Anda tidak memiliki akses untuk mengupdate data karyawan ini.'
            } else {
                message.value = 'Terjadi kesalahan.'
            }
            toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
        }
    }

    onMounted(async () => {
        const response = await client(`/api/karyawans/${idUser}`)
        state.value = response
    })

    definePageMeta({
        title: 'Edit Data Karyawan',
    })

</script>