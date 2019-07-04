<template>
	<view style="overflow-x: hidden;ovweflow-y: auto;">
		<view class="bg-gradual-blue shadow-blur" style="width: auto;height: 150upx;"></view>
		<view class="cu-card case margin" style="position: absolute;width: 690upx;border-radius: 5px;margin-top: -150upx;">
			<view class='text-xl'>
				<text class='text-white text-bold'>{{data.status}}</text>
			</view>
			<view class="text-white">
				您的订单{{data.status}}，期待您再次光顾哦
			</view>
		</view>

		<view class="cu-list menu">
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>在线支付</text>
					<text class='text-red'>￥{{data.price}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>发票报销</text>
					<text class='text-black'>如需发票，请先与酒店确认可开</text>
				</view>
			</view>
			<view class="cu-card padding bg-white">
				<view class="flex justify-between">
					<text class="text-lg">{{data.hotelname}}</text>
					<text class="text-blue" @tap="goHotel">查看商家></text>
				</view>
				<view>
					<text class="text-sm text-cut">{{data.address}}</text>
				</view>
				<view class="flex justify-between">
					<button class="cu-btn bg-white text-blue text-lg" style="width: 340upx;" @tap="goMap"><text class="icon-location"></text>查看路线</button>
					<button class="cu-btn bg-white text-blue text-lg" style="width: 340upx;" @tap="call"><text class="icon-phone"></text>联系商家</button>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class='action'>
				<text class='text-orange'></text> 预订信息
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>时间</text>
					<text class='text-black'>￥{{data.time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>房间数</text>
					<text class='text-black'>{{data.housenum}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>联系手机</text>
					<text class='text-black'>{{data.telephone}}</text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class='action'>
				<text class='text-orange'></text> 订单信息
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>订单号</text>
					<text class='text-black'>{{data.id}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>数量</text>
					<text class='text-black'>{{data.daynum}}晚×{{data.housenum}}间</text>
				</view>
			</view>
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>房费</text>
					<text class='text-black'>￥{{data.price}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class='content flex justify-between'>
					<text class='text-grey'>押金(到店支付)</text>
					<text class='text-black'>￥{{data.deposit}}</text>
				</view>
			</view>
			<view class="cu-item" style="margin-bottom: 70upx;">
				<view class='content flex justify-between'>
					<text class='text-grey'>支付金额</text>
					<text class='text-black'>￥{{data.price}}</text>
				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 750upx;height: 40px;background: #000000;" v-if="!loginStatus">
			<button class="cu-btn bg-white" style="height: 100%;width: 50%;border-radius: 0;">商家信息报错</button>
			<button class="cu-btn bg-blue" style="height: 100%;width: 50%;border-radius: 0">删除订单</button>
		</view>
	</view>
</template>

<script>
	import {
		orderDetails
	} from '../../../setting/order.js'
	import {
		getOrderInfo
	} from '../../../api/orders.js'
	export default {
		data() {
			return {
				totalData: orderDetails.totalData,
				bookData: orderDetails.bookData,
				orderData: orderDetails.orderData,
				data: {}
			}
		},
		onLoad(data) {
			let params = {
				orderId: data.id
			}
			getOrderInfo(params).then(data => {
				this.data = data.data
			}).catch(err => {})
		},
		methods: {
			call() {
				// #ifdef APP-PLUS
				uni.makePhoneCall({
					phoneNumber: this.data.telephone
				})
				// #endif
				// #ifdef MP
				uni.showToast({
					icon: 'none',
					title: '小程序暂不支持，请使用app'
				})
				// #endif
			},
			goHotel() {
				uni.navigateTo({
					url: '../../homeModel/home?hotelId=' + this.data.hotelId
				})
			},
			goMap() {
				uni.navigateTo({
					url: '../../hotelModel/map/map?lat=' + this.data.lat + '&lng=' + this.data.lng + '&name=' + this.data.hotelname
				})
			}
		}
	}
</script>

<style>

</style>
