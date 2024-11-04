<template>
    <div>
        <form @submit.prevent="handleUpdate" ref="form" >
            <FloatLabel variant="on" class="mb-4">
              <InputText id="name" v-model="state.name" class="w-full" />
              <label for="name">Nama</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-4">
              <InputText id="email" v-model="state.email" class="w-full" />
              <label for="email">Email</label>
            </FloatLabel>
            <Toast />
            <FileUpload mode="basic" name="demo[]" url="/api/avatar" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Upload Avatar" />
            <Button label="Update" type="submit" ><Icon name="lucide:user-plus"/> Update Profile</Button>
          </form>
    </div>
</template>

<script setup lang="ts">
    const client = useSanctumClient();
    const user = useSanctumUser() as any;
    const state = ref({
      email: '',
      name: '',
      avatar: '',
    });
    const message = ref('');
    const toast = useToast();

    const handleUpdate = async () => {
        await client(`/api/profile/`, {
            method: 'PUT',
            body: state.value
        })
        message.value = 'Update Success'
    }

    const onUpload = (event: any) => {
        state.value.avatar = event.files[0];
        toast.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    onMounted(() => {
      if (user.value) {
          state.value.email = user.value.email;
          state.value.name = user.value.name;
          state.value.avatar = user.value.avatar;
      }
    });
</script>