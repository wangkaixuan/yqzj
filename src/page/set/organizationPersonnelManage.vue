<template>
  <div class="wary">
    <yqzj-Head></yqzj-Head>
    <div class="centre">
      <set-nav></set-nav>
      <div class="set-infowary">
        <div class="tit"><a class="hover">人员管理</a> <p class="addrole" v-on:click="addRy()">添加人员</p></div>
        <div class="group_management_wrap clearfix">
          <!--树-->
          <div class="group_tree_wrap">
            <div class="group_tree_box">
              <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick' :is-open='false' :is-check='false'></vue-ztree>
            </div>
          </div>
          <!--列表-->
          <div class="pm_wary">
            <div class="pm_search">
              <p><input type="text" name="scarchinfo" value="" v-model="dataParameter.retrievalName" placeholder="请输入登录帐号或姓名或邮箱或微信"> <i v-on:click="searchOrgInfo(1)"></i></p>
              <p>登录帐号　<a href="javascript:void (0)" :class="[dataParameter.state == '' ? 'hover': '']" v-on:click="searchOrgInfo(2,'')">不限</a>　&nbsp;<a href="javascript:void (0)" :class="[dataParameter.state == '1' ? 'hover': '']" v-on:click="searchOrgInfo(2,'1')">启用</a>　&nbsp;<a href="javascript:void (0)" :class="[dataParameter.state == '0' ? 'hover': '']" v-on:click="searchOrgInfo(2,'0')">停用</a></p>
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
              <pubpaging :pages="pages"   :current.sync="dataParameter.pageNum" @navpage="msgListView"></pubpaging>
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
    <el-dialog title="账号信息" :visible.sync="dialogFormVisible"  width="540px">
      <el-form :model="form">
        <el-form-item label="登录账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input  type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input  type="password" v-model="form.passwordtow" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信号" :label-width="formLabelWidth">
          <el-input v-model="form.wechat" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrgInfo()" >确 定</el-button>
      </div>
    </el-dialog>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import setNav from '../../components/setNav.vue'
  import pubpaging from '../../components/pagination.vue'
  import vueZtree from '../../components/vue-ztree.vue'
  import VueCookies from 'vue-cookies'
  import {getOrganizationalManagementTree,getOrgUserList,addOrgUser} from '../../components/axios/api';
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
              pageSize:'2',              //每页条数
              orgIds:'',                  //集团id
              pageNum:1,                  //当前页数
              retrievalName :'',          //检束
              state:''                    //状态 1启用 0停用
            },
            orguserData:[],                  //数据列表
            dialogFormVisible: false,       //添加人弹层
            gridData:[],                      //编辑信息
            form:{
              id:'',                          //id号编辑用到
              orgId:'',                       //集团id号
              account:'',                    //手机号
              userName:'',                  //用户名
              password:'',                  //密码
              passwordtow:'',                //确认密码
              email:'',                     //邮箱
              wechat:''                     //微信
            },
            formLabelWidth:'80px'
          }
      },
    components:{
      vueZtree,
      yqzjHead,
      yqzjFooter,
      pubpaging,
      setNav
    },
    methods:{
      // 点击节点
      nodeClick:function(m, parent, trees){
        this.treeDeepCopy = trees;
        this.nodeModel = m;  // 当前点击节点对象
        this.parentNodeModel = parent; //当前点击节点父亲对象
        this.dataParameter.orgIds = m.id;
        this.dataParameter.retrievalName = '';
        this.getOrgUserInfo();

//        console.log(m);
//        console.log(parent);

        // 导航菜单
//        this.dataList=[]
//        this.findById(this.ztreeDataSource,m.parentId)
//        this.dataList= this.dataList.reverse();
//        this.dataList.push(m);
      },
      searchOrgInfo:function (s,n) {
        //搜索
        if(s === 1){
          //输入框搜索
//          var scarchinfo = $('[name=scarchinfo]').val().replace(/(^\s*)|(\s*$)/g,'');
          this.issearch = true;
          //设置参数
          this.dataParameter.orgIds = '';
          this.dataParameter.pageNum = 1;
          //查数据
          this.getOrgUserInfo();
        }else if(s === 2){
          //登录状态搜索
          this.dataParameter.state = n;
          this.dataParameter.pageNum = 1;
          //查数据
          this.getOrgUserInfo();
        }
      },
      addRy:function () {
          //添加显示弹层
        this.dialogFormVisible = true;
      },
      saveOrgInfo:function () {
        //保存数据
        let isMobile = /^1[3|5|8|7|9|6][0-9]{9}$/,
          isPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          isUserName = /[\u4e00-\u9fa5]/,
          isEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        let _this = this;
        //登陆账号验证
        if(_this.form.account.length == 0){
          alert('手机号不能为空');
          return false;
        }else if(!isMobile.test(_this.form.account)){
          alert('格式不正确，请重新输入');
          return false;
        }
        //姓名验证
        if(_this.form.userName.length == 0 || !isUserName.test(_this.form.userName) || _this.form.userName.length > 10){
          alert('非空，中文10个字符');
          return false;
        }
        //密码验证
        if(_this.form.id == ''){
          if(_this.form.password.length == 0 || !isPwd.test(_this.form.password)){
            alert('字母+数字混合8-16位');
            return false;
          }
          //确认密码验证
          if(_this.form.password != _this.form.passwordtow){
            alert('密码不一致');
            return false;
          }
        }else if(_this.form.password.length > 0){
          //密码验证
          if(!isPwd.test(_this.form.password)){
            alert('字母+数字混合8-16位');
            return false;
          }
          if(_this.form.password != _this.form.passwordtow){
            alert('密码不一致');
            return false;
          }
        }
        //邮箱验证
        if(_this.form.email != '' && _this.form.email.length < 30 && !isEmail.test(_this.form.email)){
          alert('邮箱格式不正确');
          return false;
        }
        //微信验证
        if(_this.form.wechat != '' && !isMobile.test(_this.form.wechat)){
          alert('微信号格式不正确');
          return false;
        }
        _this.form.orgId = _this.dataParameter.orgIds;                //赋值一下集团id

        console.log(_this.form)
        addOrgUser(_this.form).then(function(res){
          console.log(res);
        }).catch(err=>{
            console.log(err,'请求失败！')
        })
      },
      findById: function (data, parentId) {
        var vm = this;
        for (var i = 0; i < data.length; i++) {

          if (parentId == data[i].id) {
            vm.dataList.push(data[i]);
            vm.findById(vm.ztreeDataSource, data[i].parentId);
            return data[i]
          }
          if (data[i].hasOwnProperty('children')) {
            vm.findById(data[i].children, parentId)
          }
        }
      },
      msgListView:function(curPage){
        //分页组件跳转
        this.dataParameter.pageNum = curPage;
        this.getOrgUserInfo();
      },
      getOrgUserInfo:function () {
        //获得导航数据
        var _this = this;
        getOrgUserList(_this.dataParameter).then(function (res) {
            if(res.data.result.data){
              _this.orguserData = res.data.result.data || [];
              _this.pages =  Math.ceil(res.data.result.total/res.data.result.pageSize);      //页数
              _this.keypage = parseInt(_this.dataParameter.pageNum-1+'0');
            }else{
              _this.orguserData = [];
              _this.pages = 0;                                                //页数
              _this.keypage = 0;
            }
        }).catch(err=>{
            console.log(err,'请求失败');
        })
      },
//      traverseList:function (r) {
//        //设置一下当前登录手机号
//        if(r.length > 0){
//          var dqs = VueCookies.get('DANGQIANS');
//          for(var i in r){
//            var account = md5("_"+r[i].account);
//            if(dqs === account){
//              r[i].isDQ = 1;
//              break;
//            }
//          }
//        }
//        return r;
//      },
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
  /*弹层*/
  .el-dialog{border-radius: 6px;}
  .el-dialog__header{border-bottom: 1px solid #e6e6e6;font-size: 16px;color: #333333;font-weight: bold;padding:0px;height: 48px;line-height: 48px;padding: 0 30px;}
  .el-dialog__headerbtn{top:16px;}
  .el-form-item__label{color: #999;}
  .el-form-item{margin-bottom: 10px;}
</style>
