// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store/index'

Vue.prototype.$http = axios;

Vue.config.productionTip = false

Vue.use(ElementUI);

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor);

import './axios/axios';

import moment from 'moment';

Vue.filter('time', function (value) {
  if (!value) return ''
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
});

Vue.filter('hlbefore', function (value) {
  if(!value)
    return ''
   let date =new Date(value);
   let date2 = new Date();
   if(date2.getFullYear() != date.getFullYear()){
       return date2.getFullYear() - date.getFullYear()+'年前';
   }
   else if(date2.getMonth() != date.getMonth()){
       return date2.getMonth() - date.getMonth()+'月前';
   }
   else if(date2.getDate() != date.getDate()){
       return date2.getDate() - date.getDate()+'天前';
   }
   else if(date2.getHours() != date.getHours()){
       return date2.getHours() - date.getHours()+'小时前';
   }
   else if(date2.getMinutes() != date.getMinutes()){
       return date2.getMinutes() - date.getMinutes()+'分前';
   }
   else if(date2.getSeconds() != date.getSeconds()){
       return date2.getSeconds() - date.getSeconds()+'秒前';
   }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
