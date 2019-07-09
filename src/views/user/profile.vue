<template>
	<el-form ref="form" :model="form" label-position="left"  label-width="80px" @submit.prevent="onSubmit" style="background-color:#ffffff;padding:20px;">
		<el-form-item label="账号" >
			<el-input v-model="form.account" ></el-input>
		</el-form-item>
		<el-form-item label="昵称">
			<el-input v-model="form.userName"  ></el-input>
		</el-form-item>
        <el-form-item label="真实姓名">
			<el-input v-model="form.realName" ></el-input>
		</el-form-item>
        <el-form-item label="邮箱">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		  <el-form-item>
			<el-button type="primary">修改并保存</el-button>
		</el-form-item>
	</el-form>	
</template>

<script>
	export default {
		data() {
			return {
				form: {
                    id:'',
                    account:'',
					userName: '',
					email: '',
					realName: '',
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
<style>

</style>

