<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="22" class="logo">
        <img src="../assets/images/logo_home.png" />
      </el-col>
      <el-col :span="2" class="tools">
        <span @click="logout">
          <i class="fa fa-power-off"></i> 退出系统
        </span>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside>
        <!-- 用户信息 -->
        <div shadow="never" class="userinfo">
          <div trigger="hover">
            <span class="userinfo-inner">
              <img :src="sysUserAvatar" />
              {{sysUserName}}
            </span>
          </div>
        </div>
        <div class="menu-title">
          <strong>管理员菜单</strong>
        </div>
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class @select="handleselect" unique-opened router>
          <MenuTree :menuData="this.menuData"></MenuTree>
        </el-menu>
      </aside>
      <!-- 页面内容 -->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <span class="title">{{$route.name}}</span>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
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
      sysUserName: "系统管理员",
      sysUserAvatar: require("../assets/images/user.png"),
      menuData: this.menu
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
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
    console.log(user)
    if (user) {
      this.sysUserName = user.name ||'系统管理员' ;
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
@import "~scss_vars";
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 100px;
    line-height: 60px;
    background-color: #fbb330;
    background-image: url(../assets/images/banner_home.jpg);
    color: #ffffff;
    .logo {
      height: 100px;
      font-size: 22px;
      padding-left: 70px;
      line-height: 100px;
      img {
        float: left;
        margin: 10px 10px 10px 18px;
      }
    }
    .tools {
      height: 100px;
      line-height: 100px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 100px;
    bottom: 0px;
    overflow: hidden;
    aside {
      // flex:0 0 256px;
      width: 256px;
      .userinfo:before {
        content: "";
        width: 100%;
        height: 0.5em;
      }
      .userinfo {
        position: relative;
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
          img {
            position: absolute;
            top: 90px;
            left: 92px;
            width: 70px;
            height: 70px;
            border-radius: 40px;
          }
        }
      }
      .menu-title {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 1.5em;
      }
    }

    .menu-expanded {
      flex: 0 0 256px;
      width: 256px;
    }
    .content-container {
      background: #efefef;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        margin-bottom: 15px;
        font-size: 24px;
        .title {
          width: 200px;
          float: left;

          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>