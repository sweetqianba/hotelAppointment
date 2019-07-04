<template>
	<view class="content" @touchstart='TouchStart' @touchmove='ListTouchMove' @touchend='ListTouchEnd'>
		<view class="cu-card case">
			<view v-for="(item,index) in data" :key="index" class="cu-item shadow" @tap="toDetails">
				<view class="solid-bottom flex justify-between" style="padding: 10upx 30upx;">
					<view class="text-lg">
						<text>{{item.hotelname}}</text>
					</view>
				</view>
				<view class="flex justify-start" style="padding: 10upx 30upx;">
					<view class="image" style="width: 120upx;overflow: hidden;position: relative;">
						<image class="radius" :src="item.image" style="height: 120upx;" mode="aspectFill"></image>
					</view>
					<view class="margin-left">
						<view>
							<text>{{item.detail}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getEvaluatesByUid
	} from '../../api/evaluate.js'
	export default {
		data() {
			return {
				data: []
			}
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.getAllEvaluates();
			}
		},
		methods: {
			getAllEvaluates() {
				getEvaluatesByUid().then(data => {
					this.data = data.data;
				}).catch(err => {})
			}
		}
	}
</script>

<style>
</style>
