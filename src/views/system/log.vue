
<template>
  <section>
    <!--搜索条-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters" class="search">
        <el-form-item label="起始日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="filters.begin"
            :picker-options="startTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="filters.end"
            :picker-options="endTime"
          ></el-date-picker>
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
          <el-button type="info" @click="handleDelete">删除</el-button>
        </div>
      </el-row>
      <el-table :data="tableData" highlight-current-row v-loading="loading"  @sort-change='sortChange'>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="LogLevel" label="等级" sortable='custom'></el-table-column>
        <el-table-column prop="System" label="系统" sortable='custom'></el-table-column>
        <el-table-column prop="Account" label="用户" sortable='custom'></el-table-column>
        <el-table-column prop="Date" label="日期"  sortable='custom'></el-table-column>
        <el-table-column prop="ResultCode" label="code" sortable='custom'></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.$index,scope.row)">查看</el-button>
          </template>
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
      <!-- 删除 -->
      <el-dialog title="删除" :visible.sync="delVisible">
        <el-row>
          <el-col :span="2" style="padding-top:10px">保留</el-col>
          <el-col :span="2" style="margin-right:10px">
            <el-input v-model.number="day"></el-input>
          </el-col>
          <el-col :span="2" style="padding-top:10px">天数据</el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="delLog">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 查看弹出框 -->
      <el-dialog title="查看" :visible.sync="viewVisible">
        <el-form
          ref="form"
          :model="form"
          label-position="left"
          label-width="80px"
          @submit.prevent="onSubmit"
          style="background-color:#ffffff;padding:20px;"
        >
          <el-form-item label="日期">
            <el-input v-model="form.Date"></el-input>
          </el-form-item>
          <el-form-item label="系统">
            <el-input v-model="form.System"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.Account"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="form.RealName"></el-input>
          </el-form-item>
          <el-form-item label="日志等级">
            <el-input v-model="form.LogLevel"></el-input>
          </el-form-item>
          <el-form-item label="模块">
            <el-input v-model="form.Module"></el-input>
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="form.IP"></el-input>
          </el-form-item>
          <el-form-item label="请求地址">
            <el-input v-model="form.RequestUrl"></el-input>
          </el-form-item>
          <el-form-item label="浏览器">
            <el-input v-model="form.Browser"></el-input>
          </el-form-item>
          <el-form-item label="Code">
            <el-input v-model="form.ResultCode"></el-input>
          </el-form-item>
          <el-form-item label="日志内容">
            <el-input v-model="form.ResultMessage"></el-input>
          </el-form-item>
          <el-form-item label="其他">
            <el-input v-model="form.Exception" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="viewVisible=false">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>
<script>
import {apiGetLogList, apiGetLogInfo, apiSaveLogInfo} from "../../api/api";
export default {
  data() {
    return {
      tableData: [],
      filters: {
        begin: "",
        end: ""
      },
      loading: false, // 加载动画
      isPaging: true, //是否显示分页
      pageIndex: 1, //当前页（必传）
      pageSize: 10, //每页多少条
      currentPage: 1, //当前显示第一几页
      totalNumber: 1, //总条数
      viewVisible: false, //是否弹出查看
      delVisible: false,
      form: {}, //表单数据
      day: 3,
      sidx:'',
      sort:'',

      /* start 开始时间小于今天,结束时间不能大于开始时间 */
      startTime: {
        disabledDate: time => {
          if (this.filters.end) {
            return time.getTime() > new Date(this.filters.end).getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      endTime: {
        disabledDate: time => {
          if (this.filters.begin) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < new Date(this.filters.begin).getTime()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      }
    };
  },
  methods: {
    // 请求日志列表分页信息
    getList() {
      let para = {
        begin: this.filters.begin,
        end: this.filters.end,
        page: this.pageIndex,
        limit: this.pageSize,
        sidx:this.sidx,
        sord:this.sort,
      };
      this.loading = true;
      apiGetLogList(para).then(res => {
        if (res.success) {
          this.tableData = res.data;
          this.totalNumber = res.count;
        }
      });
      this.loading = false;
    },
    // 当每页条数发生改变的时候执行的函数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 当页码数发生改变的时候执行的函数 val代表页数
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    // 搜索
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    },
    // 查看
    handleView(index, data) {
      apiGetLogInfo(data.Guid).then(res => {
        if (res.success) {
          this.viewVisible = true;
          this.form = data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 排序
    
//排序
   sortChange: function(column, prop, order) {
       this.sidx=column.prop                   //判断那一列的属性
       if(column.order==="ascending"){
            this.sort="asc";
       }else{
           this.sort="desc";
       }
    this.getList();
},
    // 删除
    handleDelete() {
      this.delVisible = true;
    },
    delLog() {
      apiSaveLogInfo(this.day).then(res => {
        if (res.success) {
          this.$message.success("删除成功");
          this.delVisible = false;
          this.day = 3;
          this.filters.begin = "";
          this.filters.end = "";
          this.getList();
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
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
  .red {
    color: #ff0000;
  }
}
</style>