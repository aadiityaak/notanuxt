<template>
  <div>
    <Avatar :image="storageUrl + '/' + userStore.user.avatar" shape="circle" size="xlarge" class="mb-4" />
    <!-- <form @submit="handleUpdate" ref="form" enctype="multipart/form-data"> -->
      <Form v-slot="$form" ref="form"  :resolver :validateOnValueUpdate="true" :validateOnBlur="true" @submit="handleUpdate" class="flex flex-col gap-4 w-full" enctype="multipart/form-data">
      <IftaLabel variant="on">
        <InputText id="name" name="name" v-model="state.name" class="w-full" />
        <label for="name">Nama</label>
        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error.message }}</Message>
      </IftaLabel>
      <IftaLabel variant="on">
        <InputText id="email" name="email" v-model="state.email" class="w-full" />
        <label for="email">Email</label>
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
      </IftaLabel>
      <IftaLabel>
        <InputText type="file" id="avatar" @change="onFileUpload" class="w-full" />
        <label for="avatar">Avatar</label>
      </IftaLabel>
      <Toast />
      <div>
        <Button label="Update" type="submit"><Icon name="lucide:user-plus" /> Update Profile</Button>
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

const state = ref({
  email: '',
  name: '',
  avatar: '',
});
const toast = useToast();

const resolver = () => {
    const errors = {} as any;
    if (!state.value.name) {
        errors.name = [{ message: 'Nama Lengkap wajib diisi' }];
    }
    if (!state.value.email) {
        errors.email = [{ message: 'Email wajib diisi' }];
    }


    return { errors };
}

const handleUpdate = async ({ valid }) => {
  if(!valid) return
  try {
    const formData = new FormData();
    formData.append('email', state.value.email);
    formData.append('name', state.value.name);
    
    if (state.value.avatar && typeof state.value.avatar === 'object') {
      formData.append('avatar', state.value.avatar);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await client(`/api/profile/`, {
      method: 'PUT',
      body: formData,
    });

    userStore.setUser({
      name: state.value.name,
      email: state.value.email,
      avatar: response.user.avatar, 
    });

    toast.add({ severity: 'success', summary: 'Success', detail: 'Update profil berhasil!', life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Update profil gagal!', life: 3000 });
  }
};

onMounted(() => {
  if (user.value) {
    state.value.email = user.value.email;
    state.value.name = user.value.name;
    state.value.avatar = user.value.avatar;
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