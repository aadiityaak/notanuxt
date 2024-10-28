<template>
  <div class="menu-vertical">
    <div class="flex flex-col min-w-[240px] md:min-w-[350px] mt-4 mb-4 ms-4 h-[calc(100vh-2rem)] border border-surface-200 rounded-lg bg-white dark:bg-surface-800">
      <div class="flex items-center justify-between px-6 pt-4 shrink-0">
        <span class="inline-flex items-center gap-2">
          <span class="font-semibold text-2xl text-primary">Menu</span>
        </span>
      </div>
      <ScrollPanel class="grow min-h-[50vh]">
        <ul class="list-none px-4 m-0">
          <li>
            <div
              v-ripple
              @click="toggleSubmenu('konsumen')"
              class="p-3 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
            >
              <span class="font-medium">KONSUMEN</span>
              <LucideChevronDown v-if="isSubmenuOpen.konsumen" class="w-4 h-4" />
              <LucideChevronUp v-else class="w-4 h-4" />
            </div>
            <ul v-show="!isSubmenuOpen.konsumen" class="list-none p-0 m-0 overflow-hidden">
              <NavLink to="/konsumen" > 
                <LucideUser class="w-4 h-4 mr-2" /> List
                <span class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full" style="min-width: 1.5rem; height: 1.5rem">50</span>
              </NavLink>
              <NavLink to="/konsumen/kategori" > 
                <LucideBookUser class="w-4 h-4 mr-2" /> Kategori
              </NavLink>
            </ul>
          </li>
        </ul>
        <ul class="list-none px-4 m-0">
          <li>
            <div
              v-ripple
              @click="toggleSubmenu('order')"
              class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
            >
              <span class="font-medium">ORDER</span>
              <LucideChevronDown v-if="!isSubmenuOpen.order" class="w-4 h-4" />
              <LucideChevronUp v-else class="w-4 h-4" />
            </div>
            <ul v-show="isSubmenuOpen.order" class="list-none p-0 m-0 overflow-hidden">
              <NavLink to="/order" > 
                <LucideList class="w-4 h-4 mr-2" /> Proses Kerja
              </NavLink>
              <NavLink to="/order/kategori" >
                <LucideBookOpen class="w-4 h-4 mr-2" /> Jobdesk
              </NavLink>
            </ul>
          </li>
        </ul>
        <ul class="list-none px-4 m-0">
          <li>
            <div
              v-ripple
              @click="toggleSubmenu('option')"
              class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
            >
              <span class="font-medium">PENGATURAN</span>
              <LucideChevronDown v-if="!isSubmenuOpen.option" class="w-4 h-4" />
              <LucideChevronUp v-else class="w-4 h-4" />
            </div>
            <ul v-show="isSubmenuOpen.option" class="list-none p-0 m-0 overflow-hidden">
              <NavLink to="/option" >
                <LucideOption class="w-4 h-4 mr-2" /> Pengaturan Umum
              </NavLink>
            </ul>
          </li>
        </ul>
      </ScrollPanel>
      <div class="mt-auto">
        <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
        <a v-ripple class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
          <Avatar :image="avatarImage" shape="circle" />
          <span class="font-bold">{{ userName }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import avatarImage from '@/assets/images/girl.png'; 

export default {
  name: 'MenuVertical',
  data() {
    return {
      avatarImage,
      isSubmenuOpen: {
        favorites: false,
        application: false,
        reports: false,
        detailedReports: false,
      },
      userName: 'Nama User'
    }
  },
  mounted() {
    // Mengambil data pengguna dari local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.name; // Mengambil nama pengguna
    }
  },
  methods: {
    toggleSubmenu(menu) {
      this.isSubmenuOpen[menu] = !this.isSubmenuOpen[menu];
    }
  }
}
</script>

<style scoped>
</style>