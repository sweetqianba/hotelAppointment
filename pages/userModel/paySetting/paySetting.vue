<template>
	<view>
		<view class="cu-list menu margin-top" v-if="userInfo.paypassword">
			<view class="cu-item arrow" @tap="goSetPwd">
				<view class='content flex justify-between'>
					<text class='text-black'>修改支付密码</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="goGetPwd">
				<view class='content flex justify-between'>
					<text class='text-black'>重置支付密码</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu margin-top" v-if="!userInfo.paypassword">
			<view class="cu-item arrow" @tap="goNewPwd">
				<view class='content flex justify-between'>
					<text class='text-black'>设置支付密码</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo');
			this.userInfo = userInfo;
		},
		methods: {
			goSetPwd() {
				uni.navigateTo({
					url: 'setPwd/setPwd'
				})
			},
			goGetPwd() {
				uni.navigateTo({
					url: 'getPwd/getPwd'
				})
			},
			goNewPwd() {
				uni.navigateTo({
					url: 'newPwd/newPwd'
				})
			}
		}
	}
</script>

<style>
</style>
