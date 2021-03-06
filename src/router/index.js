import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('../views/home/home')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/register')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/setting/setting')
    },
    {
      path: '/topic/create',
      name: 'topicCreate',
      component: () => import('../views/topic/create/create')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/register/login')
    },
    {
      path:'/topic/:id',
      name: 'topic',
      props: true,
      component: () => import('../views/topic/topic/topic')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/message/message')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/about')
    },
    {
      path: '/user/:id',
      name: 'user',
      props: true,
      component: () => import('../views/user/user')
    }

  ]
})

router.beforeEach((to, form, next) => {
  nprogress.start();
  next();
})
router.afterEach((to, from) => {
  nprogress.done();
})

export default router;
