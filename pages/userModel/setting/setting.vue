<template>
	<view style="width: 100%;" class="bgWhiteToGrey">
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="goUserInfo">
				<view class='content'>
					<text class='text-black'>个人信息</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="goChangePhone">
				<view class='content'>
					<text class='text-black'>换绑手机</text>
				</view>
				<view class='action'>
					<text class='text-grey text-sm'>{{userInfo.telephone}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="gochangePwd">
				<view class='content'>
					<text class='text-black'>登录密码</text>
				</view>
				<view class='action'>
					<text class='text-grey text-sm'>修改</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="goPayCenter">
				<view class='content'>
					<text class='text-black'>支付设置</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="goSafeCenter">
				<view class='content'>
					<text class='text-black'>安全中心</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="logout">
				<view class='content'>
					<text class='text-black'>退出登录</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="goAbout">
				<view class='content'>
					<text class='text-black'>关于邯郸酒店通</text>
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
			goUserInfo() {
				uni.navigateTo({
					url: '../userInfo/userInfo'
				})
			},
			goChangePhone() {
				uni.navigateTo({
					url: '../phone/phone'
				})
			},
			goPayCenter() {
				uni.navigateTo({
					url: '../paySetting/paySetting'
				})
			},
			gochangePwd() {
				uni.navigateTo({
					url: '../pwd/password'
				})
			},
			goSafeCenter() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				});
			},
			goAbout() {
				uni.navigateTo({
					url: '../about/about'
				});
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
											url: '../login/login'
										})
									}, 500);
								}
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
</style>
