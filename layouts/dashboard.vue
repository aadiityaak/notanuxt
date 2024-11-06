<template>
  <div class="dashboard">
    <main class="bg-zinc-200 dark:bg-zinc-950">
      <div class="flex">
        <MenuVertical />
        <div class="container p-4 max-w-[calc(100vw-340px)]">
          <Header />
          <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 mb-4 mt-4">
            <div class="max-w-[1200px] mx-auto">
              <h1 class="text-2xl font-bold mb-4">{{ $route.meta.title }}</h1>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>