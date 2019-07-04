<template>
	<uni-password ref="secrity" @input="onInput" @confirm="onConfirm" @autoCheck="onAutoCheck">
		<text>输入新的支付密码</text>
	</uni-password>
</template>

<script>
	import uniPassword from '../../../../components/uni-password/uni-password.vue'
	import uniKeyboard from '../../../../components/uni-keyboard.vue'
	import {
		appUpdInfo,
		sendMSM
	} from '../../../../api/auth.js'
	import {
		putUserInfo
	} from '../../../../setting/putUserInfo.js'
	export default {
		components: {
			uniKeyboard,
			uniPassword
		},
		data() {
			return {
				showKeyboard: false
			}
		},
		methods: {
			onInput(e) {},
			onConfirm(e) {},
			onAutoCheck(e) {
				let password = e.password.join('')
				// 自动验证
				console.log(password)
				let params = {
					paypassword: password
				}
				appUpdInfo(params).then(data => {
					if (data.errno == 200) {
						uni.showToast({
							title: '设置成功'
						});
						putUserInfo(data).then(data => {}).catch(err => {})
						uni.navigateBack({
							delta: 1
						});
					}
				}).catch(err => {})
			}
		},
	}
</script>

<style>
</style>
