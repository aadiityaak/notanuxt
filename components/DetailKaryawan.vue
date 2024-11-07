<template>
    <div class="w-full text-center mb-4">
        <Avatar v-if="params.avatar !== null" :image="storageUrl + '/' + params.avatar" shape="circle" size="xlarge" class="mb-4" />
        <Avatar v-else shape="circle" size="xlarge" class="mb-4" > {{ params.name.charAt(0) }} </Avatar>
        <div v-if="params.is_admin === 1" class="text-rose-700 font-bold"><Icon name="lucide:verified" /> Administrator</div>
    </div>
    <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
        <div class="font-bold">Email</div>
        <div class="text-right">{{ params.email }}</div>
    </div>
    <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
        <div class="font-bold">Alamat</div>
        <div class="text-right">{{ params.address }}</div>
    </div>
    <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
        <div class="font-bold">Phone</div>
        <div class="text-right">{{ params.phone }}</div>
    </div>
    <div class="flex justify-between py-2">
        <div class="font-bold">Jabatan</div>
        <div class="text-right">{{ params.position }}</div>
    </div>
    <div class="flex justify-end mt-4">
    <Button @click="editKaryawan(params.id)" class="pt-2" severity="primary" variant="outlined" size="small">
        <Icon name="lucide:edit" class="text-rose-700" /> Edit
    </Button>
    <Button class="pt-2 ml-2" variant="outlined" size="small" severity="primary" @click="dialogRef.close()">
        <Icon name="lucide:x" class="text-rose-700" /> Tutup
    </Button>
    </div>
</template>

<script lang="ts" setup>  
    const config = useSanctumConfig();
    const storageUrl = config.baseUrl + '/storage';
    const params = ref({} as any);
    const dialogRef = inject('dialogRef') as any;
    onMounted(() => {
        params.value = dialogRef.value.data;
        console.log(params.value)
    })
    const editKaryawan = (id: any) => {
        navigateTo(`/karyawan/${id}`)
    }
</script>