<template>
  <!--背景图-->
  <div>
    <section class="top">
      <div class="logo">
        <img src="../../assets/images/logo_login.png" alt />
      </div>
    </section>
    <!--登录-->
    <section>
      <el-row>
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-position="left"
          label-width="0px"
          class="rights demo-ruleForm login-container"
        >
          <div class="title">
            <img src="../../assets/images/text_login.png" alt />
          </div>
          <el-row class="div_login">
            <el-col :span="12">
              <aside width="200px" class="login-img">
                <img class="login-img_s" src="../../assets/images/bg_login.jpg" alt />
              </aside>
            </el-col>
            <el-col :span="12">
              <div>
                <div class="login-text">
                  <div class="rights" name="login">
                    <el-form-item prop="account">
                      <el-input
                        type="text"
                        class="widths user"
                        v-model="ruleForm2.account"
                        auto-complete="off"
                        placeholder="输入账号"
                        
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                      <el-input
                        type="password"
                        class="widths users"
                        v-model="ruleForm2.checkPass"
                        auto-complete="off"
                        placeholder="输入密码"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                      <el-input
                        type="text"
                        class="users1"
                        v-model="ruleForm2.code"
                        auto-complete="off"
                        placeholder="输入验证码"
                      ></el-input>
                      <img
                        alt="点击刷新"
                        :src="vsCode"
                        @click="changeCodeImg()"
                        class="yanzheng"
                        id="img_RandomCode"
                        title="点击刷新"
                      />
                    </el-form-item>
                    <el-form-item style="width:100%;">
                      <el-button 
                        class="gradient"
                        style="width:100%;"
                        @click.native.prevent="handleSubmit2"
                        @keyup.enter.native="loginEnter('loginData')"
                        :loading="logining"
                      >登录</el-button>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </section>
  </div>
</template>
<script>
import md5 from "js-md5";
import {apiLogin } from "../../api/api";
export default {
  data() {
    return {
      vsCode: "",
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: "",
        code: ""
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      checked: true
    };
  },
  created() {
    this.CodeImg(); //页面初始化的时候调用  第一次刷新的验证码
    var _self = this;
    document.onkeydown = function(e) {
      if (window.event == undefined) {
        var key = e.keyCode;
      } else {
        var key = window.event.keyCode;
      }
      if (key == 13) {
        _self.loginEnter("loginData");
      }
    };
  },
  methods: {
    loginEnter() {
      this.login();
    },
    login() {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          let data = {
            account: this.ruleForm2.account,
            password: md5(this.ruleForm2.checkPass),
            verifycode: this.ruleForm2.code
          };
          apiLogin(data).then(res => {
            this.logining = false;
            document.onkeydown = undefined;
            if (res.success == true) {
              let user = res.data;
              this.$store.commit("user", user); //存储到session
              this.$store.commit("token", user.token); //保存后端返回来的token
              this.$message({
                message: "登录成功",
                type: "success"
              });
              this.$router.push({ path: "/main" }); //跳转到主页
            } else {
              this.CodeImg(); //这个是回车的时候如果错了 会刷新验证码
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //点击刷新验证码
    changeCodeImg() {
      //这里是点击验证码图片的时候会刷新验证码
      this.CodeImg();
    },
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    // 验证码
    CodeImg() {
      //这个是图片验证码的函数
      let num = Math.ceil(Math.random() * 100);
      this.vsCode = `${process.env.API_ROOT}/api/account/authcode?num=${num}`;
    },
    // 登录
    handleSubmit2(ev) {
      this.login();
    }
  }
};
</script>
<style lang="scss" scoped>
.logo img[data-v-100c6c10] {
  min-height: 200px;
}
html,
body {
  height: 100vh;
  margin: 0px;
}
.el-form-item {
  height: 4vh;
  min-height: 30px;
}
.yanzheng {
  height: 3vh;
  width: 7vh;
  min-width: 65px;
  min-height: 30px;
  right: 0;
  position: absolute;
}
.top {
  background-image: url("../../assets/images/banner_login.jpg");
  background-repeat: no-repeat;
  min-width: 500px;
  min-height: 200px;
  height: 30vh;
  text-align: center;
  z-index: 1;
}
.logo {
  position: relative;
  text-align: center;
  width: 90vw;
  img {
    min-width: 500px;
    width: 63vh;
  }
}
.login-container {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  // -webkit-border-radius: 5px;
  // border-radius: 5px;
  // -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 0 auto;
  width: 50%;
  min-width: 700px;
  // min-height: 360px;
  // padding: 0px 0px 15px 0px;
  background: #fff;
  border: 1px solid #eaeaea;
  .title {
    // margin: 0px auto 40px auto;
    // padding: 15px;
    height: 60px;
    line-height: 80px;
    margin-top: -60px;
    text-align: center;
    background-color: #eaeaea;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .div_login {
    // 加阴影
    box-shadow: 0px 10px 10px rgb(234, 234, 234);
      -moz-box-shadow: 0px 10px 10px rgb(234, 234, 234);
    -webkit-box-shadow: 0px 10px 10px rgb(234, 234, 234);
    height: 50vh;
    min-height: 300px;
    padding: 40px;
  }
  .login-img {
    float: left;
    margin-right: 10%;
    margin-left: 15%;
    .login-img_s {
      height: 35vh;
      min-width: 197px;
      min-height: 233px;
    }
  }
  .login-text {
    float: left;
    margin-top: 50px;
    margin-left: 50px;
    height:40vh;
  }
}

.remember {
  margin: 0px 0px 35px 0px;
}
.widths {
  width: 83%;
  // height:4vh;
}
.users1 {
  background-image: url("../../assets/images/icon_code.jpg"); /*设置小图标*/
  background-size: 25px 25px; /*小图标的大小*/
  background-position: 5px 4px; /*小图标在input的位置*/
  background-repeat: no-repeat; /*背景小图标不重复*/
  padding: 0px 0px 0px 40px; /*设置input内边距*/
  /*设置input样式好看*/
  border: 1px solid #ddd;
  width: 100px;
}
.users {
  background-image: url("../../assets/images/icon_password.jpg"); /*设置小图标*/
  background-size: 25px 25px; /*小图标的大小*/
  background-position: 5px 4px; /*小图标在input的位置*/
  background-repeat: no-repeat; /*背景小图标不重复*/
  padding: 0px 0px 0px 40px; /*设置input内边距*/
  /*设置input样式好看*/
  border: 1px solid #ddd;
}
.user {
  background-image: url("../../assets/images/icon_user.jpg"); /*设置小图标*/
  background-size: 25px 25px; /*小图标的大小*/
  background-position: 5px 4px; /*小图标在input的位置*/
  background-repeat: no-repeat; /*背景小图标不重复*/
  padding: 0px 0px 0px 40px; /*设置input内边距*/
  /*设置input样式好看*/
  border: 1px solid #ddd;
}
.gradient {
  background: -moz-linear-gradient(left, #f7981e 0%, #fe6d07 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #f7981e),
    color-stop(100%, #fe6d07)
  );
  background: -webkit-linear-gradient(left, #f7981e 0%, #fe6d07 100%);
  background: -o-linear-gradient(left, #f7981e 0%, #fe6d07 100%);
  background: -ms-linear-gradient(left, #f7981e 0%, #fe6d07 100%);
  background: linear-gradient(to right, #f7981e 0%, #fe6d07 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7981e', endColorstr='#fe6d07',GradientType=0 );
  text-overflow: ellipsis;
  color: #fff;
  height: 5vh;
  min-width: 200px;
  min-height: 33px;
  border: none;
}

:root.gradient {
  filter: none;
}
</style>
<style>
div.login-text input.el-input__inner {
  border: none;
  outline: medium;
}
</style>
