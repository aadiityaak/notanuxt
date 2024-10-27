<template>
    <div class="dashboard">
      <Sidebar />
      <main>
        <Header />
        <slot />
      </main>
    </div>
  </template>
  
  <script>

  export default {
    export default {
      middleware: 'auth'
    }
  }
  </script>