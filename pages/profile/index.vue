<template>
  <div>
    <form @submit.prevent="handleUpdate" ref="form" enctype="multipart/form-data">
      <FloatLabel variant="on" class="mb-4">
        <InputText id="name" v-model="state.name" class="w-full" />
        <label for="name">Nama</label>
      </FloatLabel>
      <FloatLabel variant="on" class="mb-4">
        <InputText id="email" v-model="state.email" class="w-full" />
        <label for="email">Email</label>
      </FloatLabel>
      <Toast />
      <IftaLabel class="mb-4">
        <InputText type="file" id="avatar" v-model="state.avatar" class="w-full" @change="onFileUpload"/>
        <label for="avatar">Avatar</label>
      </IftaLabel>
      <Button label="Update" type="submit"><Icon name="lucide:user-plus" /> Update Profile</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
  definePageMeta ({
    title: 'Profile',
  })
  import { useUserStore } from '~/stores/user';

  const userStore = useUserStore();
  const client = useSanctumClient();
  const user = useSanctumUser() as any;

  const state = ref({
    email: '',
    name: '',
    avatar: '',
  });
  const toast = useToast();

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('email', state.value.email);
      formData.append('name', state.value.name);
      if (state.value.avatar) {
        formData.append('avatar', state.value.avatar);
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await client(`/api/profile/`, {
        method: 'PUT',
        body: formData,
      });

      userStore.setUser({
        name: state.value.name,
        email: state.value.email,
        avatar: state.value.avatar,
      });

      toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!', life: 3000 });
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Update failed. Please try again.', life: 3000 });
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
