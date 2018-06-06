import Vue from 'vue'
import Router from 'vue-router'
import register from '../views/register/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register,
    }
  ]
})
