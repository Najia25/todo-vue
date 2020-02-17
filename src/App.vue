<template>
  <div id="app" class="container">
    <img alt="Vue logo" class="logo" src="./assets/logo.png">
    <todolist></todolist>
  </div>

</template>

<script>

import todolist from './components/TodoList'

export default {
  name: 'App',
  components: {
    todolist
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size:24px;
}

.container {
  width: 600px;
  margin:0 auto;
  /* text-align: center; */
}

* {
  box-sizing: border-box;
}

.logo {
  display:block;
  height:75px;
  margin:30px auto;
}

@media (max-width: 575px) {
  .container {
    width: auto;
    padding:0px 15px;
  }
  #app {
    font-size:16px;
  }
}

</style>
