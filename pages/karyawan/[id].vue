<template>
    <div>
        <form @submit.prevent="handleSubmit" ref="form" class="flex flex-col gap-4 w-full">
            <div class="text-center">
                <Avatar v-if="src" :image="src" shape="circle" size="xlarge" class="mb-4" />
                <Avatar v-else shape="circle" size="xlarge" class="mb-4" > {{ state.name.charAt(0) }} </Avatar>
                <InputText type="file" name="avatar" id="avatar" @change="onFileUpload" accept="image/*" size="small" 
                @select="onFileSelect" customUpload auto severity="secondary" 
                class="p-button-outlined"
                :pt="{
                    Button: 'w-full'
                }"
                />
                <div v-if="state.is_admin === 1" class="text-rose-700 font-bold mb-4"><Icon name="lucide:verified" /> Administrator</div>
            </div>
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
            <div class="flex justify-between">
                <div>
                    <Button label="Back" variant="outlined" size="small" severity="primary"><Icon name="lucide:arrow-left" class="text-rose-700"/> Back</Button>
                    <Button label="Update" type="submit" variant="outlined" size="small" severity="primary" class="ml-2"><Icon name="lucide:save" class="text-rose-700"/> Save</Button>
                </div>
                <Button label="Delete" variant="outlined" size="small" severity="danger" @click="deleteUser(state.id)"><Icon name="lucide:trash" class="text-rose-700"/> Delete</Button>
            </div>
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
        </form>
    </div>
</template>

<script setup lang="ts">
import type { Button } from 'primevue';

    const toast = useToast()
    const confirm = useConfirm()
    const jabatan = [
        { name: 'Manager' },
        { name: 'Staff' },
        { name: 'Karyawan' },
        { name: 'Owner' },
        { name: 'Keuangan' },
        { name: 'Supervisor' },
    ]
    const state = ref({
        name: '',
        phone: '',
        address: '',
        position: '',
        email: '',
        id: '',
        avatar: '',
    } as any)
    const config = useSanctumConfig()
    const storageUrl = config.baseUrl + '/storage';
    const client = useSanctumClient()
    const idUser = useRoute().params.id
    const message = ref('')
    const src = ref('')
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
    function onFileSelect(event) {
        const file = event.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            src.value = e.target.result;
        };

        reader.readAsDataURL(file);
    }
    const deleteUser = async (id: string) => {
        confirm.require({
            message: 'Apakah Anda yakin ingin menghapus karyawan ini?',
            header: 'Konfirmasi',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    await client(`/api/karyawans/${id}`, {
                        method: 'DELETE',
                    })
                    toast.add({ severity: 'success', summary: 'Success', detail: 'Hapus karyawan berhasil!', life: 3000 })
                    navigateTo('/karyawan')
                } catch (error : any) {
                    if (error.response.status === 403) {
                        message.value = 'Anda tidak memiliki akses untuk menghapus data karyawan ini.'
                    } else {
                        message.value = 'Terjadi kesalahan.'
                    }
                    toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
                }
            }
        })
    }
    onMounted(async () => {
        const response = await client(`/api/karyawans/${idUser}`)
        state.value = response
    })
    definePageMeta({
        title: 'Edit Data Karyawan',
    })

</script>