<template>
	<div class="wrap">
		<yqzj-Head></yqzj-Head>
		<div class="center">
			<set-nav></set-nav>

			<div class="set-infowary">
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

				<!-- Form -->
				<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

				<el-dialog :model="form" title="添加组织" :visible.sync="dialogFormVisible" 
				:close-on-click-modal=false
				custom-class="group-management" @close="closeDialog">
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
				  <div slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				  </div>
				</el-dialog>

				<!-- Form -->
				<el-button type="text" @click="dialogFormVisible2 = true">打开授权表单的 Dialog</el-button>

				<el-dialog :model="form2" title="系统授权" :visible.sync="dialogFormVisible2"  :width="form2width"
				:close-on-click-modal=false
				custom-class="group-management" @close="closeDialog">
				  <el-form :model="form2" ref="form2" :rules="rules" :label-position="labelPosition" :label-width="formLabelWidth">
				    <div class="authorize_company_box"><p>授权单位</p> <h3>技术部3组b组</h3></div>
				    <div class="authorize_company_content clearfix">
				    	<div class="authorize_left">
				    		<div class="authorize_title clearfix"></div>
				    		<div class="authorize_tree"></div>
				    	</div>
				    	<div class="authorize_right authorize_width"></div>
				    	<div class=""></div>
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
//import {getOrganizationalManagementTree} from '../../components/axios/api';

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
        form2width: '840px'
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
.authorize_company_box {
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
  //padding: 0 30px 30px;
}
.authorize_left {
    float: left;
    width: 240px;
}
.authorize_right{
	
}
.authorize_width {
	width: 498px;
    float: right;
}
.authorize_title {
	color: #333;
	font-size: 16px;
	font-weight: bold;
	border-bottom: 1px solid #e5e5e5;
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
</style>