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
      getOrganizationalManagementTree('43').then(function (res) {
        _this.ztreeDataSource = _this.traversezTreeData(res.data.result.data);
      }).catch(err=>{
        console.log(err,'请求失败！');
      })
//      setTimeout(()=>{
//        this.ztreeDataSource = [{
//          id:220,
//          parentId:0,
//          name:"游戏1",
//          children:[{
//            id:221,
//            parentId:220,
//            name:"游戏2",
//            path:"",
//            children:[{
//              id:222,
//              parentId:221,
//              name:"游戏3",
//              path:"",
//              children:[{
//                id:223,
//                parentId:222,
//                name:"游戏4",
//                path:"",
//                children:[{
//                  id:224,
//                  parentId:223,
//                  name:"游戏5",
//                  path:"",
//                  children:[{
//                    id:225,
//                    parentId:224,
//                    name:"游戏6",
//                    path:"",
//                    children:[{
//                      id:226,
//                      parentId:224,
//                      name:"游戏末节点",
//                      path:""
//                    }],
//                  }],
//                }],
//              }],
//            }],
//          }],
//          path:"http://www.baidu.com"
//        },{
//          id:1,
//          parentId:0,
//          name:"音乐",
//          children:[],
//          path:"http://www.baidu.com"
//        },{
//          id:2,
//          parentId:0,
//          name:"视频",
//          children:[{
//            id:3,
//            parentId:2,
//            name:"电影",
//            children:[{
//              id:4,
//              parentId:3,
//              name:"国产电影",
//              path:""
//            },{
//              id:5,
//              parentId:3,
//              name:"好莱坞电影",
//              path:""
//            },{
//              id:6,
//              parentId:3,
//              name:"小语种电影",
//              path:""
//            }]
//          },{
//            id:7,
//            parentId:2,
//            name:"短片",
//            children:[{
//              id:9,
//              parentId:7,
//              name:"电视剧",
//              path:""
//            },{
//              id:10,
//              parentId:7,
//              name:"短片",
//              path:""
//            }]
//          }],
//          path:""
//        }]
//      },1000);
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
