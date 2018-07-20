<template>
  <div class="main_wrap">
    <div class="bgWrap">
      <!--轮播区域-->
      <!--登录区域-->
    </div>
  </div>
</template>
<script>
  import loginCommon from '../components/login_com'
  import {organizationzTree} from '../service/getData'
  export default {
    name: 'yqzjLogin',
    data(){
        return {
          ztreeData:[]
        }
    },
    components:{
      loginCommon
    },
    created(){
      this.getCaptchaCode();
    },
    methods:{
      async getCaptchaCode(){
        let s = await organizationzTree('43');
        console.log(s);
      }
    },
    mounted:function () {

    }
  }
</script>
<style scoped>
  .main_wrap {
    position: relative;
    width: 100%;
    min-width: 1280px;
    height: 100%;
    min-height: 923px;
    background: url("../assets/image/login/zjloginback.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .bgWrap {
    height: 520px;
    min-height: 520px;
    min-width: 1150px;
    max-width: 1240px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
