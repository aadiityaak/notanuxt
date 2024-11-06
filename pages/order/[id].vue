<template>
    <Card class="w-full mb-4">
        <template #content>
            <div class="flex justify-between justify-center">
                <div class="w-1/2">
                    <p><Avatar shape="circle" >{{ state.customer.name.charAt(0) }} </Avatar> {{ state.customer.name }}</p>
                </div>

                <div class="w-1/2 text-right">
                    <p>{{ state.customer.alamat }}</p>
                    <p>{{ state.customer.phone }}</p>
                </div>
            </div>
        </template>
    </Card>

    <Form @submit.prevent="handleSubmit" ref="form" class="flex flex-col gap-4 w-full">
        <IftaLabel >
            <DatePicker id="order_date" name="order_date" v-model="state.order_date" class="w-full" variant="filled"/>
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
    const karyawan = ref([])
    const idOrder = useRoute().params.id
    const message = ref('')

    const handleSubmit = async () => {
        await client(`/api/orders/${idOrder}`, {
            method: 'PUT',
            body: state.value
        })
        message.value = 'Update Success'
    }

    onMounted(async () => {
        const response = await client(`/api/orders/${idOrder}`)
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