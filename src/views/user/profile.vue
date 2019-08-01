<template>
  <div class="containt">
    <div class="grid-content bg-purple upload_right">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
        <img v-else class="avatar" src="../../assets/images/user.png" alt />
        <el-button class="upload_span" type="text" @click="centerDialogVisible = true">点击上传</el-button>
      </el-upload>
    </div>
    <div class="grid-content bg-purple person_left">
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="80px"
        style="background-color:#ffffff;padding:20px;"
      >
        <el-form-item label="账号：">
          <el-input v-model="form.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>	
<script>
import axios from "axios";

export default {
  name: "profile",
  data() {
    return {
      centerDialogVisible: false,
      form: {
        id: "",
        account: "",
        username: "",
        email: "",
        name: "",
        account: "",
        avatar: ""
      }
    };
  },
  methods: {
    getUserInfo() {
      axios.get("../static/user.json").then(res => {
        let user = res.data[0];
        if (user) {
          this.form = user;
        }
      });
    },
    onSubmit() {
			this.$message.success('修改成功');
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  mounted: function() {
    this.getUserInfo();
  }
};
</script>
<style lang="scss" scoped>
.containt {
  background-color: #fff;
	width: 100%;
	padding-top:2rem; 
  // text-align: center;
}
.upload_right {
  margin: 25px 50px 0 40px;
  float: left;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  // 	width:20%;
  // 	height:100%;
  // float: left;
  // 	left: 20;
}
.person_left {
  display: inline-block;

  // height: 100%;
  //  float: right;
}
</style>

