<template>
  <div class="default">
    <div class="flex flex-col min-h-screen justify-between">
      <div class="bg-surface-50 dark:bg-surface-800 flex flex-col justify-center">
        <div class="flex flex-col justify-center min-h-screen">
          <slot />
        </div>
      </div>
      <footer class="p-4 text-center text-surface-500 dark:text-surface-400 border-t border-surface-200 dark:border-surface-700">
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  </div>
</template>
