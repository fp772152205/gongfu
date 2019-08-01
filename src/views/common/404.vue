<template>
  <div class="error-page">
      <div class="error-code">4<span>0</span>4</div>
      <div class="error-desc">糟糕~ 你所访问的页面不存在</div>
      <div class="error-handle">
          <router-link to="/main">
            <el-button type="warning" size="large">返回首页</el-button>
          </router-link>
          <el-button class="error-btn"  type="warning" size="large" @click="goBack">返回上一页</el-button>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
      goBack(){
          this.$router.go(-1);
      }
  }
}
</script>


<style scoped>
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color:#fe6d07;
    }
    .error-code span{
        color: #fbb330;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 200px;
    }
    .error-btn{
        margin-left: 100px;
        background-color: #fe6d07;
        color: #f3f3f3;
    }
</style>
