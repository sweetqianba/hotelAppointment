<template>
	<view style="width: 100%;" class="bgWhiteToGrey">
		<view class="content">
			<view class="cu-list grid col-4 no-border noBg" @touchstart='TouchStart' @touchmove='ListTouchMove' @touchend='ListTouchEnd'>
				<view class="cu-item" v-for="(item,index) in iconList" :key="index" @tap="method(item.methods)">
					<view :class="['icon-'+item.icon,'text-'+item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<swiper class="card-swiper square-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000"
			 duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff" @change="cardSwiper">
				<swiper-item v-for="(item,index) in swiper" :key="index" :class="cardCur === item.id?'cur':''">
					<view class='bg-img shadow-blur' :style="{backgroundImage:'url('+item.img+')'}" @tap="goHotelCenter(index)"></view>
				</swiper-item>
			</swiper>
			<!-- 第一个类型的card -->
			<view @touchstart='TouchStart' @touchmove='ListTouchMove' @touchend='ListTouchEnd'>
				<view class="cu-card case margin0" v-for="(item,index) in data" :key="index" @tap="goRoom(item)">
					<view class="cu-item shadow">
						<view class="flex solid-bottom padding justify-between">
							<view class='radius leftImg'>
								<view class='text-xl'>
									<text class='text-black text-bold block text-cut'>{{item.hotelname}}</text>
								</view>
								<view class='text-sm flex justify-between'>
									<view>
										<text class="text-yellow">{{item.Mark}}分</text>
										<text class="margin-left">{{item.areaname}}</text>
									</view>
									<view>
										<text class="text-grey">{{item.distance}}km</text>
									</view>
								</view>
								<view class='text-df'>
									<text class="text-red fontSize8">￥</text>
									<text class="text-red">{{item.minprice}}</text>
									<text class="text-grey fontSize10 marginLeft5">起</text>
									<text class="bgTag" :style="{backgroundImage:'url('+bgTag+')'}">{{item.tagname[0]}}</text>
								</view>
								<view class='text-sm'>
									<view class='cu-tag sm line-grey fontSize8' v-for="(subItem,subIndex) in item.tagname.length-1" :key="subIndex">{{item.tagname[subItem+1]}}</view>
								</view>
							</view>
							<view class='margin-xs radius rightImg'>
								<!-- 图片 -->
								<view class="image">
									<image style="height: 170upx;" class="radius" :src="item.images" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 第二个类型的card -->
			<view class="cu-card case margin0" @touchstart='TouchStart' @touchmove='ListTouchMove' @touchend='ListTouchEnd'>
				<view v-for="item in cards" :key="item.id" class="cu-item shadow">
					<view class="flex solid-bottom padding justify-between">
						<view class='radius' style="width: 100%;">
							<view class='text-xl'>
								<text class='text-black text-bold block text-cut'>3D蜡像星空体验馆</text>
							</view>
							<view class='text-sm flex justify-between'>
								<view>
									<text class="text-yellow">3.9分</text>
									<text class="margin-left">龙湖</text>
								</view>
								<view>
									<text class="text-grey">4.6km</text>
								</view>
							</view>
							<view class='text-df'>
								<text class="text-red fontSize8">￥</text>
								<text class="text-red">79</text>
								<text class="text-grey fontSize10 marginLeft5">起</text>
								<text class="bgTag" :style="{backgroundImage:'url('+bgTag+')'}">返门票券</text>
								<view class='cu-tag sm line-grey fontSize8 margin-left'>学校周边</view>
								<view class='cu-tag sm line-grey fontSize8'>新客超值返现</view>
							</view>
							<view class="grid col-3 text-center">
								<view class="image padding2">
									<image class="radius" :src="img2" mode="widthFix"></image>
								</view>
								<view class="image padding2">
									<image class="radius" :src="img3" mode="widthFix"></image>
								</view>
								<view class="image padding2">
									<image class="radius" :src="img4" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 左侧弹出框 -->
			<view @touchstart='TouchStart' @touchmove='ListTouchMove' @touchend='ListTouchEnd' class="cu-modal drawer-modal justify-start"
			 :class="{'show':modalName=='DrawerModalL'}" @tap="modalName = ''">
				<leftModel :status='loginStatus'></leftModel>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 750upx;height: 40px;opacity: 0.8;background: #000000;" v-if="!loginStatus">
			<text class="text-white text-lg" style="margin: 5px 10px 0 10px;">如果你不登录，我就霸占这里不离开</text>
			<button class="cu-btn bg-blue" style="margin-top: 5px;" @tap="goLogin">马上登录</button>
		</view>
	</view>
</template>

<script>
	import leftModel from './leftModel'
	import {
		mainIcon
	} from '../../setting/main.js';
	import {
		appGetHotelsByToken,
		appGetRandomHotels
	} from '../../api/hotels.js'
	const img = 'http://p0.meituan.net/tdchotel/1938994348a6ade29a5c6bf2fdf02ae15542536.jpg@220w_125h_1e_1c',
		bgTag = 'http://www.sweetqianba.com/group1/M00/00/00/rBsAEVz_TWuALPoBAAAFE_TWZDA213.png',
		img2 = 'http://p0.meituan.net/hotel/afb53273e9dc6b09bf4cf427119e5a58591104.jpg@660w_500h_1e_1c',
		img3 = 'http://p0.meituan.net/hotel/26b031011e46a371444a08123ba307e2674980.png',
		img4 = 'http://p0.meituan.net/hotel/2490b2063966e24538f279760ee0cad3652981.png'
	export default {
		data() {
			return {
				loginStatus: false, //默认为未登录
				modalName: null, //控制打开状态，打开方式
				ListTouchStart: null, // 起始的位置，用于判断左右滑动
				ListTouchStartY: null, //其实的y坐标位置，用于判断是否滑动，如果上下滑动的太大就不进行滑动
				touchDirection: null, // 算出来的滑动方向
				iconList: mainIcon.iconList,
				swiper: mainIcon.swiper,
				cardCur: 0,
				cards: [{
					id: 0,
				}],
				img: img,
				img2: img2,
				img3: img3,
				img4: img4,
				bgTag: bgTag,
				inputVal: null, //导航栏上的input的值
				params: {},
				pageNum: 1, //当前获取数据的页数
				pageSize: 10, //每页多少条
				data: [],
			}
		},
		components: {
			leftModel
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
				this.data = [];
				this.pageNum = 1;
				let params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				this.appGetHotelsByToken(params)
				uni.showToast({
					icon: 'none',
					title: '刷新成功'
				})
			}, 1000)
		},
		//触底刷新
		onReachBottom() {
			this.pageNum++;
			this.params.pageNum++;
			this.appGetHotelsByToken(this.params)
		},
		onLoad() {
			let params = {
				pageNum: this.pageNum,
				pageSize: this.pageSize
			}
			this.params = params;
			this.appGetHotelsByToken(this.params)
		},
		// 监听input的值和按钮操作事件和软键盘上的搜索按钮
		onNavigationBarButtonTap(val) {
			uni.navigateTo({
				url: '../hotelModel/hotelList/hotelList?name=' + this.inputVal
			})
		},
		onNavigationBarSearchInputChanged(val) {
			this.inputVal = val.text
		},
		onNavigationBarSearchInputConfirmed(val) {
			uni.navigateTo({
				url: '../hotelModel/hotelList/hotelList?name=' + this.inputVal
			})
		},
		onShow() {
			if (!uni.getStorageSync('token')) {
				this.loginStatus = false
			} else {
				this.loginStatus = true
			}
			this.hideModel();

		},
		methods: {
			hideModel() {
				this.modalName = null;
			},
			showModel() {
				this.modalName = 'DrawerModalL';
			},
			// 轮播图显示增大方法
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			/* 左滑操作 */
			// ListTouch触摸开始
			TouchStart(e) {
				this.ListTouchStart = e.touches[0].pageX;
				this.ListTouchStartY = e.touches[0].pageY;
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.touchDirection = null;
				/* 在保证y轴上变化不大的情况下，可以进行滑动 */
				if (Math.abs(e.touches[0].pageY - this.ListTouchStartY) < 20 && Math.abs(e.touches[0].pageX - this.ListTouchStart) >
					50) {
					this.touchDirection = e.touches[0].pageX - this.ListTouchStart > 0 ? 'right' : 'left';
				}
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.touchDirection == 'left') {
					this.hideModel();
				} else if (this.touchDirection == 'right') {
					this.showModel();
				}
			},
			goHotelCenter(index) {
				if (index === 0) {
					uni.switchTab({
						url: '../hotelModel/hotels'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '暂未开放'
					})
				}
			},
			goRoom(data) {
				uni.navigateTo({
					url: '../homeModel/home?hotelId=' + data.id
				})
			},
			appGetHotelsByToken(params) {
				appGetHotelsByToken(params).then(data => {
					console.log(data,'sssssssss')
					if (!data.data) {
						// 调用随机获取酒店信息
						appGetRandomHotels(params).then(data => {
							data.data.forEach(item => {
								this.data.push(item)
							})
						}).catch(err => {})
					} else {
						data.data.forEach(item => {
							this.data.push(item)
						})
					}
				}).catch(err => {
					console.log(err,'eeeeeee')
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '../userModel/login/login'
				});
			},
			goHotel() {
				uni.switchTab({
					url: '../hotelModel/hotels'
				})
			},
			goMovie() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				});
			},
			goNoise() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				});
			},
			goEvaluate() {
				uni.navigateTo({
					url: "../evaluateModel/evaluate"
				})
			},
			goTop() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				});
			},
			goHelp() {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				});
			},
			method(data) {
				this[data]();
			}
		}
	}
</script>
<style>

</style>
