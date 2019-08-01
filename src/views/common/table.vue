<template>
  <section>
    <!--工具条-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters" class="search">
        <el-form-item label="账号：">
          <el-input v-model="filters.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--列表-->
    <div class="container">
      <el-row class="table-head">
        <span class="title">列表信息</span>
        <div class="btn-group">
          <el-button type="warning" @click="handleAdd">新增</el-button>
          <el-button type="danger" @click="allDelete">删除</el-button>
          <el-button type="success" @click="handleUpload">导入</el-button>
          <el-button type="info" @click="handleExport">导出</el-button>
        </div>
      </el-row>

      <el-table
        :data="tableData"
        highlight-current-row
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="account" label="账号" sortable></el-table-column>
        <el-table-column prop="userName" label="用户名" sortable></el-table-column>
        <el-table-column prop="realName" label="真实姓名" sortable></el-table-column>
        <el-table-column prop="email" label="邮箱" sortable></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="page-container"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber"
      ></el-pagination>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="用户信息" :visible.sync="editVisible">
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="80px"
        @submit.prevent="onSubmit"
        style="background-color:#ffffff;padding:20px;"
      >
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 导入 -->
    <el-dialog title="导入" :visible.sync="uploadVisible">
      <UploadExcelComponent></UploadExcelComponent>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUpload">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import UploadExcelComponent from "@/components/UploadExcel";
import { apiTest } from "../../api/api";
import { getUserPageList } from "../../common/js/global_function";
export default {
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      filters: {
        name: "",
        account: ""
      },
      loading: false,
      isPaging: true, //是否显示分页
      pageIndex: 1, //当前页（必传）
      pageSize: 10, //每页多少条
      currentPage: 1, //当前显示第一几页
      totalNumber: 1, //总条数
      tableData: [], //后台拿来的数据
      editVisible: false, //是否弹出编辑框
      form: {
        //
        Account: "",
        userName: "",
        RealName: "",
        RequestUrl: ""
      },
      index: -1, //被操作数据的index
      id: -1, //被操作数据的id
      datas: [], //被操作的数据组
      uploadVisible: false // 是否弹出导入
    };
  },
  methods: {
    //获取用户列表信息
    getUser: function() {
      let para = {
        account: this.filters.account,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      this.loading = true;
      // TODO api请求用户列表分页信息
      let res = getUserPageList(para);
      this.tableData = res.data;
      this.totalNumber = res.count;
      this.loading = false;
      // apiTest().then(res=>{
      //   if(res.success){
      //        console.log(res)
      //      this.tableData=res.data;
      //      this.totalNumber=res.count;
      //            this.loading = false;
      //   }else{
      //      this.$message.error(res.msg);
      //   }

      // })
    },
    // 当每页条数发生改变的时候执行的函数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUser();
    },
    // 当页码数发生改变的时候执行的函数 val代表页数
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getUser();
    },
    handleSearch() {
      this.pageIndex = 1;
      this.getUser();
    },
    // 新增
    handleAdd() {
      this.id = -1;
      this.form = {
        account: "",
        userName: "",
        realName: "",
        email: "",
        id: ""
      };
      this.editVisible = true;
    },
 
  
    // 编辑
    handleEdit(index, data) {
      this.editVisible = true;
      this.index = index;  //0
      console.log(this.index)
      this.id = data.id;  //id
      console.log(this.id)
      this.form = data;  //表单里面所有内容
      console.log(this.form)
    },
   // 保存新增/编辑
    saveEdit() {
      this.editVisible = false;
      if (this.id < 0) {
        //TODO 新增
      } else {
        //TODO 编辑
        if (this.tableData[this.index].id === this.id) {
          // TODO api提交数据，刷新页面
        } else {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id === this.id) {
              // TODO api提交数据，刷新页面
              return;
            }
          }
        }
      }
      this.$message.success(`操作成功`);
    },
    // 删除
    handleDelete(index, data) {
      this.id = data.account;
      this.$confirm("删除不可恢复，是否确定删除？")
        .then(_ => {
          //TODO 获取id，删除数据，刷新页面
          this.$message.success(`删除第 ${index + 1} 行成功`);
        })
        .catch(_ => {});
    },
    // 点击选择
    handleSelectionChange(data) {
      this.datas = data;
      console.log(this.datas)
    },
    // 多条删除
    allDelete() {
      console.log(this.datas)
      if (this.datas.length <= 0) {
        this.$message.warning("请至少勾选一条数据");
        return;
      }
      this.$confirm("删除不可恢复，是否确定删除？")
        .then(_ => {
          //TODO 获取id，删除数据，刷新页面
          const ids = [];
          this.datas.forEach(e => {
            ids.push(e.id);
            console.log(ids)
          });
          this.$message.success(`删除成功`);
        })
        .catch(_ => {});
    },
    // 导入
    handleUpload() {
      this.uploadVisible = true;
    },
    saveUpload(){
      this.$message.success(`导入成功`);
      this.uploadVisible=false;
    },
      handleExport() {
          this.$message.success(`导出成功`);
      }
      ,
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style scoped lang="scss">
.toolbar {
  background-color: #ffffff;
  .search {
    // margin: 0.1rem;
    margin-top: 0.8rem;
    margin-left: 10px;
  }
}
.container {
  /* position: absolute; */
  /* top: 20px; */
  background-color: #ffffff;
  padding: 20px;
  .table-head {
    margin-bottom: 1rem;
    .title {
      border-left: 3px solid #ef640d;
      padding-left: 5px;
      font-size: 1rem;
      color: rgb(19, 17, 17);
    }
    .btn-group {
      float: right;
    }
  }
  .page-container {
    padding-top: 10px;
  }
}
</style>