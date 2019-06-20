// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './axios/http'
import store from './store/modules.js'
import './assets/styles/border.css'
import './assets/styles/nomalize.css'
import './assets/styles/iconfont.css'
import './assets/styles/animate.css'
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
Vue.prototype.bus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$axios = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
