<template>
	<view>
		<!-- #ifdef MP -->
		<view class="box">
			<view class="cu-bar search">
				<view class='search-form round'>
					<text class="icon-search"></text>
					<input type="text" placeholder="搜索酒店/民宿" confirm-type="search" v-model="search"></input>
				</view>
				<view class='action'>
					<button class='cu-btn bg-blue shadow-blur round' @tap="searchHotel">搜索</button>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// #ifdef MP
				search: null,
				// #endif
				inputVal: null,
			}
		},
		methods: {
			// #ifdef MP
			searchHotel() {}
			// #endif
		},
		// 监听input的值和按钮操作事件和软键盘上的搜索按钮
		onNavigationBarButtonTap(val) {
			// 执行某些操作
			uni.showToast({
				icon: 'none',
				title: this.inputVal
			})
		},
		onNavigationBarSearchInputChanged(val) {
			this.inputVal = val.text;
		},
		onNavigationBarSearchInputConfirmed(val) {
			// 同button的事件
			uni.showToast({
				icon: 'none',
				title: this.inputVal
			})
		},
	}
</script>

<style>

</style>
