<template>
  <div class="header" style="min-width: 1360px;">
    <div class="logo"></div>
    <ul class="nav">
      <li><a href="#">首页</a></li>
      <li><a href="#" >舆情智库</a></li>
      <li><a href="#">舆情监测</a></li>
      <li><a href="#" >舆情研判</a></li>
      <li><a href="#" >舆情导控</a></li>
      <li><a href="#" >舆情报告</a></li>
      <li><a href="#">舆情OA</a></li>
    </ul>
    <p class="welcome"> 欢迎<span> 333</span>登录！</p>
    <ul class="nav_xt">
      <li><a href="#" ><i></i> <span>系统设置</span></a></li>
      <li><a href="#"><i></i> <span>退出</span></a></li>
    </ul>
    <div class="clear"></div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped> 
  .header{width:100%;height: 60px;background-color:#fff;border-bottom:1px solid #E4E4E4;position: fixed;top:0;left:0;z-index: 10;}
  .header .logo{width: 17%;float:left;background: url("../images/zj_logo.png") center no-repeat;height: 60px;}
  .header .nav{float:left;}
  .header .nav li{float:left;line-height: 60px;width: 120px;font-size:16px;text-align: center;font-family: "黑体"}
  .header .nav li a{display: inline-block;color:#333;width: auto;padding: 0 20px;}
  .header .nav li a:hover{color:#3292d8;background: #3292d8;color: #ffffff!important;}
  .header .nav li a.hover{color:#3292d8;background: #3292d8;color: #ffffff!important;}
  .header .nav_xt{float:right;margin:10px 20px 0 0;}
  .header .nav_xt li{float:left;display: block;width: 80px;text-align: center;margin-right: 5px;}
  .header .nav_xt li a{font-size:12px;line-height: 16px;color:#333;text-decoration:none;}
  .header .nav_xt li i{display: inline-block;width: 14px;height: 16px;background:url(../images/head_ico.png) no-repeat;vertical-align: middle;}
  .header .nav_xt li a span{vertical-align: middle;}
  .header .nav_xt li a:hover{color:#3387C5;}
  .header .nav_xt li a.hover{color:#3387C5;}
  .header .nav_xt li:nth-child(1) a i{background-position: left -22px;width: 15px;}
  .header .nav_xt li:nth-child(1) a.hover i{background-position: left top;}
  .header .nav_xt li:nth-child(1) a:hover i{background-position: left top;}
  .header .nav_xt li:nth-child(2) a i{background-position: right -22px;}
  .header .nav_xt li:nth-child(2) a.hover i{background-position: right top;}
  .header .nav_xt li:nth-child(2) a:hover i{background-position: right top;}
  .header .welcome{width: 98%;text-align: right;font-size: 12px;margin:8px 0 0 0;padding-right: 20px;}
  .header .welcome span{color:#3387C5;}
</style>
