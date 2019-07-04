<template>
	<view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="showPicModal">
				<view class='content flex justify-between' style="margin: 10upx 0;">
					<text class='text-black' style="line-height: 48px;">头像</text>
					<view class="cu-avatar lg round" :style="{backgroundImage:'url('+(userInfo.pic||'')+')'}"></view>
				</view>
			</view>
			<view class="cu-item arrow" @tap="showAccountModal">
				<view class='content flex justify-between'>
					<text class='text-black'>昵称</text>
					<text class='text-black'>{{userInfo.account||'暂无'}}</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class='content flex justify-between'>
					<text class='text-black'>生日</text>
					<text class='text-black'>未设置</text>
				</view>
			</view>
		</view>
		<!-- 昵称弹出框 -->
		<view class="cu-modal bottom-modal" :class="accountStatus?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class='action text-green' @tap="submitAccount">确定</view>
					<view class='action text-blue' @tap='hideAccountModal'>取消</view>
				</view>
				<view class='padding-xl'>
					<input type="text" v-model="userInfo.account" />
				</view>
			</view>
		</view>
		<!-- 头像弹出框 -->
		<view class="cu-modal bottom-modal" :class="picStatus?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class='action text-green' @tap="submitPic">确定</view>
					<view class='action text-blue' @tap='hidePicModal'>取消</view>
				</view>
				<view class='padding-xl'>
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
</template>

<script>
	import {
		postPic,
		appUpdInfo,
		getInfoByToken
	} from '../../../api/auth.js'
	import {
		putUserInfo
	} from '../../../setting/putUserInfo.js'
	export default {
		data() {
			return {
				userInfo: {
					pic: null
				},
				accountStatus: false,
				picStatus: false,
				files: [],
			}
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo');
			this.userInfo = userInfo;
			console.log(JSON.stringify(this.userInfo))
		},
		methods: {
			hideAccountModal() {
				this.accountStatus = false
			},
			showAccountModal() {
				this.accountStatus = true
			},
			submitAccount() {
				if (!this.userInfo.account) {
					uni.showToast({
						icon: 'none',
						title: '请先输入昵称'
					})
					return;
				}
				let info = {
					account: this.userInfo.account
				}
				appUpdInfo(info).then(data => {
					// 修改信息关键部分
					putUserInfo(data).then(data => {
						uni.showToast({
							icon: 'none',
							title: '修改成功'
						});
					}).catch(err => {})
				}).catch(err => {})
			},
			hidePicModal() {
				this.picStatus = false
			},
			showPicModal() {
				this.picStatus = true
			},
			/* 上传图片 */
			uploadImg(file) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: "https://www.sweetqianba.com/fastDfs/uploadFile",
						filePath: file,
						name: 'file',
						success(res) {
							this.userInfo = uni.getStorageSync('userInfo');
							this.userInfo.pic = 'https://' + JSON.parse(res.data).URL;
							console.log(JSON.parse(res.data).URL)
							resolve(res.data)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			submitPic() {
				this.uploadImg(this.files[0]).then(data => {
					data = JSON.parse(data)
					if (data.success === '上传成功') {
						uni.showToast({
							icon: 'none',
							title: '上传成功'
						})
						let info = {
							pic: 'https://' + data.URL
						}
						appUpdInfo(info).then(data => {
							// 修改信息关键部分
							putUserInfo(data).then(data => {
								this.accountStatus = false;
								this.picStatus = false;
							}).catch(err => {})
						}).catch(err => {})
					}
				}).catch(err => {})

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
		}
	}
</script>

<style>
</style>
