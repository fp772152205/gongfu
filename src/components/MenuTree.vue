
<template>
    <div>		
        <template v-for="(item,index) in menuData" >
            <el-submenu :index="index+''"  :key="index" v-if="!item.hidden&&item.children">
                <template slot="title">
                 <i class="el-icon-message"></i>
                           <!-- <i :class="item.iconCls"></i> -->
                    <span slot="title"> {{item.name}}</span>
                </template>
                <MenuTree :menuData="item.children"></MenuTree>
            </el-submenu>
            <el-menu-item :index="item.path" :key="index" v-else-if="!item.hidden">
                <i class="el-icon-message"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>

        </template>
    </div>
</template>
<script>
  export default {
    props: ['menuData'],
    name: 'MenuTree'
  }
</script>