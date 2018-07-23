<template>
  <div>
    text
  </div>
</template>
<script>
  import {lookOption} from '../components/axios/api';
  import axios from 'axios';

  export default {
    data (){
      return{
          ztreeData:""
      }
    },
    computed:{

    },
    created(){
        var _this = this;
      lookOption('43').then(function (res) {
          console.log(res);
        _this.ztreData = res.data;
        console.log(_this.ztreData);
      }).catch(err=>{
          console.log(err,'请求失败！');
      })
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
