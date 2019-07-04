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
		<view class="" style="">

		</view>
		<view class="cu-card case" style="margin-top: 40px;" v-if="data.length !==0">
			<view v-for="(item,index) in data" :key="index" class="cu-item shadow" @tap="toDetails(item)">
				<view class="solid-bottom flex justify-between" style="padding: 10upx 30upx;">
					<view class="text-lg">
						<text>{{item.hotelname}}</text>
					</view>
					<view>
						<text>{{item.status}}</text>
					</view>
				</view>
				<view class="flex justify-start" style="padding: 10upx 30upx;">
					<view class="image" style="width: 120upx;overflow: hidden;position: relative;">
						<image class="radius" :src="item.images" style="height: 120upx;" mode="aspectFill"></image>
					</view>
					<view class="margin-left">
						<view>
							<text>数量：{{item.housenum}}</text>
						</view>
						<view>
							<text>支付金额：￥{{item.price}}</text>
						</view>
					</view>
				</view>
				<view class="flex justify-end" v-if="item.status == '待付款'">
					<view class='margin-xs radius'><button class="cu-btn round" @tap.stop="goPay(item)">去支付</button></view>
					<view class='margin-xs radius'><button class="cu-btn round" @tap.stop="goCancel(item)">取消预订</button></view>
				</view>
				<view class="flex justify-end" v-if="item.status == '待使用'">
					<view class='margin-xs radius'><button class="cu-btn round" @tap.stop="goFinish(item)">使用完成</button></view>
					<view class='margin-xs radius'><button class="cu-btn round" @tap.stop="goPayAgain(item)">再次预订</button></view>
					<view class='margin-xs radius'><button class="cu-btn round" @tap.stop="goRefund(item)">退款</button></view>
				</view>
				<view class="flex justify-end" v-if="item.status == '待评价'">
					<view class='margin-xs radius'><button class="cu-btn round" @tap.stop="goEvaluate(item)">去评价</button></view>
					<view class='margin-xs radius'><button class="cu-btn round" @tap.stop="goPayAgain(item)">再次预订</button></view>
				</view>
				<view class="flex justify-end" v-if="item.status == '退款/售后'">
					<view class='margin-xs radius'><button class="cu-btn round" @tap.stop="goPayAgain(item)">再次预订</button></view>
				</view>
			</view>
			<!-- 评价弹出框 -->
			<view class="cu-modal bottom-modal" :class="evaluateStatus?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class='action text-green' @tap="submitEvaluate">确定</view>
						<view class='action text-blue' @tap='evaluateStatus = false'>取消</view>
					</view>
					<view class='padding-xl'>
						<input type="text" v-model="evaluate.type" placeholder="请填写评价的类型" />
						<input type="text" v-model="evaluate.info" placeholder="请填写评价的信息" />
						<view class="cu-form-group">
							<view class="grid col-3 grid-square flex-sub">
								<view v-for="(img,index) in files" :key="index" class="padding-xs bg-img" :style="'background-image:url('+img+');'">
									<view @click="removeImg(index)" class="cu-tag bg-red">
										<text class='icon-close'></text>
									</view>
								</view>
								<view class="padding-xs solids" @click="chooseImage()" v-if="!files.length">
									<text class='icon-cameraadd'></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else style="margin-top: 500upx;text-align: center;">
			暂无订单
		</view>
	</view>
</template>

<script>
	import {
		orders
	} from '../../setting/order.js';
	import {
		getOrderInfoByStatus,
		deleteOrder,
		postOrder
	} from '../../api/orders.js'
	import {
		addEvaluate
	} from '../../api/evaluate.js'
	import {
		appUpdInfo
	} from '../../api/auth.js'
	import {
		putUserInfo
	} from '../../setting/putUserInfo.js'
	const img = 'http://p0.meituan.net/tdchotel/1938994348a6ade29a5c6bf2fdf02ae15542536.jpg@220w_125h_1e_1c';
	export default {
		data() {
			return {
				tabBar: orders.tabBar,
				tabCur: 0,
				img: img,
				data: [],
				evaluateStatus: false,
				evaluate: {},
				files: []
			}
		},
		onShow() {
			this.getOrderInfoByStatus();
		},
		methods: {
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id
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
			toDetails(item) {
				uni.navigateTo({
					url: 'orderDetails/orderDetails?id=' + item.id
				})
			},
			getOrderInfoByStatus() {
				let params = {
					status: this.tabBar[this.tabCur].name
				}
				if (this.tabBar[this.tabCur].name == '全部') {
					delete params.status;
				}
				getOrderInfoByStatus(params).then(data => {
					if (data.errno == 200) {
						this.data = data.data
					} else {
						this.data = []
					}
				}).catch(err => {})
			},
			// 去支付，跳转到homePay页面之后，验证密码之后，修改状态，返回到订单中心
			goPay(data) {
				uni.navigateTo({
					url: '../homeModel/homePay/homePay?price=' + data.price + '&id=' + data.id
				})
			},
			// 取消订单,将删除待付款的订单
			goCancel(data) {
				uni.showModal({
					title: '提示',
					content: '确定要取消订单吗？',
					success: (res) => {
						if (!res.cancel) {
							// 删除订单信息
							const params = {
								orderId: data.id
							}
							deleteOrder(params).then(data => {
								if (data.errno == 200) {
									this.getOrderInfoByStatus();
									uni.showToast({
										icon: 'none',
										title: '取消订单成功'
									});
								}
							}).catch(err => {})
						}
					}
				});
			},
			// 再次预订，跳转到酒店
			goPayAgain(data) {
				uni.navigateTo({
					url: '../homeModel/home?hotelId=' + data.hotelId
				})
			},
			// 跳转到评价页面
			goEvaluate(data) {
				this.evaluateStatus = true
				this.evaluate.orderId = data.id;
				this.evaluate.hotelId = data.hotelId;
			},
			// 退款，直接弹出模态框进行提示，然后修改状态，并将金钱加到余额里
			goRefund(data) {
				uni.showModal({
					title: '确定要退款吗？',
					content: '退款之后，房费会自动返回到您的钱包里',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (!res.cancel) {
							// 删除订单信息
							const params = {
								id: data.id,
								status: '退款/售后'
							}
							postOrder(params).then(data1 => {
								if (data1.errno == 200) {
									this.getOrderInfoByStatus();
									const money = uni.getStorageSync('userInfo').money;
									let params = {
										money: Number(money) + Number(data.price)
									}
									appUpdInfo(params).then(data => {
										if (data.errno == 200) {
											putUserInfo(data).then(data => {
												uni.showToast({
													title: '退款成功'
												});
											}).catch(err => {})
										}
									}).catch(err => {})
								}
							}).catch(err => {})
						}
					}
				});
			},
			/* 删除图片 */
			removeImg(index) {
				this.files.splice(index, 1)
			},
			/* 预览图片 */
			previewImage(e) {
				uni.previewImage({
					current: e.currentTarget.id,
					urls: this.files,
				})
			},
			/* 选择图片 */
			chooseImage(e) {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.files = this.files.concat(res.tempFilePaths)
					}
				})
			},
			/* 上传图片 */
			uploadImg(file) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: "https://www.sweetqianba.com/fastDfs/uploadFile",
						filePath: file,
						name: 'file',
						success(res) {
							resolve(res.data)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			submitEvaluate() {
				this.uploadImg(this.files[0]).then(data => {
					data = JSON.parse(data);
					if (data.success === '上传成功') {
						uni.showToast({
							icon: 'none',
							title: '上传成功'
						})
						let info = {
							image: 'https://' + data.URL,
							detail: this.evaluate.info,
							type: this.evaluate.type,
							hotelId: this.evaluate.hotelId
						}
						const params = {
							id: this.evaluate.orderId,
							status: '已完成'
						}
						addEvaluate(info).then(data => {
							this.evaluateStatus = false;
							postOrder(params).then(data1 => {
								if (data1.errno == 200) {
									this.getOrderInfoByStatus();
									uni.showToast({
										icon: 'none',
										title: '评价成功'
									})
								}
							}).catch(err => {})
						}).catch(err => {})
					}
				}).catch(err => {})
			},
			goFinish(data) {
				const params = {
					id: data.id,
					status: '待评价'
				}
				postOrder(params).then(data1 => {
					if (data1.errno == 200) {
						this.getOrderInfoByStatus();
						uni.showToast({
							icon: 'none',
							title: '修改成功'
						})
					}
				}).catch(err => {})
			}
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
						this.getOrderInfoByStatus();
					}
				})
			}
		},
	}
</script>

<style>
</style>
