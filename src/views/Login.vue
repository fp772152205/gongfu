<template>
<!--背景图--> 
<div>
    <section class="top">
      <div class="logo">
        <img src="../assets/images/logo_login.png">
      </div>
    </section>
<!--登录-->
    <section>
      <el-row>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title"><img src="../assets/images/text_login.png" alt=""></h3>
        <el-col :span="12">
          <aside width="200px" class="login-img">
            <img src="../assets/images/bg_login.jpg" alt="">
          </aside>
       </el-col>
        <el-col :span="12">
          <div class="login-text">
            <el-form-item prop="account">
              <el-input  type="text" class='widths user' v-model="ruleForm2.account" auto-complete="off" placeholder="输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input   type="password" class='widths users' v-model="ruleForm2.checkPass" auto-complete="off" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input   type="text" class='users1' v-model="ruleForm2.code" auto-complete="off" placeholder="输入验证码"></el-input>
               <img alt="点击刷新" class='yanzheng' id="img_RandomCode" title="点击刷新" src="data:image/jpg;base64,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">
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button class='bg'  style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            </el-form-item>
          </div>
		  </el-col>
      </el-form>
      </el-row>
    </section>
</div>
</template>
<script>
import {getUserInfo,getMenu} from '../api/api'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456',
          code:1111
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          code:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
           // TODO 登录
          // login(loginParams).then(res=>{
          //    console.log(res)
          //  })
           getUserInfo(loginParams).then(res => {
              this.logining = false;
              let msg="登录成功";
              let user=res[0];
              let code=200;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                this.$message({
                  message: msg,
                  type: 'success'
                });
                this.$store.commit('user',user);//存储到session
                this.$store.commit('token',user.token);
                this.$router.push({ path: '/main' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>
<style lang="scss" scoped>
.yanzheng{
  height:36px;
  // margin-left:30px;
  right: 0;
      position: absolute
}
 .top {
	background-image: url(../assets/images/banner_login.jpg);
	background-repeat: no-repeat;
	min-width: 500px;
	min-height: 350px;
	height: 34vh;
	text-align: center;
	z-index: 1;
}
.logo {
	position: relative;
	text-align: center;
	width: 90vw;
    img{
        min-width: 500px;
	      width: 41vw;
    }
}
.login-container {
  // 加阴影
  -moz-box-shadow: 10px 10px 10px  rgba(0,0,0,.1);
  -webkit-box-shadow: 10px 10px 10px rgba(0,0,0,.1);
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: -66px auto;
  width: 50%;
  height:480px;
  min-width: 700px;
  padding: 0px 0px 15px 0px;
  background: #fff;
  border: 1px solid #eaeaea;
}
    // box-shadow: 0 0 25px #cac6c6;
.title {  
  margin: 0px auto 40px auto;
  padding: 15px ;
  text-align: center;
  color: #505458;
  background-color: #EBEBEB;

}
.login-img{
  float:left;
  margin-right:10%;
  margin-left:15%;
}
.login-text{
  float:left;
  margin-top:50px;
  margin-left:30px;
}
.remember {
  margin: 0px 0px 35px 0px;
}
.widths{
  width:83%;
  height:40px;
}
.users1{
  background-image: url('../assets/images/icon_user.jpg');/*设置小图标*/
  background-size: 25px 25px;/*小图标的大小*/
  background-position: 5px 4px;/*小图标在input的位置*/
  background-repeat: no-repeat;/*背景小图标不重复*/
  padding: 0px 0px 0px 40px;/*设置input内边距*/
  /*设置input样式好看*/
  border:1px solid #ddd;
  width:100px;
  }
.users{
  background-image: url('../assets/images/icon_password.jpg');/*设置小图标*/
  background-size: 25px 25px;/*小图标的大小*/
  background-position: 5px 4px;/*小图标在input的位置*/
  background-repeat: no-repeat;/*背景小图标不重复*/
  padding: 0px 0px 0px 40px;/*设置input内边距*/
  /*设置input样式好看*/
  border:1px solid #ddd;
  }
.user{
    background-image: url('../assets/images/icon_code.jpg');/*设置小图标*/
    background-size: 25px 25px;/*小图标的大小*/
    background-position: 5px 4px;/*小图标在input的位置*/
    background-repeat: no-repeat;/*背景小图标不重复*/
    margin-top: 5px;
    padding: 0px 0px 0px 40px;/*设置input内边距*/
    /*设置input样式好看*/
    border:1px solid #ddd;
  }
.bg{background: -moz-linear-gradient(left, #f7981e 0%, #fe6d07 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7981e), color-stop(100%,#fe6d07));
  background: -webkit-linear-gradient(left, #f7981e 0%,#fe6d07 100%);
  background: -o-linear-gradient(left, #f7981e 0%,#fe6d07 100%);
  background: -ms-linear-gradient(left, #f7981e 0%,#fe6d07 100%);
  background: linear-gradient(to right, #f7981e 0%,#fe6d07 100%);
  text-overflow: ellipsis;
  color:#fff;
  height:45px;
}
 
</style>
<style>
div.login-text input.el-input__inner {
border:none;
outline:medium;
}
</style>
