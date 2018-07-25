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
              <p>登录帐号　<a href="javascript:void (0)" class="hover">不限</a>　&nbsp;<a href="javascript:void (0)" class="">启用</a>　&nbsp;<a href="javascript:void (0)" class="">停用</a></p>
            </div>
            <!--列表-->
            <div class="pm_list" v-if="orguserData.length > 0">
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
                <tr v-for="org,i in orguserData">
                  <td>{{keypage+i+1}}</td>
                  <td>{{org.account}}</td>
                  <td>{{org.userName}}</td>
                  <td>{{org.email}}</td>
                  <td style="line-height: 24px;" :title="org.roleName">{{org.roleName.length > 35 ?  org.roleName.substr(0,35)+'...':org.roleName }}</td>
                  <td>
                    <span class="used" v-if="org.state=='1'">启用</span>
                    <span class="stop_used" v-else>停用</span>
                  </td>
                  <td v-if="org.isSuper == 1 || org.isDQ == 1">
                    <span class="tab_btn stop_used">编辑</span>
                    <span class="tab_btn stop_used">删除</span>
                    <span class="tab_btn stop_used">授权</span>
                  </td>
                  <td v-else>
                    <span class="tab_btn" v-on:click="updateOrg(org.id,org.account,org.userName,org.email,org.wechat)" >编辑</span>
                    <span class="tab_btn" v-on:click="delOrg(org.id,org.userName)">删除</span>
                    <span class="tab_btn" v-on:click="accreditOrg(org.id,org.userName,org.account)">授权</span>
                  </td>
                  <td v-if="issearch"><span class="stop_used">排序</span></td>
                  <td v-else><span class="sort" v-on:click="orgSort(keypage+i+1,org.id,org.userName,org.wechat)">排序</span></td>
                </tr>
                </tbody>
              </table>
              <!--分页-->

            </div>
            <!--列表end-->
            <!--无数据-->
            <div v-else class="nodata">
              <div class="noData noDataBreowe">
                <img src="../../images/nodata.png">
                <p>暂无数据</p>
              </div>
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
  import {getOrganizationalManagementTree,getOrgUserList} from '../../components/axios/api';
  export default {
      data(){
          return {
            dataList:[],
            ztreeDataSource:[],
            parentNodeModel:[],//当前点击节点父亲对象
            nodeModel:null, // 当前点击节点对象
            issearch:false,                   //是否搜索
            pages:1,                         //页数
            keypage:0,                       //循环键值页数
            dataParameter:{
              pageSize:'10',              //每页条数
              orgIds:'',                  //集团id
              pageNum:1,                  //当前页数
              retrievalName :'',          //检束
              state:''                    //状态 1启用 0停用
            },
            orguserData:[]                  //数据列表
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
        this.dataParameter.orgIds = m.id;
        this.getOrgUserInfo();

//        console.log(m);
//        console.log(parent);

        // 导航菜单
//        this.dataList=[]
//        this.findById(this.ztreeDataSource,m.parentId)
//        this.dataList= this.dataList.reverse();
//        this.dataList.push(m);
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
<<<<<<< HEAD

=======
      getOrgUserInfo:function () {
        //获得导航数据
        var _this = this;
        getOrgUserList(_this.dataParameter).then(function (res) {
            if(res.data.result.data){
              _this.orguserData = res.data.result.data
            }else{
              _this.orguserData = [];
            }

        }).catch(err=>{
            console.log(err,'请求失败');
        })
      },
      updateOrg:function (id,account,orgname,email,wechat) {
          //编辑
      },
      delOrg:function (id,name) {
          //删除
      },
      accreditOrg:function (id,name,account) {
        //授权
      },
      orgSort:function (loc,id,name) {
        //排序

      },
>>>>>>> 588c72d6302002338bdce4171f5e378e88a61901
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
        data[0].clickNode = true;
        zTreeData[0] = data[0];
        return zTreeData;
      }
    },
    mounted (){
      // 异步获取数据操作
      let _this = this;
      getOrganizationalManagementTree(VueCookies.get('generalGroupId')).then(function (res) {
        _this.ztreeDataSource = _this.traversezTreeData(res.data.result.data);
        _this.dataParameter.orgIds = _this.ztreeDataSource[0].id;
        _this.getOrgUserInfo();
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
