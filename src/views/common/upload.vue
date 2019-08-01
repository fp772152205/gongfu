<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
    <Upload-Img-Content/>

  </div>
</template>
<script>
import UploadExcelComponent  from "@/components/UploadExcel";
export default {
  name: 'Upload',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],//表格数据内容
      tableHeader: [],//表格头部
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '文件应小于1M',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    }
  }
}
</script>