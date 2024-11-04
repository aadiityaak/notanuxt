<template>
  <Message severity="error" class="mb-4 max-w-[400px] w-full mx-auto" v-if="route.query.redirect && route.query.redirect !== '/'">
    Hmmm, sepertinya anda mencoba mengakses halaman
    <em>"{{ route.query.redirect }}"</em>, silahkan login terlebih dahulu
    untuk melanjutkan.
  </Message>
  <Message severity="error" class="mb-4 max-w-[400px] w-full mx-auto" v-if="loginError">
    {{ loginError }}
  </Message>
  <form @submit.prevent="handleLogin" ref="form" class="max-w-[400px] w-full mx-auto rounded-lg border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800 p-4" >
      <FloatLabel variant="on" class="mb-4">
          <InputText id="email" v-model="credentials.email" class="w-full" />
          <label for="email">Email</label>
      </FloatLabel>
      <FloatLabel variant="on" class="mb-4">
          <InputText type="password" id="password" v-model="credentials.password" class="w-full" />
          <label for="password">Password</label>
      </FloatLabel>
      <Button label="Login" type="submit" ><Icon name="lucide:log-in"/> Login</Button>

      <div class="flex justify-between mt-4">
        <NuxtLink to="/register" class="text-sm text-surface-900 dark:text-surface-300">Belum punya akun? Daftar</NuxtLink>
        <NuxtLink to="/forgot-password" class="text-sm text-surface-900 dark:text-surface-300">Lupa Password?</NuxtLink>
      </div>
  </form>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Login',
  })
  const { login } = useSanctumAuth()
  const route = useRoute()

  const credentials = ref({
    email: '',
    password: '',
  })

  const loginError = ref('')

  async function handleLogin() {
    try {
      await login(credentials.value)
      loginError.value = ''
    }
    catch (err: any) {
      loginError.value = err.response._data.message
    }
  }

</script>
