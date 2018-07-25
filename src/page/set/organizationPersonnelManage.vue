<template>
  <div class="wary">
    <yqzj-Head></yqzj-Head>
    <div class="centre">
      <set-nav></set-nav>
      <div class="set-infowary">
        <div class="tit"><a class="hover">人员管理</a> <p the-id="addUser" class="addrole">添加人员</p></div>
        <div class="group_management_wrap clearfix">
          <!--树-->
          <div class="group_tree_wrap">
            <div class="group_tree_box">
              <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick' :is-open='false' :is-check='false'></vue-ztree>
            </div>
          </div>
          <!--列表-->
          <div class="pm_wary">
            <div class="pm_search"><p><input name="scarchinfo" value="" placeholder="请输入登录帐号或姓名或邮箱或微信" type="text">
              <i></i></p>
              <p>登录帐号　<a href="javascript:void (0)" class="hover">不限</a>　&nbsp;<a href="javascript:void (0)" class="">启用</a>　&nbsp;<a href="javascript:void (0)" class="">停用</a></p></div>
            <div class="pm_list">
              <table>
                <thead>
                <tr>
                  <th class="wid1">序号</th>
                  <th class="wid2">登录帐号</th>
                  <th class="wid3">姓名</th>
                  <th class="wid4">邮箱</th>
                  <th class="wid5">所属角色</th>
                  <th class="wid6">状态</th>
                  <th class="wid7">操作</th>
                  <th class="wid8">排序</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import setNav from '../../components/setNav.vue'
  import vueZtree from '../../components/vue-ztree.vue'
  import VueCookies from 'vue-cookies'
  import {getOrganizationalManagementTree} from '../../components/axios/api';
  export default {
      data(){
          return {
            dataList:[],
            ztreeDataSource:[],
            parentNodeModel:[],//当前点击节点父亲对象
            nodeModel:null, // 当前点击节点对象
          }
      },
    components:{
      vueZtree,
      yqzjHead,
      yqzjFooter,
      setNav
    },
    methods:{
      // 点击节点
      nodeClick:function(m, parent, trees){
        this.treeDeepCopy = trees;
        this.nodeModel = m;  // 当前点击节点对象
        this.parentNodeModel = parent; //当前点击节点父亲对象

        console.log(m);
        console.log(parent);

        // 导航菜单
        this.dataList=[]
        this.findById(this.ztreeDataSource,m.parentId)
        this.dataList= this.dataList.reverse();
        this.dataList.push(m);
      },
      findById: function (data, parentId) {
        var vm = this;
        for (var i = 0; i < data.length; i++) {

          if (parentId == data[i].id) {
            console.log(data[i])
            vm.dataList.push(data[i]);
            vm.findById(vm.ztreeDataSource, data[i].parentId)
            return data[i]
          }
          if (data[i].hasOwnProperty('children')) {
            vm.findById(data[i].children, parentId)
          }
        }
      },
      traversezTreeData:function (data) {
        var zTreeData = [];
        for(let i in data){
           let parentData = data[i];
          parentData.children = [];
          parentData.parentId = parentData.pId;
          for(let j in data){
            if(parentData.id == data[j].pId){
              parentData.open = true;
              parentData.children.push(data[j]);
            }
          }
        }
        zTreeData[0] = data[0];
        console.log(zTreeData);
        return zTreeData;
      }
    },
    mounted (){
      // 异步获取数据操作
      let _this = this;
      getOrganizationalManagementTree(VueCookies.get('generalGroupId')).then(function (res) {
        _this.ztreeDataSource = _this.traversezTreeData(res.data.result.data);
      }).catch(err=>{
        console.log(err,'请求失败！');
      })
    }
  }
</script>
<style>
  @import "../../style/rolePerm.css";
  .clear{clear:both;display:block}
  .wary{
    background-color: #f2f2f2;
    width: 100%;
    min-width: 980px;
  }
  .centre {
    margin: 75px auto 30px;
    width: 94%;
    min-height: 500px;
    position: relative;
  }

  .addrole {
    display: block;
    float: right;
    color: #33A7FF;
    font-size: 14px;
    margin-right: 20px;
    cursor: pointer;
  }
  .set-infowary .group_management_wrap {
    width: 100%;
    margin: 12px auto 0;
    padding-bottom: 20px;
  }
  .set-infowary .group_management_wrap .group_tree_wrap {
    width: 240px;
    float: left;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
  }
  .set-infowary .group_management_wrap .group_tree_wrap .group_tree_box {
    border-radius: 6px;
    overflow: auto;
    background-color: #fff;
    min-height: 800px;
  }
  .set-infowary .group_management_wrap .group_tree_wrap .group_tree_box .ztree {
    padding: 0;
    min-height: 779px;
    max-height: 1100px;
  }

  .set-infowary .group_management_wrap .group_tree_wrap .group_tree_box .ztree * {
    font-size: 14px;
  }

  .set-infowary .group_management_wrap .group_tree_wrap .group_tree_box .ztree li {
    line-height: 40px;
  }

  .set-infowary .group_management_wrap .group_tree_wrap .group_tree_box .ztree li a {
    line-height: 40px;
    height: 40px;
    padding-top: 0;
  }
  ul.ztree{height:700px;}
</style>
