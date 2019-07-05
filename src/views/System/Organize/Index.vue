<template>
<div>
    <el-table
    border
    ref="multipleTable"
    :data='tableData'
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column label="操作"  width="150">
            <template slot-scope="scope">
                <el-button
                size="mini"
                round  class='el-icon-edit'
                @click="handleDelete(scope.$index, scope.row)">修改</el-button>
            </template> 
        </el-table-column>
  </el-table>
  <!-- 分页功能 -->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"> 
      <!-- 总计 -->
    </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
     data() {
      return {
          isPaging:true,    //是否显示分页
          pageIndex:1,      //当前页（必传）
          pageSize :20,     //每页多少条
          currentPage:1,    //当前显示3页
          totalNumber: 1,   //总条数
          totalPage:1 ,     //总页数
          pno:'1',          // 页码
        // 分页功能
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        tableData:[],
    
// 表单功能
        itemList: [],
        multipleSelection: []
      }
    },
     methods: {
        getData() {
          console.log('生命周期')
                this.axios.get('../../../../static/database.json').then(response => {
                    console.log(response.data);
                    this.tableData=response.data
                }, response => {
                    console.log("error");
                });
            },
//  分页功能 页码大小  val控制每页多少条信息
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize=val;
        let url=`http://127.0.0.1:3000/?pageSize=${val}&&pageIndex=${this.pageIndex}`
        this.axios.get(url).then(result=>{
            let rows=result.data.data;
            this.list=rows;
            })
      },
      // 当页码数发生改变的时候执行的函数 val代表页数
      handleCurrentChange(val) {
        console.log( `这是${val}`)
        this.pageIndex=val;
        let url=`http://127.0.0.1:3000/?pageIndex=${val}&&pageSize=${this.pageSize}`
        this.axios.get(url).then(result=>{
            let rows=result.data.data;
            this.list=rows;
            })
            },
      // 表单功能
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created(){
        console.log('生命周期加载页面')
        this. getData();
         let url=`http://127.0.0.1:3000/?pageSize=${this.pageSize}&&pageIndex=${this.pageIndex}`
        this.axios.get(url).then(result=>{
            this.list=result.data.data;
        })
    }
}
</script>
<style>

</style>

