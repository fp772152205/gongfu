<template>
  <div class='container'>
    <i  class="el-icon-edit form_title"></i><span class='form_title'>编辑人员信息</span>
    <hr>
    <el-form  label-width='100px' :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" :inline="true">
      <el-form-item   label="姓名：" prop="name">
        <el-input  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-select  class='select_width' v-model="ruleForm.gender" placeholder="请选择">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="账号：" prop="code">
        <el-input  v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="pwd" >
        <el-input  v-model="ruleForm.pwd"></el-input>
      </el-form-item>

     <el-form-item label="昵称：">
        <el-input  v-model="ruleForm.pet"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="iphone" >
        <el-input  v-model="ruleForm.iphone"></el-input>
      </el-form-item>
      <el-form-item label='身份证号：' >
        <el-input  v-model="ruleForm.identity"></el-input>
      </el-form-item>
      <el-form-item label="出身日期：">
        <el-input  v-model="ruleForm.data"></el-input>
      </el-form-item>
      <el-form-item label="名族："  >
        <el-input  v-model="ruleForm.group"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌：">
        <el-input  v-model="ruleForm.politics"></el-input>
      </el-form-item>
<!--下拉框 -->
    <el-form-item label="婚姻状态：">
      <el-select class='select_width' v-model="ruleForm.magege" placeholder="请选择">
        <el-option label="是" value="already"></el-option>
        <el-option label="否" value="none"></el-option>
      </el-select>
    </el-form-item> 
     <el-form-item label="邮箱地址：">
        <el-input  v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="所在部门：">
      <el-select class='select_width' v-model="ruleForm.section" placeholder="请选择">
        <el-option label="技术部" value="skill"></el-option>
        <el-option label="客服部" value="service"></el-option>
      </el-select>
    </el-form-item> 
     <el-form-item  label="所在岗位：">
      <el-select class='select_width' v-model="ruleForm.station" placeholder="请选择">
        <el-option label="经理" value="manage"></el-option>
        <el-option label="文员" value="office"></el-option>
      </el-select>
    </el-form-item> 
     <el-form-item  label="在职情况：">
      <el-select class='select_width' v-model="ruleForm.situation" placeholder="请选择">
        <el-option label="在职" value="manage"></el-option>
        <el-option label="离职" value="office"></el-option>
      </el-select>
    </el-form-item> 
      <el-form-item label="入职日期：">
        <el-input  v-model="ruleForm.entry"></el-input>
      </el-form-item>
      <el-form-item label="离职日期：">
        <el-input  v-model="ruleForm.dimission"></el-input>
      </el-form-item>
      <el-form-item label="排序号：">
        <el-input  v-model="ruleForm.number"></el-input>
      </el-form-item>
       <el-form-item  label="web端角色：">
      <el-select class='select_width' v-model="ruleForm.web" placeholder="请选择">
        <el-option label="在职" value="manage"></el-option>
        <el-option label="离职" value="office"></el-option>
      </el-select>
    </el-form-item> 
      <el-form-item  label="手机端角色：">
      <el-select class='select_width' v-model="ruleForm.iphone_role" placeholder="请选择">
        <el-option label="在职" value="manage"></el-option>
        <el-option label="离职" value="office"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="用户小组：">
        <el-input  v-model="ruleForm.users"></el-input>
      </el-form-item>
      <el-form-item label="协同工作角色:">
        <el-input  v-model="ruleForm.cooperative"></el-input>
      </el-form-item> 
  <!-- 特殊权限 -->
    <el-form-item  label="特殊权：">
      <el-input  type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item><br>
    <el-form-item  label="特长及奖项:">
      <el-input  type="textarea" v-model="ruleForm.encourage"></el-input>
    </el-form-item>
<!-- 提交按钮 -->
    <el-form-item class='submit_buttom'>
     <el-button type="button" style='background-color:#20a0ff; color:#fff' @click="submitForm('ruleForm'),dialogVisible = true">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
<!-- 测试 -->
<!-- 点击表单提交 表单弹出来之后 页面内容 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <span>确定提交</span>
  <span slot="footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
export default {
    data() {
      return {
        dialogVisible: false,
        // input表单内容绑定
         ruleForm: {
           encourage:'',
           cooperative:'',
           users:'',
           iphone_role:'',
           web:'',
           number:'',
           dimission:'',
           situation:'',
           station:'',
           section:'',
           magege:'',
           special:'',
           email:'',
           group:'',
           data:'',
           identity:'',
           pet:'',
          iphone:'',
          name: '',
          gender: '',
          code: '',
          pwd: '',
          region:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        // 判断正则表达式
         rules: {
          name: [
            { required: true, message: '请输入姓名', trigger:'blur'},
            { min:3, max:5, message: '长度在 3 到 5 个字符', trigger:'blur'}
          ],
          gender: [
            { required: true, message: '请输入性别', trigger:'blur'}
          ],
          code: [
            { required: true, message: '请输入账号', trigger:'blur'},
            { type: 'number', message: '账号必须为数字值'}
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger:'blur'},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger:'blur'}
          ],
           iphone: [
            { required: true, message: '请输入手机号码', trigger:'blur'},
            { min: 11, max: 5, message: '长度在 3 到 5 个字符', trigger:'blur'}
          ],
          },
      }
    },
     methods: {
      // 表单提交判断是否必填内容
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 表单重置执行函数
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
.demo-ruleForm{
  margin-top:25px;
}
.form_title{
  color:#48576a;
  padding-left:30px;
  font-size:17px;
  font-weight:800;
}
.el-textarea__inner{
   width:237%;
}
.select_width{
  width:100%;
}
.el-select.el-input--inner{
   width:100% ;
}
.el-select-dropdown__item hover{
   width: 100% ;
}
.el-input, .el-input__inner{
   width: 100% ;
}
.submit_buttom{
  width: 100% !important;
  text-align: center;
}
.el-form--inline .el-form-item__content{
   width:75%;
}
/* 一行想放下3个框  调节百分比 */
.el-form--inline .el-form-item{
  width:44%;
}
</style>
<style scoped>
.form_width{
  width:100% !important;
}
</style>

