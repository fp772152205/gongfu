<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="22" class="logo">
        <img src="../assets/images/logo_home.png" />
      </el-col>
      <el-col :span="2" class="tools">
  <el-dropdown>
    <div class="userinfo-inner indexs" >
       <img class='imgs' :src="sysUserAvatar" />
        <div ref="echarType" style='color:#fff'>
         张某某
        </div>
    </div>
    <el-dropdown-menu class='dropdowns' slot="dropdown" >
      <el-dropdown-item>个人信息</el-dropdown-item>
      <el-dropdown-item @click.native="seeTable">修改密码</el-dropdown-item>
      <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
      </el-col>
    </el-col>
  <el-col :span="24" class="main">
<aside>
<!-- 用户下拉列表 -->
        <div class="menu-title">
          <strong>管理员菜单</strong>
        </div>
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="menu-container" unique-opened router>
          <el-menu-item index="/main">
            <i class="el-icon-message"></i>
            <span slot="title">首页11111</span>
          </el-menu-item>
          <MenuTree :menuData="this.menuData"></MenuTree>
        </el-menu>
      </aside>
      <!-- 页面内容 -->
      <div class="content-container">
        <el-col :span="24" class="breadcrumb-container">
          <span class="title">{{$route.name}}</span>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import MenuTree from "@/components/MenuTree";
export default {
  props: ["menu"],
  components: {
    MenuTree: MenuTree
  },
  data() {
    return {
       dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
      sysUserName: "系统管理员",
      sysUserAvatar: require("../assets/images/user.png"),
      menuData: this.menu
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //退出登录
    logout:function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {})
        .then(() => {
          _this.$store.commit("logout");
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  mounted() {
    var user = this.$store.getters.user;
    if (user) {
      this.sysUserName = user.name || "系统管理员";
      this.sysUserAvatar = user.avatar || require("../assets/images/user.png");
    }
  },
  created() {
    // 动态加载路由
    this.menuData = this.$router.options.routes;
    this.$router.push("/main");
  }
};
</script>

<style scoped lang="scss">
.dropdowns{
  text-align: center;
}
.imgs{
  width: 50px;
  height: 50px;
  border-radius: 40px;
  margin-top:10px;
}
.indexs{
  z-index: 1;
}
@import "~scss_vars";
.container {
  // position: relative;
  // top: 0px;
  // bottom: 0px;
  background: #efefef;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    height: 100px;
    line-height: 60px;
    width: 100%;
    position: relative;
    background-color: #fbb330;
    background-image: url(../assets/images/banner_home.jpg);
    color: #ffffff;
    .logo {
      height: 100px;
      font-size: 22px;
      padding-left: 70px;
      line-height: 100px;
    }
    .tools {
      line-height:20px;
      cursor: pointer;
    }
  }
  aside {
    background-color: #ffffff;
    display: block;
    width: 256px;
    .userinfo {
      position:relative;
      top: 0;
      text-align: center;
      width: 256px;
      height: 288px;
      line-height: 350px;
      background-color: #ffffff;
      background-image: url("../assets/images/bg_menu.jpg");
      background-repeat: no-repeat;
      border: none;

      .userinfo-inner {
        cursor: pointer;
        color: #ffffff;
        width: 256px;
       
      }
    }
    a{
      text-decoration: none ;
      color: #ffffff;
    }
    .menu-title {
      position: relative;
      text-align: center;
      padding-top:10px;
      padding-bottom: 20px;
      font-size: 1.5em;
            background-color: #ffffff;
    }
    .menu-container{
    overflow-y: auto;
    overflow-x: hidden;
    }
      .menu-container::-webkit-scrollbar {
    width: 1px;
    background-color: #fbb330;
  }
  }
  }
  .content-container {
    background: #efefef;
    position: absolute;
    left: 256px;
    right: 0;
    top: 100px;
    bottom: 0px;
    margin-bottom: 50px;
    // -webkit-transition: left .3s ease-in-out;
    // transition: left .3s ease-in-out;
    // padding: 20px;
    .breadcrumb-container {
      position: relative;
      overflow: hidden;
      padding: 10px 20px;
      background: #ffffff;
      font-size: 24px;
      .title {
        width: 200px;
        float: left;
        color: #475669;
      }
      .breadcrumb-inner {
        position: absolute;
        left: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        width: 200px;
        background: #fff;
        padding-top: 15px;
        z-index: 20;
      }
    }
    .content-wrapper {
      padding: 15px;
      // background-color: #ffffff;
      // width: auto;
      height: 100%;
      overflow-y: auto;
      // -webkit-box-sizing: border-box;
      // box-sizing: border-box;
    }

}


</style>