import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: () => import('../components/home.vue'),
      children: [
        {
          path: '/list',
          name: 'ImgList',
          component: () => import('../components/list.vue')
        }
      ]
    }
  ]
})
