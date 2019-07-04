<template>
	<view class="my-content">
		<view class="bg-gradual-blue shadow-blur" style="width: auto;height: 620upx;"></view>
		<view class="bg-gradual-blue shadow-blur" style="border-radius: 0 0 5px 5px;">
			<image :src="waveImg||''" mode='scaleToFill' class='gif-black response' style='height:100rpx;border-radius: 0;'></image>
		</view>
		<view class="cu-card case margin bg-white" style="position: absolute;width: 690upx;border-radius: 5px;margin-top: -720upx;">
			<scroll-view scroll-x class="nav radius">
				<view class='flex text-center'>
					<view v-for="(item,index) in tabBar" class="cu-item flex-sub" :class="index === tabCur?'text-blue cur':''" :key="index"
					 @tap='tabSelect' :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<calendar @change="change" :modal="true" :show="showCaledar"></calendar>
			<!-- 设置星级价格的模态框 -->
			<view class="cu-modal bottom-modal" :class="showRangeSlider?'show':''" @tap="showRangeSlider = !showRangeSlider">
				<view class="cu-dialog" catchtap>
					<view class="text-left padding-sm">价格</view>
					<view class='grid col-3 padding-sm'>
						<view v-for="(item,index) in choose" class='padding-xs' :key="index">
							<button class='cu-btn' :class="index === priceIds?'line-blue':'line-grey'" @tap="choosePrice(index)">{{item.data}}</button>
						</view>
					</view>
					<view class="text-left" style="padding-left: 20upx;">星级</view>
					<view class='grid col-4 padding-sm'>
						<view v-for="(item,index) in star" class='padding-xs' :key="index">
							<button class='cu-btn' :class="index === starIds?'line-blue':'line-grey'" @tap="chooseStar(index)">{{item.data}}</button>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu card-menu bottom-border">
				<view class="cu-item">
					<form>
						<view class="cu-form-group" style="padding: 0;">
							<view class='content'>地区</view>
							<picker @change="PickerChange" :value="areaIndex" :range="picker">
								<view class="picker">
									{{areaIndex?picker[areaIndex]:'邯山区'}}
								</view>
							</picker>
						</view>
					</form>
				</view>
				<view v-if="tabCur !== 1" class="cu-item arrow" @tap="showCaledar = !showCaledar">
					<view class='content'>
						<text class='text-black'>{{ dateStr }}</text>
					</view>
					<view class='action'>
						<text class='text-black text-sm'>{{countNight}}</text>
					</view>
				</view>
				<view v-else class="cu-item arrow" @tap="showCaledar = !showCaledar">
					<view class='content'>
						<text class='text-black'>{{ dateStrOneDay }}</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="goAround">
					<view class='content'>
						<text class='text-black'>我的附近<text class="text-grey margin-left">{{tabCur === 2?'搜附近民宿/地名/关键词':'搜附近酒店/地名/关键词'}}</text></text>
					</view>
				</view>
				<view v-if="tabCur !== 1" class="cu-item arrow" @tap="showRangeSlider = !showRangeSlider">
					<view class='content'>
						<text class='text-grey' v-if="tabCur === 0&&(priceIds===null)&&(starIds===null)">{{'设置我喜欢的星级/价格'}}</text>
						<text class='text-black' v-if="tabCur === 0&&(priceIds!==null||starIds!==null)">{{choose[priceIds]?choose[priceIds].data:''||''}}&nbsp;&nbsp;&nbsp;&nbsp;{{star[starIds]?star[starIds].data:''||''}}</text>
						<text class='text-grey' v-if="tabCur === 2&&priceIds===null">{{'设置我喜欢的价格'}}</text>
						<text class='text-black' v-if="tabCur === 2&&priceIds!==null">{{choose[priceIds]?choose[priceIds].data:''||''}}</text>
					</view>
				</view>
				<button class='cu-btn bg-blue lg margin' style="width: 570upx;" @tap="goResult">查找酒店</button>
			</view>
		</view>
		<swiper class="card-swiper square-dot bg-white" style="height: 150px;" indicator-dots="true" circular="true" autoplay="true"
		 interval="5000" duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff" @change="cardSwiper">
			<swiper-item v-for="(item,index) in swiper" :key="index" :class="cardCur === item.id?'cur':''">
				<view class='bg-img shadow-blur' :style="{backgroundImage:'url('+(item.img||'')+')'}" @tap="goHotelCenter(index)"></view>
			</swiper-item>
		</swiper>
		<!-- 猜你喜欢模块 -->
		<view class="cu-card bg-white padding">
			<view>
				<text class="text-black text-bold text-xxl">猜你喜欢</text>
			</view>
			<view class="cu-card case sweet-margin0">
				<view class="cu-item shadow" style="margin: 0;">
					<view class="flex justify-between" v-for="(item,index) in data" :key="index" @tap="goHome(item)">
						<view class="flex justify-start">
							<view class='margin-xs radius' style="margin-left: 0;">
								<!-- 图片 -->
								<view class="" style="width: 170upx;overflow: hidden;position: relative;">
									<image class="radius" style="height: 230upx;" :src="item.images||''" mode="aspectFill"></image>
								</view>
							</view>
							<view class='flex justify-between radius' style="margin-left: 10px;width: 500upx;">
								<view style="width: 480upx;">
									<view class='text-lg' style="">
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
											<text class="bgTag" style="font-size: 12px;" :style="{backgroundImage:'url('+(bgTag||'')+')'}">{{item.tagname[0]}}</text>
										</view>
										<view class='' style="">
											<text class="text-red" style="font-size: 12px;">{{item.tagname[0]}}</text>
										</view>
									</view>
									<view class='text-sm solid-bottom'>
										<view class='cu-tag sm line-red fontSize8'>{{item.tagname[1]}}</view>
										<view class='cu-tag sm line-grey fontSize8' v-if="item.tagname[2]">{{item.tagname[2]||''}}</view>
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
	import calendar from '../../components/date-picker/date-picker.vue';
	import {
		hotels
	} from '../../setting/hotel.js'
	import {
		appGetHotelsByToken,
		appGetRandomHotels
	} from '../../api/hotels.js'
	const wave = '../../static/pagesImgs/wave.gif';

	export default {
		data() {
			return {
				waveImg: wave,
				beginDate: '2019-05-06',
				endDate: '2019-05-07',
				showCaledar: false,
				dateStr: '', //用于邯郸和民宿的tab
				dateStrOneDay: '', //用于钟点房的tab
				countNight: 0,
				tabBar: hotels.tabBar,
				tabCur: 0,
				showRangeSlider: false,
				choose: hotels.choose,
				star: hotels.star,
				cardCur: 0, //默认选中的图片，以后可修改
				swiper: hotels.swiper,
				picker: hotels.picker,
				areaIndex: 0,
				area: null,
				priceIds: null,
				starIds: null,
				params: {},
				pageNum: 1, //当前获取数据的页数
				pageSize: 10, //每页多少条
				data: [], //喜欢的数据
			};
		},
		components: {
			calendar
		},
		//触底刷新
		onReachBottom() {
			// 一次10条
			this.pageNum++;
			this.params.pageNum++;
			this.appGetHotelsByToken(this.params)
		},
		onLoad(data) {
			let params = {
				pageNum: this.pageNum,
				pageSize: this.pageSize
			}
			this.params = params;
			this.appGetHotelsByToken(this.params)
		},
		onBackPress() {
			if (this.showCaledar !== false) {
				this.showCaledar = false;
				return true;
			}
		},
		methods: {
			change({
				choiceDate,
				dayCount
			}) {
				this.dateStr = choiceDate[0].re + ' 到 ' + choiceDate[1].re;
				this.dateStrOneDay = choiceDate[0].re;
				this.countNight = '共' + dayCount + '晚';
			},
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id
			},
			pad(num, n) {
				return Array(n - ('' + num).length + 1).join(0) + num;
			},
			onRangeChange(e) {
				this.rangeValues = [e.minValue, e.maxValue];
			},
			test() {
				this.rangeValues = [10, 60];
			},
			//跳转到搜索酒店页面
			goAround() {
				uni.navigateTo({
					url: "around/around"
				})
			},
			// 轮播图显示增大方法
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			goHotelCenter(index) {
				uni.showToast({
					icon: 'none',
					title: '暂未开放'
				})
			},
			goHome(data) {
				uni.navigateTo({
					url: '../homeModel/home?hotelId=' + data.id
				})
			},
			goResult() {
				let lowPrice, highPrice, price, star;
				if (this.choose[this.priceIds]) {
					price = this.choose[this.priceIds].data;
					if (price.indexOf('以') > -1) {
						if (price.indexOf('下') > -1) {
							highPrice = price.slice(1, 4)
						} else {
							lowPrice = price.slice(1, 4)
						}
					} else {
						lowPrice = price.slice(1).split('~')[0];
						highPrice = price.slice(1).split('~')[1];
					}
				}
				star = this.star[this.starIds] ? this.star[this.starIds].data : undefined;
				let beginDate = this.dateStr.split('到')[0],
					endDate = this.dateStr.split('到')[1]
				let date = beginDate + ',' + endDate;
				uni.navigateTo({
					url: "hotelList/hotelList?area=" + this.picker[this.areaIndex] + "&date=" + date + "&lowPrice=" + lowPrice +
						"&highPrice=" + highPrice + "&star=" + star + "&type=" + this.tabBar[this.tabCur].name + "&nightNum=" +
						this.countNight
				})
			},
			PickerChange(e) {
				this.areaIndex = e.detail.value;
				this.area = this.areaIndex;
			},
			choosePrice(index) {
				this.priceIds = index;
			},
			chooseStar(index) {
				this.starIds = index
			},
			appGetHotelsByToken(params) {
				appGetHotelsByToken(params).then(data => {
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
				}).catch(err => {})
			}
		}
	};
</script>

<style>
	.my-content {
		justify-content: center;
		flex-direction: column;
		padding: 0;
		overflow-x: hidden;
		ovweflow-y: auto;
	}

	.sliderBox {
		justify-content: center;
		margin-right: 50upx;
	}

	.text-center {
		justify-content: center;
	}

	.title {
		font-size: 48upx;
		/* font-weight: bold; */
		text-align: center;
		margin-top: 50upx;
	}

	.subTitle {
		margin-top: 70upx;
		margin-bottom: 30upx;
		font-weight: bold;
	}

	.desc {
		color: #999999;
		font-size: 30upx;
	}

	.dateStr {
		font-size: 32upx;
		margin-top: 30upx;
	}

	.rowBox {
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.mrg50T {
		margin-top: 50upx;
	}

	.tips {
		color: #999;
		font-size: 24upx;
		text-align: center;
		margin-top: 100upx;
	}

	.btn {
		margin-top: 50upx;
	}


	/* range-slider */
</style>
