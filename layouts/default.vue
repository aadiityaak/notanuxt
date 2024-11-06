<template>
  <div class="default">
    <div class="flex flex-col min-h-screen justify-between">
      <Header />
      <hr class="border-gray-200 dark:border-gray-800" />
      <div class="grow bg-gray-200 dark:bg-gray-950 flex flex-col justify-center">
        <div class="flex flex-col justify-center">
          <slot />
        </div>
      </div>
      <footer class="p-4 text-center text-gray-500 
      bg-gray-50 dark:bg-gray-900
      border-t border-gray-200 dark:border-gray-800
      dark:text-gray-400">
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  </div>
</template>
