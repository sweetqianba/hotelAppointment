<template style="height: 100%;">
	<view class="">
		<view class="content" style=" background: linear-gradient(#0faeff, white);">
			<view class='padding-xs flex align-center'>
				<view class="cu-avatar xl round margin-left" :style="{backgroundImage:'url('+(loginStatus?userInfo.pic:image)+')'}"
				 @tap="goAvatar"></view>
				<view class='flex-sub text-center' style="width: 70%;">
					<view class='solid-bottom text-xxl padding flex justify-between'>
						<text class="text-black text-bold text-cut" style="width: 60%;" @tap="goUserInfo">{{loginStatus?(userInfo.account?userInfo.account:userInfo.telephone):'请先登录'}}</text>
						<text class="text-sl icon-settings" @tap="goSetting"></text>
					</view>
				</view>
			</view>
			<view class="cu-list grid col-4 no-border" style="margin-top: -50upx;background: none;padding-bottom: 50px;">
				<view class="cu-item" v-for="(item,index) in icons" :key="index" @tap="method(item.func)">
					<view class='text-black' :class="'icon-'+item.icon">
						<view class="cu-tag badge" v-if="item.badge!==0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="cu-card case bg-white" style="margin-top: -50px;border-radius: 20px;">
			<view class="cu-list menu card-menu">
				<view class="cu-item">
					<view class='content flex justify-between'>
						<text class='text-black text-bold'>我的钱包</text>
						<text class='text-grey text-sm' @tap="goWallet">进入钱包></text>
					</view>
				</view>
				<view class="flex">
					<view class='flex-sub padding-sm margin-xs radius text-center'>
						<view class="action lineHeight14 ">
							<text class="text-black text-bold text-xxl">{{userInfo.money}}</text>
						</view>
						<view class="action lineHeight14 ">
							<text class="text-black">余额</text>
						</view>
						<view class="action lineHeight14 ">
							<text class="text-black gray text-sm">剩余金额(元)</text>
						</view>
					</view>
					<view class='flex-sub padding-sm margin-xs radius text-center'>
						<view class="action lineHeight14 ">
							<text class="text-black text-bold text-xxl">127<text class="text-sm text-bold">元</text></text>
						</view>
						<view class="action lineHeight14 ">
							<text class="text-black">酒店享优惠</text>
						</view>
						<view class="action lineHeight14 ">
							<text class="text-black gray text-sm">最高随机减</text>
						</view>
					</view>
					<view class='flex-sub padding-sm margin-xs radius text-center'>
						<view class="action lineHeight14 ">
							<text class="text-black text-bold text-xxl">10<text class="text-sm text-bold">万</text></text>
						</view>
						<view class="action lineHeight14 ">
							<text class="text-black">邯郸通借钱</text>
						</view>
						<view class="action lineHeight14 ">
							<text class="text-black gray text-sm">最高额度(元)</text>
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class='content flex justify-between'>
						<text class='text-black text-bold'>推荐工具</text>
					</view>
				</view>
				<view class="content" style="border-radius: 20px;">
					<view class="cu-list grid col-4 no-border noBg">
						<view class="cu-item" v-for="(item,index) in iconList" :key="index">
							<view :class="['icon-'+item.icon,'text-'+item.color]">
								<view class="cu-tag badge" v-if="item.badge!=0">
									<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
								</view>
							</view>
							<text>{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let image = 'https://www.sweetqianba.com/group1/M00/00/00/rBsAEV0ATOeAXBxrAAAGhv7fj6Y908.png';
	import {
		user
	} from '../../setting/user.js'
	export default {
		data() {
			return {
				image: image,
				loginStatus: false,
				icons: user.icons,
				userInfo: {},
				iconList: user.iconList,
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			let userInfo = uni.getStorageSync('userInfo');
			if (!token) {
				this.loginStatus = false;
			} else {
				this.loginStatus = true;
				this.userInfo = userInfo;
			}
		},
		methods: {
			goSetting() {
				if (this.loginStatus) {
					uni.navigateTo({
						url: 'setting/setting'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
			},
			goUserInfo() {
				if (this.loginStatus) {
					uni.navigateTo({
						url: 'userInfo/userInfo'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
			},
			goAvatar() {
				if (this.loginStatus) {
					// 显示头像的模态框，即预览头像
				} else {
					this.bindLogin();
				}
			},
			bindLogin() {
				uni.navigateTo({
					url: 'login/login',
				});
			},
			bindLogout() {
				if (this.forcedLogin) {
					uni.reLaunch({
						url: 'login/login',
					});
				}
			},
			goWallet() {
				uni.navigateTo({
					url: 'wallet/wallet'
				})
			},
			goCollection() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				})
			},
			goEdit() {
				uni.navigateTo({
					url: '../evaluateModel/evaluate'
				})
			},
			goCoupon() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				})
			},
			goMessage() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				})
			},
			method(data) {
				this[data]()
			},
		}
	}
</script>

<style>
	view {
		line-height: 1;
	}

	.lineHeight14 {
		line-height: 1.4;
	}
</style>
