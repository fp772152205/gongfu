<template>
  <div class="wrapper">
    <!-- <v-head></v-head> -->
    <div class="header">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/images/logo_home.png" @click="refreshPage" />
      </div>
      <div class="header-right">
        <div class="header-user-con">
          <!-- 用户头像 -->
          <div class="user-avator">
            <img :src="sysUserAvatar" />
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{sysUserName}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
               <router-link to="/user/profile">
              <el-dropdown-item>个人信息</el-dropdown-item>
            </router-link>
            <router-link to="/user/changepwd">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!--导航菜单-->
    <div class="sidebar">
      <div class="menu-title">
        <i class="fa fa-list" @click="collapseChage"></i>
        <strong v-if="!collapse">管理员菜单</strong>
      </div>
      <div class="menu-container">
        <el-menu
          :default-active="$route.path"
          :collapse="collapse"
          :unique-opened="false"
          router
          :collapse-transition="false"
        >
          <v-menutree :menuData="$router.options.routes"></v-menutree>
        </el-menu>
      </div>
    </div>
    <!-- 页面内容 -->
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content-container">
        <el-col :span="24" class="breadcrumb-container">
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <span class="icons">
            <i class="fa fa-refresh" aria-hidden="true" @click="reload"></i>
          </span>
        </el-col>
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view v-if="isRouterAlive"></router-view>
          </transition>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import vMenutree from "@/components/MenuTree";
import bus from "../views/bus";
export default {
  components: {
    vMenutree
  },
  data() {
    return {
      isRouterAlive: true, //是否加载组件
      collapse: false,
      sysUserName: "",
      sysUserAvatar: ""
    };
  },
  methods: {
    // 刷新主页
    refreshPage() {
      this.$router.push("/main");
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      var _this = this;
      if (command == "loginout") {
        this.$confirm("确认退出吗?", "提示", {})
          .then(() => {
            _this.$store.commit("logout");
            sessionStorage.removeItem("user");
            _this.$router.push("/login");
          })
          .catch(() => {});
      }
    },
    // 重新加载组件
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    }
  },
  mounted(){
     let user =this.$store.getters.user;
     if(user){
this.sysUserName=user.realname?user.realname:"系统管理员";
this.sysUserAvatar=user.headicon?user.headicon: require("../assets/images/user.png");
    }; 
  },
  created() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
    // this.$router.push("/main");
  }
};
</script>
<style scoped lang="scss">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  font-size: 22px;
  background-color: #fbb330;
  background: -moz-linear-gradient(left, #fbb330 0%, #fe6d07 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #fbb330),
    color-stop(100%, #fe6d07)
  );
  background: -webkit-linear-gradient(left, #fbb330 0%, #fe6d07 100%);
  background: -o-linear-gradient(left, #fbb330 0%, #fe6d07 100%);
  background: -ms-linear-gradient(left, #fbb330 0%, #fe6d07 100%);
  background: linear-gradient(to right, #fbb330 0%, #fe6d07 100%);
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 160px;
  padding-left: 10px;
  cursor:pointer;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 100px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.sidebar {
  background-color: #ffffff;
  display: block;
  width: 256px;
  position: absolute;
  top: 100px;
  left: 0px;
  height: auto;
  bottom: 0px;
  overflow: hidden;
  .menu-title {
    position: relative;
    text-align: left;
    padding-top: 10px;
    padding-left: 25px;
    padding-bottom: 20px;
    font-size: 1.5em;
    i{
     cursor: pointer;
    }
    // background-color: #ffffff;
  }
  .menu-container {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .menu-container::-webkit-scrollbar {
    width: 1px;
    background-color: #fbb22f;
  }
}

.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 100px;
  bottom: 0;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;

  .content-container {
    width: auto;
    // padding: 40px;
    background: #efefef;
    position: absolute;
    left: 0;
    right: 0;
    top: 0px;
    bottom: 0px;
    margin-bottom: 50px;
    /// -webkit-transition: left .3s ease-in-out;
    // transition: left .3s ease-in-out;
    // padding: 20px;
    .breadcrumb-container {
      height: 40px;
      position: relative;
      overflow: hidden;
      padding: 0px 20px;
      // background: #ffffff;
      font-size: 1.2rem;
      // font-size: 24px;
      // .title {
      //   width: 200px;
      //   float: left;
      //   color: #475669;
      // }
      .breadcrumbs {
        position: absolute;
        right: 18px;
        text-align: center;
        width: 100px;
        // background: #fff;
        padding-top: 15px;
        // z-index: 20;
        // -webkit-box-sizing: border-box;
        // box-sizing: border-box;
      }
      .icons {
        text-decoration: none;
        position: absolute;
        right: 40px;
        text-align: center;
        padding-top: 12px;
        color: #fbb22f;
        cursor:pointer;
      }
      .breadcrumb-inner {
        position: absolute;
        left: 18px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
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
}
.content-collapse {
  left: 65px;
}
</style>

