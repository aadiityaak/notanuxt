<template>
  <form @submit.prevent="handleLogin" ref="form" class="max-w-[400px] w-full mx-auto rounded-lg border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800 p-4" >
      <FloatLabel variant="on" class="mb-4">
          <InputText id="email" v-model="state.email" class="w-full" />
          <label for="email">Email</label>
      </FloatLabel>
      <FloatLabel variant="on" class="mb-4">
          <InputText type="password" id="password" v-model="state.password" class="w-full" />
          <label for="password">Password</label>
      </FloatLabel>
      <Button label="Register" type="submit" ><Icon name="lucide:log-in"/> Login</Button>
  </form>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['sanctum:guest'],
  })
  const sanctumConfig = useSanctumConfig()
  const sanctumFetch = useSanctumClient()
  const { refreshIdentity } = useSanctumAuth()

  const form = ref<HTMLFormElement>()
  const state = ref({
    email: '',
    password: '',
  })
  async function handleLogin() {
    const credentials = {
      email: state.value.email,
      password: state.value.password,
    }
    try {
      const response = await sanctumFetch('/login', {
        method: 'POST',
        body: credentials
      })
      await refreshIdentity()
      navigateTo(sanctumConfig.redirect.onGuestOnly || '/dashboard')
    } catch (err: any) {
    }
  }
</script>
