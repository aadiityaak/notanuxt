<template>
  <div>
    <form @submit.prevent="handleUpdate" ref="form">
      <FloatLabel variant="on" class="mb-4">
        <InputText id="name" v-model="state.name" class="w-full" />
        <label for="name">Nama</label>
      </FloatLabel>
      <FloatLabel variant="on" class="mb-4">
        <InputText id="email" v-model="state.email" class="w-full" />
        <label for="email">Email</label>
      </FloatLabel>
      <Toast />
      <FileUpload ref="fileupload" mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
      <Button label="Update" type="submit"><Icon name="lucide:user-plus" /> Update Profile</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const client = useSanctumClient();
const user = useSanctumUser() as any;

const state = ref({
  email: userStore.user.email,
  name: userStore.user.name,
  avatar: userStore.user.avatar,
});
const message = ref('');
const toast = useToast();

const handleUpdate = async () => {
  try {
    await client(`/api/profile/`, {
      method: 'PUT',
      body: state.value,
    });
    userStore.setUser(state.value); // Update userStore dengan data baru
    message.value = 'Update Success';
    toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!', life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Update failed. Please try again.', life: 3000 });
  }
};

const onUpload = (event: any) => {
  state.value.avatar = event.files[0];
  toast.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

onMounted(() => {
  if (user.value) {
    state.value.email = user.value.email;
    state.value.name = user.value.name;
    state.value.avatar = user.value.avatar;
  }
});
</script>
