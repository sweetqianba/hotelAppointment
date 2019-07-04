<template>
	<view class="content" @touchstart='TouchStart' @touchmove='ListTouchMove' @touchend='ListTouchEnd'>
		<view class="cu-card case bg-white" style="position: fixed;top: 0;z-index: 9999;width: 750upx;">
			<scroll-view scroll-x class="bg-white nav">
				<view class='flex text-center'>
					<view class="cu-item flex-sub" :class="index === tabCur?'text-blue cur':''" v-for="(item,index) in tabBar" :key="index"
					 @tap='tabSelect' :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="grid col-2">
			<view style="margin-top: 100upx;">
				<view class="cu-card case" v-for="(item,index) in leftData" :key="index" style="float: top;">
					<view class="cu-item shadow" style="margin:5px">
						<view class='image'>
							<image :src="item.image" mode="widthFix"></image>
						</view>
						<view class="cu-list menu menu-avatar">
							<view class="">
								<text class='text-black text-bold text-h2-cut margin-left margin-right'>{{item.detail}}</text>
							</view>
							<view class="cu-item" style="height: auto;padding-left:100upx ;">
								<view class="cu-avatar round sm" :style="{'backgroundImage':'url('+item.pic+')'}"></view>
								<view class='content flex justify-between'>
									<view class='radius'>{{item.account}}</view>
									<view class='radius'>
										<view class="text-gray text-sm">
											<text class="icon-appreciatefill"></text> 20
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="margin-top: 100upx;">
				<view class="cu-card case" v-for="(item,index) in rightData" :key="index" style="float: top;">
					<view class="cu-item shadow" style="margin:5px">
						<view class='image'>
							<image :src="item.image" mode="widthFix"></image>
						</view>
						<view class="cu-list menu menu-avatar">
							<view class="">
								<text class='text-black text-bold text-h2-cut margin-left margin-right'>{{item.detail}}</text>
							</view>
							<view class="cu-item" style="height: auto;padding-left:100upx ;">
								<view class="cu-avatar round sm" :style="{'backgroundImage':'url('+item.pic+')'}"></view>
								<view class='content flex justify-between'>
									<view class='radius'>{{item.account}}</view>
									<view class='radius'>
										<view class="text-gray text-sm">
											<text class="icon-appreciatefill"></text> 20
										</view>
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
		findOthers
	} from '../../../setting/find.js'
	import {
		getAllEvaluates
	} from '../../../api/evaluate.js'
	export default {
		data() {
			return {
				tabBar: findOthers.tabBar,
				data: [],
				tabCur: 0,
				scrollLeft: 0,
				leftData: [], //左面的数据
				rightData: [], //右面的数据
				ListTouchStart: null, // 起始的位置，用于判断左右滑动
				ListTouchStartY: null, //其实的y坐标位置，用于判断是否滑动，如果上下滑动的太大就不进行滑动
				touchDirection: null, // 算出来的滑动方向
			};
		},
		onLoad() {
			this.getAllEvaluates()
		},
		methods: {
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id
				this.scrollLeft = (e.currentTarget.dataset.id) * 60
			},
			// 将数据一分为二
			setDataDouble() {
				let leftData = [],
					rightData = [];
				this.data.forEach((item, index) => {
					if (item.id % 2 === 0) {
						leftData.push(item)
					} else {
						rightData.push(item)
					}
				})
				return {
					leftData,
					rightData
				}
			},
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
					this.turnRight();
				} else if (this.touchDirection == 'right') {
					this.turnLeft();
				}
			},
			turnRight() {
				this.tabCur === 5 ?
					uni.showToast({
						icon: 'none',
						title: '没有啦，请向左滑'
					}) :
					this.tabCur++;
			},
			turnLeft() {
				this.tabCur === 0 ?
					uni.showToast({
						icon: 'none',
						title: '没有啦，请向右滑'
					}) :
					this.tabCur--;
			},
			getAllEvaluates() {
				let params = {
					type: this.tabBar[this.tabCur].name
				}
				if (this.tabBar[this.tabCur].name == '推荐') {
					delete params.status;
				}
				getAllEvaluates(params).then(data => {
					if (data.errno == 200) {
						this.data = data.data
						let {
							leftData,
							rightData
						} = this.setDataDouble();
						this.leftData = leftData;
						this.rightData = rightData;
					} else {
						this.data = []
					}
				}).catch(err => {
				})
			},
		},
		watch: {
			tabCur(newValue, oldValue) {
				this.data = [];
				//弹出弹出框
				uni.showToast({
					icon: 'loading',
					title: '客观，请稍等',
					mask: true,
					duration: 1000,
					success: () => {
						// 调接口
						this.getAllEvaluates();
					}
				})
			}
		},
	};
</script>

<style>
</style>
