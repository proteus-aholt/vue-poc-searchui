<template lang="pug">
  div#app
    main
      img(src="./assets/logo.png" alt="Vue.js PWA")
      router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import '../node_modules/bootswatch/sandstone/_variables.scss';
  @import '../node_modules/bootswatch/sandstone/_bootswatch.scss';
</style>