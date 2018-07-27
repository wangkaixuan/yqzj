<template>
    <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  @import "./style/base.css";
  /*授权弹窗*/
  .authorize_group .el-dialog__body{
	  padding: 30px 0;
  }
  /*授权弹窗*/
  .group_tree_wrap .el-tree {
  	border-radius: 6px;
  }
  
  /*组织机构树*/
  .group_tree_box  .ztree * {
    font-size: 14px;
  }
  .group_tree_box  .ztree li {
    line-height: 40px;
  }
  .group_tree_box  .ztree li a {
    line-height: 40px;
    height: 40px;
    padding-top: 0;
  }
  /*组织机构树*/
</style>
