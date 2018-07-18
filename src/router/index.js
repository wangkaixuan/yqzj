import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/yqzjLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'Logins',
      component:login
    }
  ]
})
