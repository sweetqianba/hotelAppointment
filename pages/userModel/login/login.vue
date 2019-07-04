<template>
	<view class="content">
		<view class="input-group">
			<view class="cu-form-group">
				<view class='title'>手机号：</view>
				<input type="number" placeholder="请输入正确的手机号" class='radius' name='input' v-model="account"></input>
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
				<view class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码：</view>
				<input type="password" v-model="password" placeholder="密码" class='radius' name='input'></input>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class='cu-btn bg-blue lg' @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd/pwd">忘记密码</navigator>
		</view>
	</view>
</template>

<script>
	const regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
		img = 'https://www.sweetqianba.com/group1/M00/00/00/rBsAEV0R21WAb6opAABD7xXMsJ4183.png';
	import {
		appLogin,
		getInfoByToken
	} from '../../../api/auth.js'
	import {
		putUserInfo
	} from '../../../setting/putUserInfo.js'
	export default {
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			}
		},
		methods: {
			initPosition() {
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				if (!regex.test(this.account)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				const loginData = {
					telephone: this.account,
					password: this.password
				}
				appLogin(loginData).then(data => {
					if (data.errno == 200) {
						if (data.data) {
							putUserInfo(data).then(data => {}).catch(err => {})
						}
						uni.switchTab({
							url: '../../main/main',
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: `登录失败，${data.errmsg}`
						});
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: `登录失败，${err}`
					});
				})
			}
		},
		onReady() {
			this.initPosition();
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
