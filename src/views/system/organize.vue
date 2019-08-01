
<template>
  <div>
    <!--列表-->
    <div class="container">
      <el-row class="table-head">
        <span class="title">列表信息</span>
        <div class="btn-group">
            <el-button type="info" @click="handleinCreased()">新增</el-button>
            <el-button type="info" @click="handleDelete">删除</el-button>
        </div>
      </el-row>
      <el-table 
      :data="tableData"
       highlight-current-row 
       v-loading="loading"  
       @sort-change='sortChange'
       @selection-change="handleSelectionChange"  
       >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="ParentName" label="父级名称"  sortable='custom'></el-table-column>
        <el-table-column prop="EnCode" label="组织代码" sortable='custom'></el-table-column>  
        <el-table-column prop="Layers" label="层级" sortable='custom'></el-table-column>  
        <el-table-column prop="FullName" label="公司名称" width="300"  sortable='custom'></el-table-column>
        <el-table-column prop="Manager" label="负责人" sortable='custom'></el-table-column>  
        <el-table-column prop="SortCode" label="排序码"  sortable='custom'></el-table-column>
        <el-table-column prop="CreatedTime" label="创建时间" sortable='custom'></el-table-column>
        <el-table-column label="操作" width="150">
        <div slot-scope="scope" >
          <el-button size="small" @click="handleRevise(scope.$index, scope.row)">修改</el-button>
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
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 新增弹出框 -->
      <el-dialog title="新增" :visible.sync="viewVisible">
        <el-form
        class='dialogForm'
          ref="form"
          :rules="rules"
          :inline="true"
          :model="form"
          label-position="right"
          label-width="80px"
          @submit.prevent="onSubmit"
          style="background-color:#ffffff;padding:20px;"
        >     
      <!-- 动态加载下拉框 -->
        <el-form-item label="父级ID" label-width="80px" >
          <el-select v-model="form.ParentId"  @change='selectChange' placeholder="请选择">
            <el-option v-for='item in selectData' :key='item.id' :label="item.text" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      <!-- 动态加载下拉框 -->
         <el-form-item label="组织代码" prop="EnCode"   >
            <el-input v-model="form.EnCode"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="FullName" >
            <el-input v-model="form.FullName"></el-input>
          </el-form-item>
          <el-form-item label="简称" prop="ShortName"  >
            <el-input v-model="form.ShortName"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="Manager" >
            <el-input v-model="form.Manager"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="Tel">
            <el-input v-model="form.Tel"></el-input>
          </el-form-item>
           <el-form-item label="排序码" prop="SortCode">
            <el-input v-model="form.SortCode"></el-input>
          </el-form-item>
           <el-form-item label="传真" prop="Fax">
            <el-input v-model="form.Fax"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="Email">
            <el-input v-model="form.Email"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.Address"></el-input>
          </el-form-item>
          <el-form-item label="层级">
            <el-input v-model="form.Layers"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
          <el-input v-model="form.CreatedTime"></el-input>
        </el-form-item>
        <el-form-item label="修改时间" prop="ModifiedTime">
          <el-input v-model="form.ModifiedTime"></el-input>
        </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" style='width:110%' v-model="form.Description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="viewVisible = false">取 消</el-button>
          <el-button type="primary" @click="FormSubmit">确定</el-button>
        </div>
      </el-dialog>
      <!-- 修改弹出框 -->
      <el-dialog title="修改" :visible.sync="viewRevise">
        <el-form
        class='dialogForm'
          ref="forms"
          :rules="rules"
          :model="forms"
          label-position="right"
          :inline="true"
          @submit.prevent="onSubmit"
           label-width="80px"
          style="background-color:#ffffff;padding:20px;"
        >
        <el-form-item label="唯一主键">
          <el-input v-model="forms.Guid"></el-input>
        </el-form-item>
        <el-form-item label="父级ID">
          <el-input v-model="forms.ParentId"></el-input>
        </el-form-item>
         <el-form-item label="组织代码" prop="EnCode ">
            <el-input v-model="forms.EnCode"></el-input>
          </el-form-item>
          <el-form-item label="公司名称"  prop='FullName'>
            <el-input v-model="forms.FullName"></el-input>
          </el-form-item>
          <el-form-item label="简称" prop='ShortName'>
            <el-input v-model="forms.ShortName"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="Manager">
            <el-input v-model="forms.Manager"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop='Tel'>
            <el-input v-model="forms.Tel"></el-input>
          </el-form-item>
          <el-form-item label="排序码" prop="SortCode">
            <el-input v-model="forms.SortCode"></el-input>
          </el-form-item>
           <el-form-item label="传真">
            <el-input v-model="forms.Fax"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="Email">
            <el-input v-model="forms.Email"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input v-model="forms.Address"></el-input>
          </el-form-item>
          <el-form-item label="层级">
            <el-input v-model="forms.Layers"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
          <el-input v-model="forms.CreatedTime"></el-input>
        </el-form-item>
         <el-form-item label="修改时间" prop="ModifiedTime">
          <el-input v-model="forms.ModifiedTime"></el-input>
        </el-form-item>
          <el-form-item label="描述" prop='Description'>
            <el-input type="textarea" style='width:110%' v-model="forms.Description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="viewRevise = false">取 消</el-button>
          <el-button type="primary" @click="FormRevise()">确定修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {apiGetLogInfo, apiSaveLogInfo,apiGetOrganizeList,apiGetOrganizeIncrease, apiGetOrganizeDelete,apiGetOrganizeRevise,apiGetOrganizeReviseAll} from "../../api/api";
export default {
   inject: ['reload'], 
  data() {
    return {
      selectData:'',
      datas:[], //点击拿到下标
      tableData: [],
      loading: false, // 加载动画
      isPaging: true, //是否显示分页
      pageIndex: 1, //当前页（必传）
      pageSize: 10, //每页多少条
      currentPage: 1, //当前显示第一几页
      totalNumber: 1, //总条数
      viewRevise:false,//修改弹出
      viewVisible: false, //是否弹出查看
      delVisible: false,
      day: 3,
      sidx:'',
      sort:'',
      manager:'',
      encode:'',
      parentName:'',
      fullName:'',
      //新增表单数据
      form: { }, 
      // 修改的表单数据
      forms:{},
      rules:{
        Description:[
           {max:255, message:'描述不能超过255', trigger: 'blur'}
        ],
        Fax:[
          {message:'传真不能超过50', trigger: 'blur' },
          {max:50, message:'传真不能超过50', trigger: 'blur' }
        ],
        SortCode:[
          {type:'number', message: '请输入0-9999的数', trigger: ['change'] }
        ],
        ParentId:[
          {  message: '请输入父级名称', trigger: 'blur' },
        ],
        ShortName:[
          { required: true, message: '组织简称不能为空', trigger: 'blur' },
          {max:20, message:'组织简称不能超过20', trigger: 'blur' }
        ],
        Manager:[
          { required: true,max: 20, message: '负责人不能为空', trigger: 'blur' },
          {max:20, message:'负责人不能超过20', trigger: 'blur' }
        ],
        Tel:[
          { required: true,message: '联系方式不能为空', trigger: 'blur' },
           {max:20, message:'联系方式不能超过20', trigger: 'blur' }
        ],
        EnCode: [
          { required: true,message: '组织代码不能为空', trigger: 'blur' },
           {max:50, message:'组织代码不能超过50', trigger: 'blur' }
        ],
        FullName:[
          { required: true,message: '公司名称不能为空', trigger: 'blur' },
          {min: 2, max: 100,  message: '组织名称长度在2个字符到100个字符之间',trigger: 'blur' }
          ],
        Email:[
          {required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  created(){
    this.PulldownContent();
  },
  methods: {
     // 新增
    handleinCreased(){
      this.viewVisible=true;
      },
   //新增要提交的代新增要提交的代码
    FormSubmit(data){
      this.SubmitContent();
    },
    // 新增
    SubmitContent(){
       this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            ParentName:this.form.ParentName,
            ModifiedTime:this.form.ModifiedTime,
            CreatedTime:this.form.CreatedTime,
            Description:this.form.Description,
            Layers:this.form.Layers,
            ParentId:this.form.ParentId,
            EnCode:this.form.EnCode,
            FullName: this.form.FullName,
            ShortName:this.form.ShortName,
            Manager:this.form.Manager,
            Tel:this.form.Tel,
            Fax:this.form.Fax,
            Email:this.form.Email,
            Address:this.form.Address,
            SortCode:this.form.SortCode
          };
          apiGetOrganizeIncrease(data).then(res => {
            if (res.success == true) {
             this.$message({
                message: res.msg,
                type: "success",
              });
              this.viewRevise=false;
              this.reload();
            }else {
            this.viewRevise=true;
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
    //当下拉菜单框里面的值发生变化时
    selectChange(value){ //每一次选择后执行，val是上面dom的value
    console.log('value',value);

    },
    // 动态加载下拉菜单
    PulldownContent(){
       axios.get(`${process.env.API_ROOT}/api/Organize/GetTreeSelect`).then(res=>{
        this.selectData=res.data.data
      })
     
    },
    // 修改拿所有值
    handleRevise(index, data){
      if(data.Guid!=''){
         this.viewVisible=true;
        //  this.viewRevise=true;
        const id = data.Guid  //data.Guid就是id 
        apiGetOrganizeReviseAll(id).then(res => {
        if (res.success) 
        // this.forms = res.data; 
        this.form = res.data; 
      })
      }else{
        this.viewRevise=false;
      }
    },
    //弹出表单确定修改
    FormRevise(){
      if(this.forms.Guid!=''){
         this.ReviseContent();
      }else{
        this.SubmitContent();
      }  
    },
    ReviseContent(){
       this.$refs.forms.validate(valid => {
        if (valid) {
          let data = {
            ModifiedTime:this.form.ModifiedTime,
            Guid:this.forms.Guid,
            Description:this.forms.Description,
            Layers:this.forms.Layers,
            ParentId:this.forms.ParentId,
            ParentName:this.forms.ParentName,
            EnCode:this.forms.EnCode,
            FullName: this.forms.FullName,
            ShortName:this.forms.ShortName,
            Manager:this.forms.Manager,
            Tel:this.forms.Tel,
            Fax:this.forms.Fax,
            Email:this.forms.Email,
            Address:this.forms.Address,
            SortCode:this.forms.SortCode,
            CreatedTime:this.forms.CreatedTime,
          };
          apiGetOrganizeRevise(data).then(res => {
            if (res.success == true) {
             this.$message({
                message: res.msg,
                type: "success",
              });
               this.viewRevise=false;
               this.reload();
            }else {
              this.$message({
                message: res.msg,
                type: "error"                
              });
               this.viewRevise=true;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }, 
    // 请求组织机构列表分页信息
    getList() {
      let para = {
        page: this.pageIndex,
        limit: this.pageSize,
        sidx:this.sidx,
        sord:this.sort,
      };
      this.loading = true;
       apiGetOrganizeList(para).then(res => {
        if (res.success) {
          console.log(res)
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
    // 点击删除的时候
     handleSelectionChange(data) {
      this.datas = data;   //点击删除的时候data拿到一行所有的数据，成一个对象。
     },
     // 删除所有
    handleDelete() {
      if (this.datas.length <= 0) {
        this.$message.warning("请至少勾选一条数据");
        return;
      }
      this.$confirm("删除不可恢复，是否确定删除？")
        .then(_ => {
          //TODO 获取id，删除数据，刷新页面
          const ids = [];
          this.datas.forEach(e => {
            ids.push(e.Guid);
           apiGetOrganizeDelete(ids).then(res=>{
             if(res.success){
               this.$message.success(`删除成功`);
               this.reload();
             }
           })
          });
          
        })
        .catch(_ => {});
    },
    //排序
   sortChange: function(column) {
       this.sidx=column.prop  //column拿列所有内容
       if(column.order==="ascending"){
            this.sort="asc";
       }else{
           this.sort="desc";
       }
    this.getList();
},
  },
 mounted() {
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.toolbar span{
  font-size: 14px;
}
.toolbar input{
  height:25px;
}
.container {
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
<style>
.el-input__icon+.el-input__inner{
  padding-right: 13px;
}
</style>
