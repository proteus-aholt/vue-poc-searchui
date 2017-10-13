<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  
  //Customize bootstrap variables here
</style>

