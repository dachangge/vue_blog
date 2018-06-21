import Vue from 'vue'
import Router from 'vue-router'
import register from '../views/register/register'
import setting from '../views/setting/setting'
import topicCreate from '../views/topic/create/create'
import login from '../views/register/login'
import topic from '../views/topic/topic/topic'
import home from '../views/home/home'
import message from '../views/message/message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home
    },
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
    },
    {
      path:'/topic/:id',
      name: 'topic',
      props: true,
      component: topic
    },
    {
      path: '/message',
      name: 'message',
      component: message
    }

  ]
})
