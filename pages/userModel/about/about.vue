<template>
	<view style="width: 100%;" class="bgWhiteToGrey">
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="checkUpd">
				<view class='content flex justify-between'>
					<text class='text-black'>版本信息</text>
					<text class='text-black'>1.0.0</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="goSweetqianba">
				<view class='content flex justify-between'>
					<text class='text-black'>前端</text>
					<text class='text-black'>刘原昊</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow">
				<view class='content flex justify-between'>
					<text class='text-black'>后端</text>
					<text class='text-black'>余腾飞</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow">
				<view class='content flex justify-between'>
					<text class='text-black'>设计、数据</text>
					<text class='text-black'>张吉君</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null
			}
		},
		methods: {
			goSweetqianba() {},
			checkUpd() {}
		}
	}
</script>

<style>
</style>
