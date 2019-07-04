<template>
	<uni-password ref="secrity" @input="onInput" @confirm="onConfirm" @autoCheck="onAutoCheck">
	</uni-password>
</template>

<script>
	import uniPassword from '../../../components/uni-password/uni-password.vue'
	import uniKeyboard from '../../../components/uni-keyboard.vue'
	import {
		postOrder
	} from '../../../api/orders.js'
	import {
		appUpdInfo
	} from '../../../api/auth.js'
	import {
		putUserInfo
	} from '../../../setting/putUserInfo.js'
	export default {
		components: {
			uniKeyboard,
			uniPassword
		},
		data() {
			return {
				showKeyboard: false,
				price: 0,
				id: null
			}
		},
		onLoad(data) {
			this.price = data.price
			this.id = data.id
		},
		methods: {
			onInput(e) {},
			onConfirm(e) {},
			onAutoCheck(e) {
				let password = e.password.join('')
				// 自动验证
				let userInfo = uni.getStorageSync('userInfo')
				let paypassword = userInfo.paypassword
				if (paypassword == password) {
					if (this.price > userInfo.money) {
						uni.showToast({
							icon: 'none',
							title: '余额不足，请前往钱包及时充值'
						});
						return;
					}
					const params = {
						id: this.id,
						status: '待使用'
					}
					postOrder(params).then(data => {
						if (data.errno == 200) {
							let params = {
								money: userInfo.money - this.price
							}
							appUpdInfo(params).then(data => {
								putUserInfo(data).then(data => {
									uni.showToast({
										icon: 'none',
										title: '支付成功，余额已减'
									});
									setTimeout(() => {
										uni.navigateTo({
											url: '../../orderModel/orders'
										});
									})
								}).catch(err => {})
							}).catch(err => {})
						}
					}).catch(err => {})
				} else {
					uni.showToast({
						icon: 'none',
						title: '密码错误，请重新输入'
					})
				}
			},
			goGetPwd() {
				uni.navigateTo({
					url: '../../userModel/paySetting/getPwd/getPwd'
				})
			}
		},
	}
</script>

<style>
</style>
