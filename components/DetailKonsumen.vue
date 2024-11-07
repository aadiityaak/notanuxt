<template>
  <div class="w-full text-center mb-4">
      <Avatar v-if="params.name" shape="circle" size="xlarge" class="mb-4" > {{ params.name.charAt(0) }} </Avatar>
      <div v-if="params.is_admin === 1" class="text-rose-700 font-bold"><Icon name="lucide:verified" /> Administrator</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Alamat</div>
      <div class="text-right">{{ params.alamat }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Phone</div>
      <div class="text-right">{{ params.phone }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Kategori</div>
      <div class="text-right">{{ params.kategori }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Pekerjaan</div>
      <div class="text-right">{{ params.pekerjaan }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Bank</div>
      <div class="text-right">{{ params.bank }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Sertifikat</div>
      <div class="text-right">{{ params.sertifikat }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Nilai Transaksi</div>
      <div class="text-right">{{ formatRupiah(params.nilai_transaksi) }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Harga Real</div>
      <div class="text-right">{{ formatRupiah(params.harga_real) }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Harga Kesepakatan</div>
      <div class="text-right">{{ formatRupiah(params.harga_kesepakatan) }}</div>
  </div>
  <div class="flex justify-between border-b border-zinc-200 dark:border-zinc-800 py-3">
      <div class="font-bold">Data Pajak Pembeli</div>
      <div class="text-right">{{ formatRupiah(params.data_pajak_pembeli) }}</div>
  </div>
  <div class="flex justify-between border-b py-3">
      <div class="font-bold">Data Pajak Penjual</div>
      <div class="text-right">{{ formatRupiah(params.data_pajak_penjual) }}</div>
  </div>

  <div class="flex justify-end mt-4">
  <Button @click="editKonsumen(params.id)" class="pt-2" severity="primary" variant="outlined" size="small">
      <Icon name="lucide:edit" class="text-rose-700" /> Edit
  </Button>
  <Button class="pt-2 ml-2" variant="outlined" size="small" severity="primary" @click="dialogRef.close()">
      <Icon name="lucide:x" class="text-rose-700" /> Tutup
  </Button>
  </div>
</template>

<script lang="ts" setup>  
  const params = ref({} as any);
  const dialogRef = inject('dialogRef') as any;
  onMounted(() => {
      params.value = dialogRef.value.data;
  })
  const editKonsumen = (id: any) => {
      navigateTo(`/konsumen/${id}`)
  }
  const formatRupiah = (value: any) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  }
</script>