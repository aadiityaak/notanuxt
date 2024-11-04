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
            <InputText id="address" v-model="state.address" class="w-full" />
            <label for="address">Alamat</label>
        </FloatLabel>

        <Button label="Update" type="submit" class="mt-4"><Icon name="lucide:user-plus"/> Update Data Karyawan</Button>
    </form>
</template>

<script setup lang="ts">
    const state = ref({
        name: '',
        phone: '',
        address: '',
    })
    const client = useSanctumClient()
    const karyawan = ref([])
    const idUser = useRoute().params.id
    const message = ref('')

    const handleSubmit = async () => {
        await client(`/api/karyawans/${idUser}`, {
            method: 'PUT',
            body: state.value
        })
        message.value = 'Update Success'
    }

    onMounted(async () => {
        const response = await client(`/api/karyawans/${idUser}`)
        state.value = response
    })

    definePageMeta({
        title: 'Edit Data Karyawan',
    })

</script>