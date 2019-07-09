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
			<el-table :data="users" highlight-current-row v-loading="loading" >
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="account" label="账号" width="120" sortable>
				</el-table-column>
				<el-table-column prop="userName" label="用户名" width="100" sortable>
				</el-table-column>
				<el-table-column prop="realName" label="真实姓名" width="100" sortable>
				</el-table-column>
				<el-table-column prop="email" label="邮箱" width="120" sortable>
				</el-table-column>
				<el-table-column prop="addr" label="地址" min-width="180" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getUserList } from '../../api/api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			//获取用户列表
			getUser: function () {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				getUserList(para).then((res) => {;
                    this.users = res;
                    console.log(res)
					 this.loading = false;
				});
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>

</style>