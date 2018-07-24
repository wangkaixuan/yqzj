import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/yqzjLogin'
import opm from '@/page/set/organizationPersonnelManage'
import text from '@/page/text'
import dialog from '@/page/set/dialog'

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
    },
    {
      path:'/opm',
      component:opm
    },
    {
      path:'/dialog',
      component:dialog
    }
  ]
})
