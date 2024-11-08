<template>
  <div>
    <Avatar 
      :image="storageUrl + '/' + userStore.user.avatar" 
      shape="circle" 
      size="xlarge" 
      v-if="userStore.user && userStore.user.avatar !== null" 
      class="mb-4" 
    />
    <Avatar 
      shape="circle" 
      size="xlarge" 
      v-else 
      class="mb-4"
    > 
      {{ userStore.user.name.charAt(0) }} 
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

      <Toast />
      <div>
        <Button label="Update" type="submit">
          <Icon name="lucide:user-plus" /> Update Profile
        </Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Profile',
});

const config = useSanctumConfig();
const storageUrl = config.baseUrl + '/storage';
const userStore = useUserStore();
const client = useSanctumClient();
const user = useSanctumUser() as any;

const jabatan = [
  { name: 'Manager' },
  { name: 'Staff' },
  { name: 'Karyawan' },
  { name: 'Owner' },
  { name: 'Keuangan' },
  { name: 'Supervisor' },
];

const state = ref({
  email: '',
  name: '',
  avatar: '',
  phone: '',
  address: '',
  position: '',
});

const toast = useToast();

const resolver = () => {
  const errors = {} as any;

  if (!state.value.name) {
    errors.name = [{ message: 'Nama Lengkap wajib diisi' }];
  }
  if (!state.value.email) {
    errors.email = [{ message: 'Email wajib diisi' }];
  } else if (!/\S+@\S+\.\S+/.test(state.value.email)) {
    errors.email = [{ message: 'Email tidak valid' }];
  }
  if (!state.value.phone) {
    errors.phone = [{ message: 'No. Whatsapp wajib diisi' }];
  }
  if (!state.value.address) {
    errors.address = [{ message: 'Alamat wajib diisi' }];
  }
  
  return { errors };
};

const handleUpdate = async ({ valid }) => {
  if (!valid) return;

  try {
    const formData = new FormData();
    for (const key in state.value) {
      formData.append(key, state.value[key]);
    }

    const response = await client(`/api/profile/`, {
      method: 'PUT',
      body: formData
    });

    userStore.setUser({
      name: state.value.name,
      avatar: response.user.avatar, 
    });

    toast.add({ severity: 'success', summary: 'Success', detail: 'Update profil berhasil!', life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Update profil gagal!', life: 3000 });
  }
};

onMounted(() => {
  if (user.value) {
    state.value = { ...state.value, ...user.value };
  }
});

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