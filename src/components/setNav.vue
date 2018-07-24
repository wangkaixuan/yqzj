<template>
  <div class="set-nav">
    <ul class="nav">
      <li class="hover">
        <a href="/yqzjSC/Set/userinfo"><i class="i4"></i>个人信息</a>
      </li>
      <li>
        <a href="/yqzjSC/Set/groupManagement"><i class="i5"></i>组织机构管理</a>
      </li>
      <li>
        <a href="/yqzjSC/Set/rolePermission"><i class="i5"></i>角色权限</a>
      </li>
      <li>
        <a href="/yqzjSC/Set/personnelManage"><i class="i5"></i>人员管理</a>
      </li>        <li>
      <a href="/yqzjSC/Set/organizationPersonnelManage"><i class="i5"></i>人员管理</a>
    </li>
      <li>
        <a href="javascript:void(0)"> <i class="i2"></i>监测设置</a> <i the-id="navZk" class="hover"></i>
        <ul class="level2">
          <li><a href="/yqzjSC/Set/special"><i></i>专题设置</a></li>
          <li><a href="/yqzjSC/Set/surface
                    "><i></i>全局词设置</a></li>                <li style="display:none;"><a href="/yqzjSC/Set/TVMontior"><i></i>电视监控设置</a></li>
          <li><a href="/yqzjSC/Set/qq"><i></i>社交监控设置</a></li>                <li><a href="/yqzjSC/Set/specialWarning"><i></i>预警设置</a></li>
          <li><a href="/yqzjSC/Set/setReportedMail"><i></i>邮箱设置</a></li>
          <li><a href="/yqzjSC/Set/attentionSetClass"><i></i>关注设置</a></li>
          <li><a href="/yqzjSC/Set/DefinedCondition"><i></i>自定义筛选设置</a></li>                <li><a href="/yqzjSC/Set/infoFilter"><i></i>信息过滤设置</a></li>            </ul>
      </li>
      <li>
        <a href="/yqzjSC/Set/bulletin"><i class="i3"></i>报告设置</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {

  }
</script>
<style>
  .set-nav {
    -webkit-box-shadow: 0px 3px 7px #ebebeb;
    -moZ-box-shadow: 0px 3px 7px #ebebeb;
    box-shadow: 0px 3px 7px #ebebeb;
    width:18%;float:left;background-color:#fff;border:1px solid #eeeeee;padding-bottom: 150px;
  }
  .set-nav .nav {
    margin: 0px;
  }
  .set-nav .nav li {
    position: relative;
  }
  .set-nav .nav li a {
    color: #333;
    text-indent: 5px;
    font-size: 14px;
    box-sizing: border-box;
    height: 48px;
    line-height: 48px;
  }
  .set-nav .nav li a > i {
    width: 0px;
    height: 0px;
    display: block;
    float: left;
    margin: 14px 0 0 15px;
  }
  .set-nav .nav li a > i.i1 {
    background-position: 0px 0px;
  }
  .set-nav .nav li a > i.i2 {
    background-position: -30px 0px;
  }
  .set-nav .nav li a > i.i3 {
    background-position: -90px 0px;
  }
  .set-nav .nav li a:hover {
    background-color: #fff;
    color: #33a7ff;
  }
  .set-nav .nav li > i {
    display: block;
    width: 19px;
    height: 11px;
    background: url("../images/setNavico.png") no-repeat -23px 0;
    position: absolute;
    z-index: 10;
    top: 10px;
    right: 13px;
    cursor: pointer;
  }
  .set-nav .nav li > i.hover {
    display: block;
    width: 15px;
    height: 12px;
    background: url("../images/setNavico.png") no-repeat -1px 0px;
    position: absolute;
    z-index: 10;
    top: 10px;
    right: 15px;
    cursor: pointer;
  }
  .set-nav .nav li.hover > a {
    color: #33A7FF;
    font-weight: bold;
    border-left: 4px solid #33A7FF;
    display: block;
  }
  .set-nav .nav li.hover > a > i.i1 {
    background-position: 0px -31px;
  }
  .set-nav .nav li.hover > a > i.i2 {
    background-position: -30px -32px;
  }
  .set-nav .nav li.hover > a > i.i3 {
    background-position: -90px -31px;
  }
  .set-nav .nav li.hover > i {
    background-position: -23px -18px;
  }
  .set-nav .nav li.hover > i.hover {
    background-position: -1px -20px;
  }
  .set-nav .nav .level2 {
    margin-left: 15px;
    width: 90%;
  }
  .set-nav .nav .level2 li a {
    color: #999;
    text-indent: 0px;
  }
  .set-nav .nav .level2 li a > i {
    width: 0px;
    height: 0px;
    display: block;
    float: left;
    margin: 14px 0 0 25px;
  }
  .set-nav .nav .level2 li a:hover {
    color: #33a7ff;
  }
  .set-nav .nav .level2 li a:hover > i {
    background-position: -186px 1px;
  }
  .set-nav .nav .level2 li a.hover {
    color: #33a7ff;
    background-color: #fff;
  }
  .set-nav .nav .level2 li a.hover > i {
    background-position: -186px 1px;
  }

</style>
