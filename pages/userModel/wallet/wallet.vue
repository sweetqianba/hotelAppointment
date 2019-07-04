<template>
	<view style="width: 100%;" class="bgWhiteToGrey">
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow">
				<view class='content flex justify-between'>
					<text class='text-black'>钱包余额</text>
					<text class='text-black'>{{userInfo.money}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="coupon">
				<view class='content flex justify-between'>
					<text class='text-black'>优惠券</text>
					<text class='text-black'>暂无</text>
				</view>
			</view>
		</view>
		<!-- 充值弹出框 -->
		<view class="cu-modal bottom-modal" :class="chargeStatus?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class='action text-green' @tap="recharge()">确定</view>
					<view class='action text-blue' @tap='chargeStatus = !chargeStatus'>取消</view>
				</view>
				<view class='padding-xl'>
					<input type="text" v-model="chargeMoney" />
				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 750upx;height: 40px;background: #000000;" v-if="!chargeStatus">
			<button class="cu-btn bg-white" style="height: 100%;width: 50%;border-radius: 0;" @tap="coupon">增加优惠券</button>
			<button class="cu-btn bg-blue" style="height: 100%;width: 50%;border-radius: 0" @tap="chargeStatus = !chargeStatus">充值</button>
		</view>
	</view>
</template>

<script>
	import {
		appUpdInfo
	} from '../../../api/auth.js'
	import {
		putUserInfo
	} from '../../../setting/putUserInfo.js'
	export default {
		data() {
			return {
				userInfo: null,
				chargeStatus: false,
				chargeMoney: 100
			}
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo');
			this.userInfo = userInfo;
		},
		methods: {
			recharge() {
				// 充值
				let params = {
					money: Number(this.chargeMoney) + Number(this.userInfo.money)
				}
				appUpdInfo(params).then(data => {
					if (data.errno == 200) {
						uni.showToast({
							title: '充值成功'
						});
						putUserInfo(data).then(data => {
							let userInfo = uni.getStorageSync('userInfo');
							this.userInfo = userInfo;
							this.chargeStatus = false;
						}).catch(err => {})
					}
				}).catch(err => {})
			},
			coupon() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				})
			}
		}
	}
</script>

<style>
</style>
