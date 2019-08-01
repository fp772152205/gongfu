
<template>
  <fragment>
    <template v-for="(item,index) in menuData">
      <el-submenu :index="index+''" :key="index" v-if="!item.hidden&&item.children&&!item.leaf"      >
        <template slot="title" >
          <i class="el-icon-message"    ></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <MenuTree :menuData="item.children"></MenuTree>
      </el-submenu>
      <el-menu-item :index="item.children[0].path" :key="index" v-else-if="!item.hidden&&item.leaf"  >
        <i class="el-icon-message"></i>
        <span slot="title">{{item.children[0].name}}</span>
      </el-menu-item>
      <el-menu-item :index="item.path" :key="index" v-else-if="!item.hidden" >
        <i class="el-icon-message"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </fragment>
  </template>
<script>
import bus from "../views/bus";
export default {
  props: ["menuData"],
  name: "MenuTree",
  data() {
    return {
      isCollapse: false
    };
  },
  methods:{
      hoverShow(data){
          if(this.isCollapse){
              console.log(data)
          }
     
      },
  },
  created() {
    var self = this;
    this.isCollapse = self.$parent.isCollapse;
    bus.$on("collapse", val => {
       self.$parent.isCollapse = val;
    });
  }
};
</script>