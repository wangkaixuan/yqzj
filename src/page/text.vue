<template>
  <div>
    text
  </div>
</template>
<script>
  import {getOrganizationalManagementTree} from '../components/axios/api';
  import axios from 'axios';
  import VueCookies from 'vue-cookies'
  import qs from 'qs';

  export default {
    data (){
      return{
          ztreeData:""
      }
    },
    computed:{

    },
    created(){
//        var _this = this;
//      const token =  VueCookies.get('accessToken') || '';
//      const userid =  VueCookies.get('userid') || '';
//      const urls = 'https://m-beta-b.istarshine.com/yqzj/v1/orgUser/getOrgUserList'
//      const data = {
//        pageSize:10,
//        orgIds:189,
//        pageNum:1,
//        retrievalName:"",
//        state:""
//      };
//      const headers = qs.stringify({
//        'ACCESSTOKEN': token,
//        'ZHXGUSERID': userid,
//        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//      })
//
//      axios.post(urls, data, headers)
//        .then(function (response) {
//          debugger;
//          console.log(response);
//        })
//        .catch(function (error) {
//          debugger;
//          console.log(error);
//        });


//      getOrganizationalManagementTree('43').then(function (res) {
//          console.log(res);
//        _this.ztreData = res.data;
//        console.log(_this.ztreData);
//      }).catch(err=>{
//          console.log(err,'请求失败！');
//      })
//      axios({
//        url:'/api/articles',//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
//        method:'get',//请求方式
//        //这里可以添加axios文档中的各种配置
//      }).then(function (res) {
//        console.log(res,'成功');
//      }).catch(function (err) {
//        console.log(err,'错误');
//      })
    }
  }
</script>
<style>

</style>
