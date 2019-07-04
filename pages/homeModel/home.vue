<template>
	<view>
		<view v-if="loading">
			<view class='flex-sub radius shadow-lg'>
				<view>
					加载中，请稍后
				</view>
			</view>
		</view>
		<view v-else>
			<image :src="data.images" class="topImage"></image>
			<view class="cu-card case bg-black sweet-tag">
				<view class='flex align-center padding-sm'>
					<view class='flex-sub text-center'>
						<view class="solid-bottom text-sm">
							<text>{{data.remark}}</text>
						</view>
						<view class='text-sl' style="line-height: 1;">
							<text class='text-yellow'>{{data.Mark}}</text>
						</view>
						<view class="text-sm">
							<text class='text-yellow'>不错，房间很宽敞</text>
						</view>
					</view>
				</view>
			</view>
			<view class="padding bg-white">
				<view>
					<text class="text-xl">{{data.hotelname}}</text>
					<text class="text-sm margin-left">{{data.type}}</text>
				</view>
				<view class="flex justify-between solid-bottom">
					<text class="text-sm">{{data.address}}<text class="text-sm margin-left text-grey">{{data.areaname}}</text></text>
					<text class="text-sm text-blue" @tap="goMap">地图/导航></text>
				</view>

				<view class="flex justify-between">
					<view class='content'>
						<text class=''>{{ dateStr }}</text>
					</view>
					<view class="text-sm text-blue" v-if="status">
						{{countNight}}
					</view>
					<view class="text-sm text-blue" v-if="!status" @tap="showCaledar = !showCaledar">
						{{countNight}}>
					</view>
				</view>
				<calendar v-if="!status" @change="change" :modal="true" :show="showCaledar"></calendar>
				<view class="cu-card case sweet-margin0">
					<view class="cu-item shadow" style="margin: 0;">
						<view class="flex solid-bottom justify-between" v-for="(item,index) in data.houses" :key="index">
							<view class="flex justify-start">
								<view class='margin-xs radius' style="margin-left: 0;">
									<!-- 图片 -->
									<view class="" style="width: 170upx;overflow: hidden;position: relative;">
										<image class="radius" style="height: 170upx;" :src="item.images" mode=""></image>
									</view>
								</view>
								<view class='flex justify-between radius'>
									<view class="">
										<view class='text-lg' style="">
											<text class='text-black block text-cut'>{{item.name}}</text>
										</view>
										<view class='text-sm' style="line-height: 1.5;">
											<text>{{item.breakfast}}</text>
										</view>
										<view class='text-sm' style="line-height: 1.5;">
											<text class="text-green">预订后15分钟内可免费取消</text>
										</view>
										<view class='text-lg' style="line-height: 1.5;">
											<text class="text-red" style="font-size: 12px;">￥</text>
											<text class="text-red">{{item.price}}</text>
											<text class="bgTag" style="font-size: 12px;" :style="{backgroundImage:'url('+bgTag+')'}">{{data.tagname[0]}}</text>
										</view>
										<view class='text-sm'>
											<view class='cu-tag sm line-red fontSize8'>{{data.tagname[1]}}</view>
											<view class='cu-tag sm line-grey fontSize8' v-if="data.tagname[2]">{{data.tagname[2]||''}}</view>
										</view>
									</view>
								</view>
							</view>
							<view class="margin-top text-center">
								<view @tap="goHomeOrder(item)">
									<image style="height: 120upx;width: 150upx;float: right;display: block;" :src="book" mode=""></image>
								</view>
								<text class="text-red">剩余{{item.houseCount}}间</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const img = 'http://p0.meituan.net/tdchotel/1938994348a6ade29a5c6bf2fdf02ae15542536.jpg@220w_125h_1e_1c',
		bgTag = 'http://www.sweetqianba.com/group1/M00/00/00/rBsAEVz_TWuALPoBAAAFE_TWZDA213.png';
	import calendar from '../../components/date-picker/date-picker.vue';
	import {
		getRoom
	} from '../../api/room.js'
	export default {
		data() {
			return {
				img: img,
				showCaledar: false,
				dateStr: '', //用于邯郸和民宿的tab
				countNight: 0,
				beginDate: '2019-05-06',
				endDate: '2019-05-07',
				home: [{
					id: 0,
					type: '大床'
				}, {
					id: 1,
					type: '单人标间'
				}, {
					id: 2,
					type: '双人标间'
				}],
				bgTag: bgTag,
				data: {
					equipment: [],
					houses: [],
					tagname: []
				},
				book: '../../static/pagesImgs/haveRoom.png',
				loading: true,
				status: false, //默认没有日期传过来
				time: null,
				num: 1,
				hotelId: null,
			}
		},
		onLoad(data) {
			if (data.date) {
				let time = data.date.split(',')
				this.dateStr = time[0] + "到" + time[1];
				this.time = time[0];
				this.countNight = data.countNight;
				this.num = this.countNight[1];
				this.status = true;
			} else {
				let date = new Date();
				this.time = date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate();
				this.status = false
			}
			this.hotelId = data.hotelId;
			const params = {
				hotelId: data.hotelId,
				time: this.time,
				num: this.num
			};
			getRoom(params).then(data => {
				this.data = data.data;
				uni.setNavigationBarTitle({
					title: this.data.hotelname
				});
			}).catch(err => {})
		},
		onShow() {
		},
		onReady() {
			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		components: {
			calendar,
		},
		methods: {
			goMap() {
				uni.navigateTo({
					url: "../hotelModel/map/map?lng=" + this.data.lng + "&lat=" + this.data.lat + "&name=" + this.data.hotelname
				})
			},
			goHomeOrder(data) {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: 'homeOrder/homeOrder?roomId=' + data.id + '&time=' + this.dateStr + '&countNight=' + this.countNight +
							'&price=' +
							data.price
					})
				} else {
					uni.navigateTo({
						url: '../userModel/login/login'
					})
				}
			},
			change({
				choiceDate,
				dayCount
			}) {
				this.dateStr = choiceDate[0].re + ' 到 ' + choiceDate[1].re;
				this.countNight = '共' + dayCount + '晚';
			},
		},
		watch: {
			dateStr(newVal, oldVal) {
				const params = {
					hotelId: this.hotelId,
					time: newVal.split('到')[0],
					num: this.countNight[1]
				}
				getRoom(params).then(data => {
					this.data = data.data;
				}).catch(err => {})
			}
		}
	}
</script>

<style>
	.topImage {
		width: 100%;
		/* #ifdef MP */
		height: 350upx;
		/* #endif */
	}

	.sweet-tag {
		width: 150upx;
		opacity: 0.8;
		position: absolute;
		/* #ifdef APP-PLUS */
		top: 200upx;
		/* #endif */
		/* #ifdef MP */
		top: 50upx;
		/* #endif */
		right: 50upx;
	}
</style>
