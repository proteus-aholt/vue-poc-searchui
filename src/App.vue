<template lang="pug">
  div.page#app
    div.enclosing#e-content
      div.enclosing#body-wrapper
        main.main-content#body(role="main")
          router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import './stylesheets/config/_base-import.scss';
</style>