<template>
	<view class="box">
		<view class="box__header">
			<slot></slot>
		</view>
		<view class="box__body">
			<view class="password-box">
				<view class="password-item" @tap="show">
					<view class="password-item-char" v-for="i in items" :key="i">
						<view class="password-item-char__dot" v-if="password[i] || password[i] === 0"></view>
					</view>
				</view>
			</view>
		</view>
		<view :class="'keyboard ' + pattern">
			<ul class="number">
				<li class="button" @tap="input(item)" v-for="item in keys" :key="item">{{item}}</li>
				<li class="button">.</li>
				<li class="button down" @tap="hide"></li>
			</ul>
			<view class="action">
				<view class="delete" @tap="del"></view>
				<view class="ok" @tap="done"></view>
			</view>
		</view>
	</view>
</template>

<script>
	const keys = () => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	};

	import uniIcon from '@/components/i-icon/i-icon.vue'

	export default {
		props: {
			defaultPassword: String
		},
		components: {
			uniIcon
		},
		data() {
			return {
				items: [0, 1, 2, 3, 4, 5],
				password: [],
				keys: keys(),
				pattern: 'hidden'
			};
		},
		methods: {
			show() {
				let args = {
					cancel: false
				};
				this.$emit('shown', args);
				if (!args.cancel) {
					this.pattern = 'slideup';
				}
			},
			hide() {
				let args = {
					cancel: false
				};
				this.$emit('hidden', args);
				if (!args.cancel) {
					this.pattern = 'slidedown';
				}
			},
			input(item) {
				let args = {
					// target: this,
					data: item,
					cancel: false,
					callback: undefined
				};
				// console.log('s');
				this.$emit('input', args);
				if (!args.cancel) {
					//启动矫正
					if (this.password.length === this.items.length) {
						return;
					}
					this.password.push(item);
					// 启动自动验证
					if (this.password.length === this.items.length) {
						// console.log('启动自动验证')
						//长度达6位，自动验证
						this.$emit('autoCheck', {
							password: this.password
						})
					}
					if (args.callback && typeof args.callback === 'function') {
						args.callback.call(this);
					}
				}
			},
			del() {
				let args = {
					cancel: false
				};
				this.$emit('delete', args);
				if (!args.cancel) {
					if (this.password.length > 0) {
						this.password = this.password.slice(0, this.password.length - 1);
					}
				}
			},
			done() {
				if (this.password.length !== this.items.length) return;

				this.$emit('confirm', {
					// target: this,
					value: this.password.join('')
				});
			}
		},
		watch: {
			defaultPassword: {
				immediate: true,
				handler(val) {
					if (val && val.length === 6) {
						this.password = val.split('').map(Number);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './uni-password.scss';

	view {
		line-height: 90upx
	}
</style>
