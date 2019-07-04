<template>
	<view class="cu-dialog basis-lg differentWidth" catchtap>
		<view class="padding" @tap="goUserInfo">
			<view class="cu-avatar xl round margin-left" :style="{backgroundImage:'url('+(loginStatus?loginImg:noLoginImg)+')'}"></view>
		</view>
		<view class='cu-list menu text-left' v-if="loginStatus">
			<view class="cu-item arrow" v-for="(item,index) in loginMenu" :key="index" @tap="method(item.methods)">
				<view class='content'>
					<text class='text-grey' :class="'icon-'+item.icon"></text>
					<text class='text-grey'>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class='cu-list menu text-left' v-if="!loginStatus">
			<view class="cu-item arrow" v-for="(item,index) in noLoginMenu" :key="index" @tap="method(item.methods)">
				<view class='content'>
					<text class='text-grey' :class="'icon-'+item.icon"></text>
					<text class='text-grey'>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		leftModel
	} from '../../setting/main.js'
	let noLoginImg = 'http://www.sweetqianba.com/group1/M00/00/00/rBsAEV0ATOeAXBxrAAAGhv7fj6Y908.png';

	export default {
		name: 'leftModel',
		props: {
			'status': [Boolean]
		},
		data() {
			return {
				loginStatus: false,
				noLoginImg: noLoginImg,
				loginImg: null,
				loginMenu: leftModel.loginMenu,
				noLoginMenu: leftModel.noLoginMenu
			}
		},
		beforeMount() {
			const token = uni.getStorageSync('token')
			if (!token) {
				this.loginStatus = false
			} else {
				this.loginStatus = true
				this.loginImg = uni.getStorageSync('userInfo').pic;
			}
		},
		methods: {
			// 用一个共用的方法来实现循环绑定事件
			method(data) {
				this[data]()
			},
			goUserInfo() {
				if (this.loginStatus) {
					uni.switchTab({
						url: '../userModel/user'
					})
				} else {
					uni.navigateTo({
						url: '../userModel/login/login'
					})
				}
			},
			goOrders() {
				uni.switchTab({
					url: '../orderModel/orders'
				})
			},
			goSetting() {
				uni.navigateTo({
					url: "../userModel/setting/setting"
				})
			},
			goWallet() {
				uni.navigateTo({
					url: "../userModel/wallet/wallet"
				})
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定要注销账号吗',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('token')
							uni.removeStorageSync('userInfo')
							uni.showToast({
								title: '注销成功',
								success: () => {
									setTimeout(function() {
										uni.navigateTo({
											url: '../userModel/login/login'
										})
									}, 500);
								}
							})
						}
					}
				});
			},
			login() {
				uni.navigateTo({
					url: '../userModel/login/login'
				})
			}
		},
		watch: {
			status() {
				const token = uni.getStorageSync('token')
				if (!token) {
					this.loginStatus = false
				} else {
					this.loginStatus = true
					this.loginImg = uni.getStorageSync('userInfo').pic;
				}
			}
		}
	}
</script>

<style>
	.differentWidth {
		/* #ifdef MP */
		width: 500rpx;
		/* #endif */
	}
</style>
