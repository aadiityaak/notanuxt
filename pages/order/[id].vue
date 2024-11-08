<template>

    <div v-if="!newOrder" class="flex justify-between justify-center mb-4 bg-slate-50 dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-md">
        <div>
            <Avatar shape="circle" >{{ state.customer.name.charAt(0) }} </Avatar>
        </div>
        <div class="grow text-left ml-2 ">
            <p>
                <b>{{ state.customer.name }}</b><br/>
                {{ state.customer.alamat }} <br/>
                {{ state.customer.phone }}
            </p>
        </div>
    </div>

    <Form @submit="handleSubmit" ref="form" class="flex flex-col gap-4 w-full">
        <IftaLabel >
            <DatePicker id="order_date" name="order_date" v-model="state.order_date" class="w-full" variant="filled" dateFormat="d MM yy" />
            <label for="order_date">Tanggal Order</label>
        </IftaLabel>
        <IftaLabel >
            <InputText id="service" name="service" v-model="state.service" class="w-full" variant="filled"/>
            <label for="service">Layanan</label>
        </IftaLabel>
        <IftaLabel >
            <InputNumber mode="currency" name="price" currency="IDR" locale="id-ID" id="price" v-model="state.price" class="w-full" type="number" variant="filled" />
            <label for="price">Biaya</label>
        </IftaLabel>
        <IftaLabel >
            <InputNumber mode="currency" name="paid" currency="IDR" locale="id-ID" id="paid" v-model="state.price" class="w-full" type="number" variant="filled" />
            <label for="paid">Dibayar</label>
        </IftaLabel>
        <IftaLabel >
            <Select id="payment_method" name="payment_method" v-model="state.payment_method" :options="paymentMethod" optionLabel="name" optionValue="name" class="w-full" variant="filled" />
            <label for="payment_method">Metode Bayar</label>
        </IftaLabel>
        <IftaLabel >
            <MultiSelect id="document" v-model="state.document" :options="documentOptions" optionLabel="name" optionValue="name" filter class="w-full" variant="filled"/>
            <label for="document">Dokumen</label>
        </IftaLabel>
        <Toast />
        <div class="flex justify-between">
            <div>
                <Button label="Back" size="small" type="button" variant="outlined" severity="primary" @click="router.back()">
                    <Icon name="lucide:arrow-left" class="text-rose-700" /> Back
                </Button>
                <Button label="Save" size="small" type="submit" variant="outlined" severity="primary" class="ml-2">
                    <Icon name="lucide:save" class="text-rose-700" /> Save
                </Button>
            </div>
            <Button label="Delete" size="small" variant="outlined" severity="primary" @click="deleteOrder(state.id)">
                <Icon name="lucide:trash" variant="outline" class="text-rose-700" /> Delete
            </Button>
        </div>
    </Form>
</template>

<script setup lang="ts">
    const idOrder = useRoute().params.id
    const toast = useToast()
    const router = useRouter()
    const confirm = useConfirm()
    const newOrder = idOrder == 'new'
    definePageMeta({
        title: 'Kelola Order',
    })
    const state = ref({
        order_date: '',
        service: '',
        price: 0,
        paid: 0,
        payment_method: '',
        document: [],
        customer: {
            name: '',
            alamat: '',
            phone: '',
        }
    } as any)
    const paymentMethod = ref([
        { name: 'Tunai' },
        { name: 'Transfer' },
    ])
    const documentOptions = ref([
        { name: 'KTP' },
        { name: 'KK' },
        { name: 'PBB' },
        { name: 'NPWP' },
        { name: 'SIUP' },
        { name: 'AKTA' },
        { name: 'SERTIFIKAT' },
    ])
    const client = useSanctumClient()

    const handleSubmit = async () => {
        await client(`/api/orders/${idOrder}`, {
            method: 'PUT',
            body: state.value
        })
        toast.add({ severity: 'success', summary: 'Success', detail: 'Update order berhasil!', life: 3000 })
    }
    const deleteOrder = async (id: number) => {
        await confirm.require({
            message: 'Apakah anda yakin ingin menghapus order ini?',
            header: 'Konfirmasi hapus order',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
                try {
                    await client(`/api/orders/${id}`, {
                        method: 'DELETE',
                    })
                    toast.add({ severity: 'success', summary: 'Success', detail: 'Hapus order berhasil!', life: 3000 })
                    router.push('/order')
                } catch (error) {
                    toast.add({ severity: 'error', summary: 'Error', detail: 'Hapus order gagal!', life: 3000 })
                }
            },
        })
    }
    onMounted(async () => {
        if(!newOrder) {
            const response = await client(`/api/orders/${idOrder}`)
            // ganti format order_date
            const date = new Date(response.order_date)
            response.order_date = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
            state.value = { ...state.value, ...response }
            if (typeof state.value.document === 'string') {
                try {
                    state.value.document = JSON.parse(state.value.document);
                } catch (error) {
                    state.value.document = state.value.document.split(',');
                }
            } else if (!Array.isArray(state.value.document)) {
                state.value.document = [];
            }
        }

    })

</script>