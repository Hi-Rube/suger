<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'iview/dist/styles/iview.css'

export default {
  name: 'App'
}
</script>

<style>
html, body{
  border: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  background: #3949ab;
}

#app{
  width: 980px;
  height: 100%;
  margin: 0 auto;
  background: #fefefe;
}
</style>
