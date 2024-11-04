import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    email: '',
    name: '',
    avatar: '',
  });

  function setUser(data: { email: string; name: string; avatar?: string }) {
    user.value.email = data.email;
    user.value.name = data.name;
    if (data.avatar) user.value.avatar = data.avatar;
  }

  return { user, setUser };
});