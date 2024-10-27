<template>
    <div>
      <header>
        <h1>My App</h1>
      </header>
      <body>
        <slot />
      </body>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    
  }
  </script>
  
  <style scoped>
  header {
    background: #42b983;
    color: white;
    padding: 20px;
    text-align: center;
  }
  
  footer {
    text-align: center;
    padding: 10px;
    background: #333;
    color: white;
  }
  </style>