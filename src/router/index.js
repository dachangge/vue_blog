import Vue from 'vue'
import Router from 'vue-router'
import register from '../views/register/register'
import setting from '../views/setting/setting'
import topicCreate from '../views/topic/create/create'
import login from '../views/register/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting,
    },
    {
      path: '/topic/create',
      name: 'topicCreate',
      component: topicCreate,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }

  ]
})
