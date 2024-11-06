<template>

    <div class="flex justify-between justify-center mb-4 bg-slate-50 dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-md">
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
        <div>
            <Toast />
            <Button label="Update" type="submit"><Icon name="lucide:user-plus"/> Simpan</Button>
        </div>
    </Form>
</template>

<script setup lang="ts">
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
    
    const idOrder = useRoute().params.id
    const toast = useToast()

    const handleSubmit = async () => {
        await client(`/api/orders/${idOrder}`, {
            method: 'PUT',
            body: state.value
        })
        toast.add({ severity: 'success', summary: 'Success', detail: 'Update order berhasil!', life: 3000 })
    }

    onMounted(async () => {
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
    })

    definePageMeta({
        title: 'Kelola Order',
    })

</script>