<template>
  <div class="menu-vertical">
    <div class="flex flex-col h-full min-w-[240px] md:min-w-[350px] m-4 h-[calc(100vh-2rem)] border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800 rounded-lg">
      <div class="flex items-center justify-between px-6 pt-4 shrink-0">
        <span class="inline-flex items-center gap-2">
          <span class="font-semibold text-2xl text-primary">Menu</span>
        </span>
      </div>
      <ScrollPanel class="flex-grow-1 min-h-[50vh]">
        <ul class="list-none px-4 m-0">
          <li>
            <div
              v-ripple
              @click="toggleSubmenu('favorites')"
              class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
            >
              <span class="font-medium">FAVORITES</span>
              <LucideChevronDown v-if="isSubmenuOpen.favorites" class="w-4 h-4" />
              <LucideChevronUp v-else class="w-4 h-4" />
            </div>
            <ul v-show="!isSubmenuOpen.favorites" class="list-none p-0 m-0 overflow-hidden">
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideChartBar class="w-4 h-4 mr-2" />
                  <span class="font-medium">Dashboard</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideBookmark class="w-4 h-4 mr-2" />
                  <span class="font-medium">Bookmarks</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideUser2 class="w-4 h-4 mr-2" />
                  <span class="font-medium">Team</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideInbox class="w-4 h-4 mr-2" />
                  <span class="font-medium">Messages</span>
                  <span class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full" style="min-width: 1.5rem; height: 1.5rem">3</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideCalendar class="w-4 h-4 mr-2" />
                  <span class="font-medium">Calendar</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideSettings class="w-4 h-4 mr-2" />
                  <span class="font-medium">Settings</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="list-none px-4 m-0">
          <li>
            <div
              v-ripple
              @click="toggleSubmenu('application')"
              class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
            >
              <span class="font-medium">APPLICATION</span>
              <LucideChevronDown v-if="!isSubmenuOpen.application" class="w-4 h-4" />
              <LucideChevronUp v-else class="w-4 h-4" />
            </div>
            <ul v-show="isSubmenuOpen.application" class="list-none p-0 m-0 overflow-hidden">
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideFileText class="w-4 h-4 mr-2" />
                  <span class="font-medium">Projects</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideChartBarBig class="w-4 h-4 mr-2" />
                  <span class="font-medium">Performance</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                  <LucideSettings class="w-4 h-4 mr-2" />
                  <span class="font-medium">Settings</span>
                </a>
              </li>
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