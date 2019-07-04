<template>
	<view class="content">
		<view class="cu-form-group">
			<view class="title">旧密码：</view>
			<input type="password" v-model="password" placeholder="填写旧的密码" class='radius' name='input'></input>
		</view>
		<view class="cu-form-group">
			<view class="title">新密码：</view>
			<input type="password" v-model="newPassword" placeholder="填写新的密码" class='radius' name='input'></input>
		</view>
		<view class="padding flex flex-direction">
			<button class='cu-btn bg-blue lg' @tap="findPassword">提交</button>
		</view>
	</view>
</template>

<script>
	const regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
	import {
		appUpdInfo
	} from '../../../../api/auth.js';
	import {
		putUserInfo
	} from '../../../../setting/putUserInfo.js';
	export default {
		data() {
			return {
				password: null,
				newPassword: null,
			}
		},
		methods: {
			findPassword() {
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '请填写原先的密码',
					});
					return;
				}
				let password = uni.getStorageSync('userInfo').password;
				if (this.password !== password) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确，请重新输入',
					});
					return;
				}
				if (!this.newPassword) {
					uni.showToast({
						icon: 'none',
						title: '请填写新的密码',
					});
					return;
				}
				let params = {
					password: this.newPassword
				}
				appUpdInfo(params).then(data => {
					// 修改信息关键部分
					if (data.errno == 200) {
						uni.showToast({
							title: '修改成功'
						});
						putUserInfo(data).then(data => {}).catch(err => {})
						uni.navigateBack({
							delta: 1
						});
					}
				}).catch(err => {
					uni.showToast({
						title: err.errmsg
					});
				})
			}
		}
	}
</script>

<style>

</style>
