import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: '',
    avatar: '',
  });

  function setUser(data: { name: string; avatar?: string }) {
    user.value.name = data.name;
    if (data.avatar) user.value.avatar = data.avatar;
  }

  return { user, setUser };
});