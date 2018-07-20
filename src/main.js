// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
Vue.prototype.$ajax = axios;
// axios.get('https://m-beta-b.istarshine.com/yqzj/v1/organizational/getOrganizationalManagementTree?groupId=43')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (response) {
//     console.log(response);
//   });`

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
