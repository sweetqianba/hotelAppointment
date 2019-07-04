<template>
	<view>
		<!-- #ifdef MP -->
		<view class="box bg-white">
			<view class="cu-bar search">
				<view class='search-form round'>
					<text class="icon-search"></text>
					<input type="text" placeholder="搜索酒店" confirm-type="search" v-model="inputVal"></input>
				</view>
				<view class='action'>
					<button class='cu-btn bg-blue shadow-blur round' @tap="searchHotel">搜索</button>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="cu-card bg-white padding">
			<view class="cu-card case sweet-margin0">
				<view class="cu-item shadow" style="margin: 0;">
					<view class="flex justify-between" v-for="(item,index) in data " :key="index" @tap="goHome(item)">
						<view class="flex justify-start">
							<view class='margin-xs radius' style="margin-left: 0;">
								<!-- 图片 -->
								<view class="" style="width: 170upx;overflow: hidden;position: relative;">
									<image class="radius" style="height: 230upx;" :src="item.images||''" mode="aspectFill"></image>
								</view>
							</view>
							<view class='flex justify-between radius' style="margin-left: 10px;width: 500upx;">
								<view style="width: 480upx;">
									<view class='text-lg text-cut'>
										<text class='text-black text-cut'>{{item.hotelname}}</text>
										<text class="text-sm" style="margin-left: 4px;">{{item.type}}</text>
									</view>
									<view class='text-sm' style="line-height: 1.5;">
										<text class="text-blue text-xl">{{item.Mark}}</text>
										<text class="text-blue">分</text>
										<text class="text-sm text-blue" style="margin-left: 2px;">{{item.remark}}</text>
										<text class="text-sm margin-left">5000+人消费</text>
									</view>
									<view class='text-sm' style="line-height: 1.5;">
										<text class="">距我直线{{item.distance}}km，{{item.areaname}}</text>
									</view>
									<view class="flex justify-between">
										<view class='text-lg' style="line-height: 1.2;">
											<text class="text-red" style="font-size: 12px;">￥</text>
											<text class="text-red text-xxl">{{item.minprice}}</text>
											<text class="text-grey fontSize10 marginLeft5">起</text>
										</view>
										<view class='' style="">
											<text class="text-red" style="font-size: 12px;">{{item.tagname[0]}}</text>
										</view>
									</view>
									<view class='text-sm solid-bottom'>
										<view class='cu-tag sm line-grey fontSize8' v-for="(subItem,subIndex) in item.tagname.length-1" :key="subIndex">{{item.tagname[subItem+1]}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		appGetHotels,
		appGetMS,
		getHotelInfoByHotelName
	} from '../../../api/hotels.js'
	export default {
		data() {
			return {
				params: {},
				data: [],
				pageNum: 1, //当前获取数据的页数
				pageSize: 10, //每页多少条
				type: null,
				countNight: null,
				inputVal: null
			}
		},
		onLoad(data) {
			if (data.name) {
				this.inputVal = data.name
				let params = {
					ids: data.name
				}
				getHotelInfoByHotelName(params).then(data => {
					this.data = data.data;
				}).catch(err => {})
			} else {
				this.countNight = data.nightNum;
				this.type = data.type;
				let params = {
					area: data.area,
					price: data.lowPrice,
					type: data.star,
					time: data.date,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				for (let key in params) {
					if (params[key] == 'undefined') {
						delete params[key]
					}
				}
				this.params = params;
				if (this.type === '小时房') {
					let time = data.date.split(',')[0];
					this.params.time = time
				}
				switch (this.type) {
					case "邯郸":
						this.appGetHotels(params)
						break;
					case "小时房":
						this.appGetHotels(params)
						break;
					case "民宿公寓":
						this.appGetMS(params)
						break;
					default:
						this.search = data.name
						break;
				}
			}
		},
		//触底刷新
		onReachBottom() {
			// 一次10条
			this.pageNum++;
			this.params.pageNum++;
			switch (this.type) {
				case "邯郸":
					this.appGetHotels(this.params)
					break;
				case "小时房":
					this.appGetHotels(this.params)
					break;
				case "民宿公寓":
					this.appGetMS(this.params)
					break;
				default:
					this.appGetHotels(this.params)
					break;
			}
		},
		// 监听input的值和按钮操作事件和软键盘上的搜索按钮
		onNavigationBarButtonTap(val) {
			// 执行某些操作
			let params = {
				ids: this.inputVal
			}
			getHotelInfoByHotelName(params).then(data => {
				this.data = data.data;
			}).catch(err => {})
		},
		onNavigationBarSearchInputChanged(val) {
			this.inputVal = val.text;
		},
		onNavigationBarSearchInputConfirmed(val) {
			// 同button的事件
			let params = {
				ids: this.inputVal
			}
			getHotelInfoByHotelName(params).then(data => {
				this.data = data.data;
			}).catch(err => {})
		},
		methods: {
			appGetHotels(params) {
				appGetHotels(params).then(data => {
					if (data.errno == 200) {
						if (data.data.length === 0) {
							uni.showToast({
								icon: 'none',
								title: '我们也是有底线的'
							})
							return;
						}
						uni.showToast({
							icon: 'none',
							title: data.errmsg
						})
						data.data.forEach(item => {
							this.data.push(item)
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: data.errmsg
						})
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err.message
					})
				})
			},
			appGetMS(params) {
				appGetMS(params).then(data => {
					if (data.errno == 200) {
						if (data.data.length === 0) {
							uni.showToast({
								icon: 'none',
								title: '我们也是有底线的'
							})
							return;
						}
						uni.showToast({
							icon: 'none',
							title: data.errmsg
						})
						data.data.forEach(item => {
							this.data.push(item)
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: data.errmsg
						})
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err.message
					})
				})
			},
			goHome(item) {
				console.log(JSON.stringify(this.params))
				if (this.params.time) {
					uni.navigateTo({
						url: '../../homeModel/home?hotelId=' + item.id + '&date=' + this.params.time + '&countNight=' + this.countNight
					})
				} else {
					uni.navigateTo({
						url: '../../homeModel/home?hotelId=' + item.id
					})
				}

			},
			searchHotel() {
				// 同button的事件
				let params = {
					ids: this.inputVal
				}
				getHotelInfoByHotelName(params).then(data => {
					this.data = data.data;
				}).catch(err => {})
			}
		}
	}
</script>

<style>
</style>
