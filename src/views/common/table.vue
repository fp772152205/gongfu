<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUser">查询</el-button>
        </el-form-item>
        <el-row>
          <el-button type="primary">新增</el-button>
          <el-button type="success">修改</el-button>
          <el-button type="info">删除</el-button>
          <el-button type="warning">导入</el-button>
          <el-button type="danger">导出</el-button>
        </el-row>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="tableData" highlight-current-row v-loading="loading">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="account" label="账号" sortable></el-table-column>
        <el-table-column prop="userName" label="用户名" sortable></el-table-column>
        <el-table-column prop="realName" label="真实姓名" sortable></el-table-column>
        <el-table-column prop="email" label="邮箱" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber"
      >
        <!-- 总计 -->
      </el-pagination>
    </div>
  </section>
</template>
<script>
import { getUserList ,getUserListData} from "../../api/api";
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      loading: false,
      isPaging: true, //是否显示分页
      pageIndex: 1, //当前页（必传）
      pageSize: 10, //每页多少条
       currentPage: 1, //当前显示3页
      totalNumber: 1, //总条数
      tableData: [], //后台拿来的数据
    };
  },
  methods: {
    //获取用户列表信息
    getUser: function() {
      let para = {
        name: this.filters.name,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,

      };
      this.loading = true;
      // api请求用户列表信息
      console.log(getUserListData(para))
       this.tableData =getUserListData(para).data;
       this.totalNumber=getUserListData(para).total;
        this.loading = false;
    //   getUserList(para).then(res => {
    //     this.tableData = res;
    //     console.log(res);
    //     this.loading = false;
    //   });
    },
    // 当每页条数发生改变的时候执行的函数
    handleSizeChange(val) {
     this.pageSize=val;
    this.getUser();
    },
    // 当页码数发生改变的时候执行的函数 val代表页数 
    handleCurrentChange(val) {
      this.pageIndex=val;
      this.getUser();
    },
    // 编辑
    handleEdit(index,data){
        console.log(index,data)
    },
    // 删除
    handleDelete(index,data){
        console.log(index,data)
    },
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style scoped>
</style>