import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/yqzjLogin'
import text from '@/page/text'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:text
    },
    {
      path:'/login',
      name:'Logins',
      component:login
    }
  ]
})
