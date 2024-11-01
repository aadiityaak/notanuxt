<template>
  <form @submit.prevent="handleRegister" ref="form" class="max-w-[400px] w-full mx-auto rounded-lg border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800 p-4" >
      <FloatLabel variant="on" class="mb-4">
          <InputText id="name" v-model="state.name" class="w-full" />
          <label for="name">Nama</label>
      </FloatLabel>
      <FloatLabel variant="on" class="mb-4">
          <InputText id="email" v-model="state.email" class="w-full" />
          <label for="email">Email</label>
      </FloatLabel>
      <FloatLabel variant="on" class="mb-4">
          <InputText type="password" id="password" v-model="state.password" class="w-full" />
          <label for="password">Password</label>
      </FloatLabel>
      <FloatLabel variant="on" class="mb-4">
          <InputText type="password" id="password_confirmation" v-model="state.password_confirmation" class="w-full" />
          <label for="password_confirmation">Konfirmasi Password</label>
      </FloatLabel>
      <Button label="Register" type="submit" class="mt-4"><LucideLogIn /> Register</Button>
  </form>
</template>

<script setup lang="ts">
const sanctumConfig = useSanctumConfig()
const sanctumFetch = useSanctumClient()
const { refreshIdentity } = useSanctumAuth()

const form = ref<HTMLFormElement>()
const state = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})
async function handleRegister() {
  const credentials = {
    name: state.value.name,
    email: state.value.email,
    password: state.value.password,
    password_confirmation: state.value.password_confirmation
  }
  try {
    const response = await sanctumFetch('/register', {
      method: 'POST',
      body: credentials
    })
    console.log('Registration response:', response) // Debugging line
    await refreshIdentity()
    navigateTo(sanctumConfig.redirect.onGuestOnly || '/')
  } catch (err: any) {
    console.log('Error during registration:', err) // Debugging line
  }
}
</script>