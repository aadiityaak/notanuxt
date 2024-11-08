<template>
  <div>
    <Avatar 
      :image="storageUrl + '/' + state.avatar" 
      shape="circle" 
      size="xlarge" 
      v-if="state.avatar" 
      class="mb-4" 
    />
    <Avatar 
      shape="circle" 
      size="xlarge" 
      v-else 
      class="mb-4"
    > 
      {{ state.name.charAt(0) }} 
    </Avatar>
    
    <Form 
      v-slot="$form" 
      ref="form"  
      :resolver="resolver" 
      :validateOnValueUpdate="true" 
      :validateOnBlur="true" 
      @submit="handleUpdate" 
      class="flex flex-col gap-4 w-full" 
      enctype="multipart/form-data"
    >
      <IftaLabel>
        <InputText id="name" name="name" v-model="state.name" class="w-full" variant="filled" />
        <label for="name">Nama</label>
        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error.message }}</Message>
      </IftaLabel>
      <IftaLabel>
        <InputText id="email" type="email" name="email" v-model="state.email" class="w-full" variant="filled" />
        <label for="email">Email</label>
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
      </IftaLabel>
      <IftaLabel>
        <InputText id="phone" name="phone" v-model="state.phone" class="w-full" variant="filled" />
        <label for="phone">No. Whatsapp</label>
        <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.phone.error.message }}</Message>
      </IftaLabel>
      <IftaLabel>
        <InputText id="address" name="address" v-model="state.address" class="w-full" variant="filled" />
        <label for="address">Alamat</label>
        <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{ $form.address.error.message }}</Message>
      </IftaLabel>
      <IftaLabel>
        <Select 
          id="position" 
          name="position" 
          v-model="state.position" 
          :options="jabatan" 
          optionLabel="name" 
          optionValue="name" 
          :aria-label="state.position" 
          class="w-full" 
          variant="filled" 
        />
        <label for="position">Jabatan</label>
      </IftaLabel>
      <IftaLabel>
        <InputText type="file" id="avatar" @change="onFileUpload" class="w-full" variant="filled" />
        <label for="avatar">Avatar</label>
      </IftaLabel>

      <IftaLabel>
        <InputText 
          type="password" 
          id="password" 
          name="password" 
          v-model="state.password" 
          class="w-full" 
          variant="filled" 
          autocomplete="new-password" 
        />
        <label for="password">Password</label>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error.message }}</Message>
        </IftaLabel>
        <IftaLabel>
          <InputText 
            type="password" 
            id="password_confirmation" 
            name="password_confirmation" 
            v-model="state.password_confirmation" 
            class="w-full" 
            variant="filled" 
            autocomplete="new-password" 
          />
          <label for="password_confirmation">Konfirmasi Password</label>
          <Message v-if="$form.password_confirmation?.invalid" severity="error" size="small" variant="simple">{{ $form.password_confirmation.error.message }}</Message>
        </IftaLabel>
      <Toast />
      <div class="flex justify-between">
        <div>
            <Button label="Back" size="small" type="button" variant="outlined" severity="primary" @click="router.back()">
                <Icon name="lucide:arrow-left" class="text-rose-700" /> Back
            </Button>
            <Button type="submit" size="small" severity="primary" variant="outlined" class="ml-2">
            <Icon name="lucide:save" class="text-rose-700"/> Save
            </Button>  
        </div>
        <Button 
            class="ml-2"
            severity="primary"
            variant="outlined"
            size="small"
            @click="deleteUser(state.id)">
            <Icon name="lucide:trash" class="text-rose-700" /> Delete
        </Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
    const toast = useToast()
    const router = useRouter()
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
    const handleUpdate = async () => {
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
    const onFileUpload = (event: any) => {
        const file = event.target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (file && validTypes.includes(file.type)) {
            state.value.avatar = file;
        } else {
            toast.add({ severity: 'error', summary: 'Invalid file type', detail: 'Please upload a valid image (JPEG, PNG, GIF).', life: 3000 });
            state.value.avatar = ''; 
        }
    };
</script>