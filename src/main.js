// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'font-awesome-sass-loader'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
require('bootstrap-beta')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
