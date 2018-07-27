<template>
	<div class="wrap">
		<yqzj-Head></yqzj-Head>
		<div class="center">
			<set-nav></set-nav>

			<div class="set-infowary">
        <div class="tit">
          <a class="hover">组织机构管理</a>
        </div>
        <div class="group_management_wrap clearfix">
          <!--左盒子-->
          <div class="group_tree_wrap">
            <div class="group_tree_box">
              <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick' :is-open='true' :is-check='false' @addGroup = "addGroup"></vue-ztree>
            </div>
          </div>
          <!--右边盒子-->
          <div class="set_meal_statistics">
            <h3 class="statistics_title">套餐统计</h3>
            <div class="statistics_list">
              <ul class="statistics_list_con clearfix">
                <li><p class="bigger">监测单位数</p><p class="smaller">统计类型</p></li>
                <li><p class="bigger" the-id="maxDatanode">{{checkSetMealUse.maxDatanode}}</p><p class="smaller">总数</p></li>
                <li><p class="bigger" the-id="alreadyDatanode">{{checkSetMealUse.alreadyDatanode}}</p><p class="smaller">已用</p></li>
                <li><p class="bigger" the-id="remaindDatanode">{{checkSetMealUse.remaindDatanode}}</p><p class="smaller">剩余</p></li>
              </ul>
            </div>
            <div class="statistics_list">
              <ul class="statistics_list_con clearfix last">
                <li><p class="bigger">人员数</p><p class="smaller">统计类型</p></li>
                <li><p class="bigger" the-id="maxUser">{{checkSetMealUse.maxUser}}</p><p class="smaller">总数</p></li>
                <li><p class="bigger" the-id="alreadyUser">{{checkSetMealUse.alreadyUser}}</p><p class="smaller">已用</p></li>
                <li><p class="bigger" the-id="remaindUser">{{checkSetMealUse.remaindUser}}</p><p class="smaller">剩余</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class=""></div>





				<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

				<el-dialog
				  title="提示"
				  :visible.sync="dialogVisible"
				  width="30%"
				  :before-close="handleClose">
				  <span>这是一段信息</span>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				  </span>
				</el-dialog>

				<!-- Form 添加组织 -->
				<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

				<el-dialog :model="form" title="添加组织" :visible.sync="dialogFormVisible"
				:close-on-click-modal=false  custom-class="add_group" @close="closeDialog" width="560px">
				  <el-form :model="form" ref="form" :rules="rules" :label-position="labelPosition" :label-width="formLabelWidth">
				    <el-form-item label="组织名称" prop="name">
				      <el-input v-model="form.name" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="使用人数" prop="num1">
				      <el-input-number v-model="num1" controls-position="right" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
				    </el-form-item>
				    <el-form-item label="是否授权监测">
				      <el-switch v-model="form.delivery"></el-switch>
				    </el-form-item>
				  </el-form>
          <div class="org_tips">备注：授权监测后会占用一个监测单位数，同时新增单位会有独立的监测舆情的能力</div>
				  <div slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				  </div>
				</el-dialog>

				<!-- Form 系统授权 -->
				<el-button type="text" @click="dialogFormVisible2 = true">打开授权表单的 Dialog</el-button>

				<el-dialog :model="form2" title="系统授权" :visible.sync="dialogFormVisible2"  :width="form2width"
				:close-on-click-modal=false  custom-class="authorize_group" @close="closeDialog">
				  <el-form :model="form2" ref="form2" :rules="rules" :label-position="labelPosition" :label-width="formLabelWidth">
				    <div class="authorize_company_box"><p>授权单位</p> <h3>技术部3组b组</h3></div>
				    <div class="authorize_company_content clearfix">
				    	<div class="authorize_left">
				    		<div class="authorize_title clearfix">是否启用数据授权<label><el-checkbox v-model="checkAll">全选</el-checkbox></label></div>
				    		<el-tree
  							  :data="data2"
  							  show-checkbox
  							  node-key="id"
  							  ref="tree"
  							  default-expand-all
  							  :expand-on-click-node="false"
  							  :props="defaultProps">
  							</el-tree>
				    	</div>
				    	<div class="authorize_right authorize_width">
				    		<div class="authorize_title">功能授权</div>
				    		<el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item name="1">
                    <template slot="title">
                      一致性 Consistency <el-checkbox :indeterminate="authorizeItems.isIndeterminate" v-model="authorizeItems.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    </template>

                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="authorizeItems.checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in authorizeItems.cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                  </el-collapse-item>
                  <el-collapse-item title="反馈 Feedback" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                  </el-collapse-item>
                  <el-collapse-item title="效率 Efficiency" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                  </el-collapse-item>
                  <el-collapse-item title="可控 Controllability" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                  </el-collapse-item>
                </el-collapse>
				    	</div>
				    </div>
				  </el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="submitForm('form2')">保 存</el-button>
				    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
				  </div>
				</el-dialog>

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
import {getGroupTree,checkSetMealUse} from '../../components/axios/orgment'

const cityOptions = ['上海', '北京', '广州', '深圳'];

export default {
	data() {
	  var validateOrgname = (rule, value, callback) => {
  	  var newVal = value.trim().replace(/\s/g, "");//去掉首位空格，过滤掉中间的空格后，进行验证
      if (newVal.length == 0) {
        callback(new Error('不能为空'));
      }else if(newVal.length > 20){
        callback(new Error('最多20个字符'));
      } else {
        callback();
      }
    };

    return {
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,

      labelPosition: 'right',
      form: {
        name: '',
        delivery: false,
      },
      formLabelWidth: '100px',

      num1: 0,
      rules: {
        name: [
          { validator: validateOrgname,}
        ],
      },
      form2: {

      },
      form2width: '840px',
      //tree
      checkAll: false,
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      //折叠面板
      activeNames: ['1'],
      authorizeItems: {
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
      },
      //查看组织树
      dataList:[],
      ztreeDataSource:[],
      parentNodeModel:[],//当前点击节点父亲对象
      nodeModel:null, // 当前点击节点对象
      //查看套餐
      checkSetMealUse: {
        maxDatanode: 0,
        alreadyDatanode: 0,
        remaindDatanode: 0,
        maxUser: 0,
        alreadyUser: 0,
        remaindUser: 0
      }
    };
  },
	components:{
    vueZtree,
    yqzjHead,
    yqzjFooter,
    setNav
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    closeDialog(){
    	//console.log(11);
    	//this.$refs[formName].resetFields();//清除表单验证
    },
    handleChange(value) {
      console.log(value);
    },
    submitForm(formName) {
    	var that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          that.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    handleCheckAllChange(val) {
      this.authorizeItems.checkedCities = val ? cityOptions : [];
      this.authorizeItems.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.authorizeItems.checkAll = checkedCount === this.authorizeItems.cities.length;
      this.authorizeItems.isIndeterminate = checkedCount > 0 && checkedCount < this.authorizeItems.cities.length;
    },
    // 点击节点
    nodeClick:function(m, parent, trees){
      this.treeDeepCopy = trees;
      this.nodeModel = m;  // 当前点击节点对象
      this.parentNodeModel = parent; //当前点击节点父亲对象
      m.icon = true;
      console.log('========m==============');
      console.log(m);
      //console.log(parent);

      // 导航菜单
      // this.dataList=[]
      // this.findById(this.ztreeDataSource,m.parentId)
      // this.dataList= this.dataList.reverse();
      // this.dataList.push(m);
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
    addGroup: function (model) {
      console.log("groupManagement--------------------------------------------");
      console.log(model);
      console.log(model.name);
    },
    //简单树转换复杂树
    traversezTreeData:function (data) {
      var zTreeData = [];
      for(let i in data){
        let parentData = data[i];
        //console.log('--------parentData---------');
        //console.log(parentData);
        parentData.children = [];
        parentData.ico = true;
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
      console.log('--------data[0]---------');
      console.log(data[0]);
      return zTreeData;
    }
  },
  mounted (){
    let _this = this;
    //组织树数据获取
    getGroupTree(VueCookies.get('generalGroupId')).then(function (res) {
      _this.ztreeDataSource = _this.traversezTreeData(res.data.result.data);
      //_this.dataParameter.orgIds = _this.ztreeDataSource[0].id;
      //_this.getOrgUserInfo();
    }).catch(err=>{
      console.log(err,'请求失败！');
    });
    //查看套餐
    checkSetMealUse(VueCookies.get('generalGroupId')).then(function(res){
      console.log('===========================');
      console.log(res);
      if(res.data.status == '0'){
        //监测单位数--总数
        _this.checkSetMealUse.maxDatanode = res.data.result.data.maxDatanode;
        //监测单位数--已用
        _this.checkSetMealUse.alreadyDatanode = res.data.result.data.alreadyDatanode;
        //监测单位数--剩余
        _this.checkSetMealUse.remaindDatanode = res.data.result.data.maxDatanode - res.data.result.data.alreadyDatanode;
        //人员数--总数
        _this.checkSetMealUse.maxUser = res.data.result.data.maxUser;
        //人员数--已用
        _this.checkSetMealUse.alreadyUser = res.data.result.data.alreadyUser;
        //人员数--剩余
        _this.checkSetMealUse.remaindUser = res.data.result.data.maxUser - res.data.result.data.alreadyUser;
      }
    }).catch(err=>{
        console.log(err,'请求失败！')
    });
  }


}
</script>
<style lang="less" scoped>
.clearfix:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}

.clearfix {
  overflow: auto;
  zoom: 1; /* For IE 6/7 (trigger hasLayout) */
}
.wrap {
  background-color: #f2f2f2;
  width: 100%;
  min-width: 980px;
}
.center {
  margin: 75px auto 30px;
  width: 94%;
  min-height: 500px;
  position: relative;
}
.set-infowary {
  width: 81%;
  float: right;
}
.tit {
  width: 100%;
  //border-bottom: 1px solid #e5e5e5;
  border: 1px solid #e5e5e5;
  padding: 20px 0 0;
  font-size: 16px;
  font-family: "黑体";
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
}
.tit a {
  padding-bottom: 20px;
  color: #4C4C4C;
  margin-left: 20px;
  float: left;
  padding-right: 5px;
  display: block;
}
.tit a.hover {
  border-bottom: 2px solid #38a9e1;
  color: #1f96d2;
}
.group_management_wrap {
  width: 100%;
  margin: 12px auto 0;
  padding-bottom: 20px;

}
.group_tree_wrap {
  width: 240px;
  float: left;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  background-color: #fff;
}
//左侧树样式
.group_tree_box {
  border-radius: 6px;
  background-color: #fff;
  overflow: auto;
  min-height: 800px;
  /*
  .ztree {
    *{
      font-size: 14px;
    }
    li {
      line-height: 40px !important;
      a {
        height: 40px;
        line-height: 40px;
        padding-top: 0px;
      }
    }
  }*/
}



//右侧套餐统计
.set_meal_statistics {
  overflow: hidden;
  margin-left: 252px;
  // padding-top: 10px;
  width: auto;
  float: none;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  background-color: #fff;

  .statistics_title {
    height: 48px;
    line-height: 48px;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    padding: 0 30px;
    border-bottom: 1px solid #e6e6e6;
  }

  .statistics_list {
    .statistics_list_con {
      padding: 23px 0;
      border-bottom: 1px solid #e6e6e6;

      li {
        float: left;
        border-right: 1px dashed #e6e6e6 ;
        height: 90px;
        line-height: 45px;
        text-align: center;
        box-sizing:border-box;
      -moz-box-sizing:border-box; /* Firefox */
      -webkit-box-sizing:border-box; /* Safari */

        .bigger {
          color: #333333;
          font-size: 18px;
          font-weight: bold;
        }

        .smaller {
          color: #999;
          font-size: 14px;
          font-weight: bold;
        }

        &:nth-child(1){
          width: 34%;
        }

        &:nth-child(2){
          width: 22%;
        }

        &:nth-child(3){
          width: 22%;
        }

        &:nth-child(4){
          width: 22%;
          border-right: none;
        }
      }

      &.last {
        border-bottom: none
      }
    }
  }
}
//授权弹窗
.authorize_group .el-form {
  max-height: 440px;
  overflow: auto;
}
.authorize_company_box {
  padding: 30px 0;
  text-align: center;
}
.authorize_company_box p {
  color: #666;
  font-size: 16px;
}
.authorize_company_box h3 {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-top: 12px;
}
.authorize_company_content{
  padding: 0 20px 30px;
}
.authorize_left {
    float: left;
    width: 240px;
}
.authorize_right{

}
.authorize_width {
  width: 498px;
	width: 510px;
  float: right;
}
.authorize_title {
	color: #333;
	font-size: 16px;
	font-weight: bold;
  //border-bottom: 1px solid #e5e5e5;
	border-bottom: 1px solid #ebeef5;
	line-height: 48px;

	label {
		color: #666;
		font-size: 14px;
		padding-right: 12px;
		float: right;

		input[type="checkbox"] {
			margin-left: 4px;
			vertical-align: text-bottom;
		}
	}
}
.authorize_right .authorize_title{
  border-bottom: none
}
//添加组织
.org_tips {
  color: #ff3333;
  font-size: 12px;
  margin: 20px 0 0;
  background: #fff3f3;
  height: 32px;
  line-height: 32px;
  padding: 0 18px;
  border-radius: 6px;
}
</style>
