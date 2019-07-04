<template>
	<view class="cu-list menu margin-top">
		<view class="cu-item arrow" @tap="goSetPwd">
			<view class='content flex justify-between'>
				<text class='text-black'>修改登录密码</text>
			</view>
		</view>
		<view class="cu-item arrow" @tap="goGetPwd">
			<view class='content flex justify-between'>
				<text class='text-black'>重置登录密码</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goSetPwd() {
				uni.navigateTo({
					url: 'pwdPutPwd/pwdPutPwd'
				})
			},
			goGetPwd() {
				uni.navigateTo({
					url: 'pwd/pwd'
				})
			}
		}
	}
</script>

<style>
</style>
