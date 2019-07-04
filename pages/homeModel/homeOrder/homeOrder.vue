<template>
	<view>
		<view class="bg-gradual-blue shadow-blur" style="width: auto;height: 320upx;"></view>
		<view class="cu-card case margin bg-white" style="position: absolute;width: 690upx;border-radius: 5px;margin-top: -320upx;">
			<view class='text-xl' style="padding: 15upx 30upx;">
				<text class='text-black'>{{data.name}}</text>
			</view>
			<view class="text-grey" style="padding: 0 30upx;">
				{{date}} {{countNight}}
			</view>
			<view class="text-gray" style="padding: 0 30upx;">
				{{data.breakfast}}.{{data.floor}}
			</view>
			<view style="background: #DDDDDD!important;">
				<view class="cu-item arrow" style="padding: 15upx 30upx;">
					<view class='content flex justify-between'>
						<text class='text-grey'>预订成功后15分钟内可免费取消</text>
						<text class='text-blue'>订房必读></text>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-list menu">
			<view class="cu-item arrow" @tap="showNumber = !showNumber">
				<view class='content'>
					<view class="sweet-text-left"><text class='text-grey'>房间数</text></view>
					<view class="sweet-text-right"><text class='text-black'>{{numberIds+1}}间</text></view>
				</view>
			</view>
			<!-- 下拉选择框 -->
			<view class='grid col-5 padding-sm' v-if="showNumber">
				<view v-for="(item,index) in data.houseCount" class='padding-xs' :key="index" @tap="chooseNumber(index)">
					<button class='cu-btn' :class="index === numberIds?'line-blue':'line-grey'">{{index+1+"间"}}</button>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class='content'>
					<view class="sweet-text-left">
						<text class='text-grey'>入住人&nbsp;&nbsp;</text>
					</view>
					<view class="sweet-text-right">
						<input type="text" placeholder="请输入姓名" class='radius' name='input' v-model="account"></input>
					</view>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class='content'>
					<view class="sweet-text-left">
						<text class='text-grey'>联系手机</text>
					</view>
					<view class="sweet-text-right">
						<input type="number" placeholder="请输入联系方式" class='radius' name='input' v-model="phone"></input>
					</view>
				</view>
			</view>
			<view class="cu-item arrow" @tap="showTime = !showTime">
				<view class='content'>
					<view class="sweet-text-left">
						<text class='text-grey'>预计到店</text>
					</view>
					<view class="sweet-text-right">
						<text class='text-black'>{{time[timeIds]}}(房间将整晚保留)</text>
					</view>
				</view>
			</view>
			<!-- 下拉选择框 -->
			<view class='grid col-4 padding-sm' v-if="showTime">
				<view v-for="(item,index) in time" class='padding-xs' :key="index" @tap="chooseTime(index)">
					<button class='cu-btn' :class="index === timeIds?'line-blue':'line-grey'">{{item}}</button>
				</view>
			</view>
			<view class="cu-item arrow margin-top">
				<view class='content'>
					<view class="sweet-text-left">
						<text class='text-grey'>抵用券</text>
					</view>
					<view class="sweet-text-right">
						<text class='text-black'>无可用抵用券</text>
					</view>
				</view>
			</view>
			<view class="cu-item arrow margin-top">
				<view class='content'>
					<view class="sweet-text-left">
						<text class='text-grey'>发票</text>
					</view>
					<view class="sweet-text-right">
						<text class='text-black'>如需发票，请先与酒店确认可开</text>
					</view>
				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 750upx;height: 40px;background: #000000;">
			<button class="cu-btn bg-white" style="height: 100%;width: 50%;border-radius: 0;color:red">￥{{price}}</button>
			<button class="cu-btn bg-blue" style="height: 100%;width: 50%;border-radius: 0" @tap="submit">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {
		getHouseByHouseId
	} from '../../../api/room.js'
	import {
		addOrder
	} from '../../../api/orders.js'
	export default {
		data() {
			return {
				numberIds: 0,
				timeIds: 0,
				showTime: false,
				showNumber: false,
				data: {},
				date: null,
				countNight: 0,
				time: ["14:00", "18:00", "22:00", "02:00", "06:00", "10:00"],
				account: null,
				phone: null
			}
		},
		computed: {
			price() {
				return Number(this.data.price) * (this.numberIds + 1) * Number(this.countNight[1])
			}
		},
		onLoad(data) {
			this.date = data.time;
			this.countNight = data.countNight;
			let userInfo = uni.getStorageSync('userInfo');
			this.account = userInfo.account;
			this.phone = userInfo.telephone;
			let params = {
				houseId: data.roomId,
				time: data.time.split('到')[0],
				num: data.countNight[1]
			}
			getHouseByHouseId(params).then(data => {
				this.data = data.data
				this.data.housenum = Number(this.data.housenum);
			}).catch(err => {})
		},
		methods: {
			chooseNumber(index) {
				this.numberIds = index
			},
			chooseTime(index) {
				this.timeIds = index
			},
			submit() {
				const params = {
					house_id: this.data.id,
					time: this.date.split('到')[0],
					price: this.price,
					housenum: this.numberIds + 1,
					daynum: this.countNight[1],
					telephone: this.phone
				}
				addOrder(params).then(data => {
					if (data.errno == '200') {
						uni.navigateTo({
							url: '../homePay/homePay?price=' + this.data.price * (this.numberIds + 1) * this.countNight[1] + '&id=' +
								data.data.id
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: data.errmsg
						})
					}
				}).catch(err => {})
			}
		}
	}
</script>

<style>
	.sweet-text-left {
		display: inline-block;
		float: left;
	}

	.sweet-text-right {
		display: inline-block;
		position: absolute;
		left: 200upx;
	}
</style>
