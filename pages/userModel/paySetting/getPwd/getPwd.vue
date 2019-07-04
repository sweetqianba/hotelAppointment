<template>
	<view class="content">
		<view class="cu-form-group">
			<view class='title'>手机号：</view>
			<input placeholder="请输入正确的手机号" class='radius' name='input' v-model="account"></input>
			<view class="cu-capsule radius">
				<view class='cu-tag bg-blue '>
					+86
				</view>
				<view class="cu-tag line-blue">
					中国大陆
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class='title'>验证码：</view>
			<input placeholder="验证码" class='radius' name='input' v-model="code"></input>
			<button class='cu-btn bg-green shadow' @tap="sendCode">{{codeStatus?num:'验证码'}}</button>
		</view>
		<view class="cu-form-group">
			<view class="title">新密码：</view>
			<input type="password" class="radius" style="z-index: 1;position: absolute;left: 175upx;" v-model="password"
			 placeholder="支付密码" name='input'></input>
			<input type="number" class="radius" style="z-index: 10;position: absolute;left: 175upx;opacity: 0;" v-model="password"></input>
		</view>
		<view class="padding flex flex-direction">
			<button class='cu-btn bg-blue lg' @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	const regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
	import {
		appUpdUserInfoByCode,
		sendMSM
	} from '../../../../api/auth.js'
	import {
		putUserInfo
	} from '../../../../setting/putUserInfo.js'
	export default {
		data() {
			return {
				account: null, //用户名
				password: null, //密码
				code: null, //验证码
				codeStatus: false, //验证码发送状态，默认为不发送，即允许发送
				num: null, //秒数
			}
		},
		methods: {
			register() {
				if (!regex.test(this.account)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				if (!this.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (this.password.length !== 6 && typeof this.password === 'number') {
					uni.showToast({
						icon: 'none',
						title: '支付密码为 6 个数字'
					});
					return;
				}
				const updData = {
					paypassword: this.password,
					code: this.code
				}
				appUpdUserInfoByCode(updData).then(data => {
					if (data.errno == 200) {
						uni.showToast({
							title: '修改成功'
						});
						putUserInfo(data).then(data => {
							uni.navigateBack({
								delta: 1
							});
						}).catch(err => {})
						uni.navigateBack({
							delta: 1
						});
					}
				}).catch(err => {})
			},
			sendCode() {
				if (!this.codeStatus) {
					//默认给60秒
					this.num = 60;
					this.codeStatus = true;
					sendMSM({
						telephone: this.account,
						need: 'isExist'
					}).then(data => {
						if (data.errno == 200) {
							uni.showToast({
								icon: 'none',
								title: '发送成功，注意查收'
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: `发送失败,${data.errmsg}`
							})
						}
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: `发送失败,${err}`
						})
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请耐心等待'
					});
				}
			}
		},
		watch: {
			num(newVal, oldVal) {
				if (newVal === 0) {
					this.codeStatus = false;
					return;
				}
				setTimeout(() => {
					this.num--;
				}, 1000)
			}
		}
	}
</script>

<style>
</style>
