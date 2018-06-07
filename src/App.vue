<template>
  <div id="app">
    <app-header></app-header>
    <div class="router_container ">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import "@/assets/index.scss"

  import AppHeader from '@/components/header'
export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .router_container{
    padding: 20px 20px;
  }
</style>
