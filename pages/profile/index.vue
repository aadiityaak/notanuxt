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
            <Button label="Update" type="submit" ><Icon name="lucide:user-plus"/> Update Profile</Button>
          </form>
    </div>
</template>

<script setup lang="ts">
    const user = useSanctumUser() as any;
    const state = ref({
    email: '',
    name: '',
    });

    onMounted(() => {
    if (user.value) {
        state.value.email = user.value.email;
        state.value.name = user.value.name;
    }
    });
</script>