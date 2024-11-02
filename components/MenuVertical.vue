<template>
  <div class="menu-vertical">
    <div class="flex flex-col w-[300px] mt-4 mb-4 ms-4 h-[calc(100vh-2rem)] border border-surface-200 rounded-lg bg-white dark:bg-surface-800 sticky top-4">
      <div class="flex items-center justify-between px-6 pt-4 shrink-0">
        <span class="inline-flex items-center gap-2">
          <span class="font-semibold text-2xl text-primary">Menu</span>
        </span>
      </div>
      <ScrollPanel class="grow w-full min-h-0">
        <PanelMenu 
        :model="items" class="px-4"
        v-model:expandedKeys="expandedKeys"
        :pt="{
          panel: '!border-0',
        }"
        >
            <template #item="{ item }">
                <NuxtLink :to="item.to" v-ripple class="flex items-center px-4 py-2 cursor-pointer group" :class="{ '!bg-slate-100 rounded': item.to === activePage }">
                    <Icon v-if="item.icon" :name="item.icon" class="mr-2" />
                    <span class="font-medium">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto mr-2" :value="item.badge" />
                    <span v-if="item.items" class="ml-auto">
                      <Icon v-if="item.key && expandedKeys[item.key]" name="lucide:chevron-down" />
                      <Icon v-else name="lucide:chevron-right" />
                    </span>
                </NuxtLink>
            </template>
        </PanelMenu>
      </ScrollPanel>
      <div class="mt-auto">
        <NuxtLink to="/profile" v-ripple class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
          <Avatar :image="avatarImage" shape="circle" />
          <span class="font-bold">{{ userName }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const user = useSanctumUser() as any;
  const avatarImage = ref('');
  const userName = ref('');
  const route = useRoute();
  const activePage = ref(route.path);
  const expandedKeys = ref({}) as any;
  const items = ref([
    {
      key: 0,
      label: 'Dashboard',
      icon: 'lucide:home',
      to: '/dashboard',
    },
    {
      key: 1,
      label: 'Konsumen',
      icon: 'lucide:user',
      items: [
        { 
          label: 'List Konsumen', 
          to: '/konsumen',
          icon: 'lucide:users',
       },
        { 
          label: 'Add Konsumen', 
          to: '/konsumen/add',
          icon: 'lucide:user-plus',
        },
      ],
    },
    {
      key: 2,
      label: 'Order',
      icon: 'lucide:file-chart-line',
      items: [
        { 
          label: 'List Order', 
          to: '/order',
          icon: 'lucide:list',
        },
        { 
          label: 'Add Order', 
          to: '/order/add',
          icon: 'lucide:plus',
        },
      ],
    },
    {
      key: 3,
      label: 'Option',
      icon: 'lucide:settings',
      items: [
        { 
          label: 'Umum', 
          to: '/option',
          icon: 'lucide:layout-list',
        }
      ],
    },
  ]) as any;

  onMounted(() => {
    if (user.value) {
      avatarImage.value = user.value.avatar;
      userName.value = user.value.name;
    }
    
    if (activePage.value === '/') {
      expandedKeys.value[0] = true;
    }

    items.value.forEach((item: any) => {
      if (item.items) {
        item.items.forEach((subItem: any) => {
          if (subItem.to === activePage.value) {
            expandedKeys.value[item.key] = true;
          }
        })
      }
    })
    

  })

</script>