<template>
	<view style="height: 100%;">
		<map id="myMap" style="width: 100%; height: 100%;" :controls="controls" :markers="covers" :polyline="polyline"
		 :circles="circles" :show-location="true" @markertap="markerEvent" @controltap="controlEvent" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map: null, //初始化map
				locationState: true, //显示当前定位点
				covers: [{
					id: 1,
					latitude: null,
					longitude: null,
					title: "当前位置",
					iconPath: 'https://132.232.44.105/group1/M00/00/01/rBsAEV0bXkCABzI3AAAOcflxlPs726.png',
					width: 30,
					height: 30,
				}], //marker
				controls: [{
						id: 1,
						position: {
							left: 10,
							top: 50,
							width: 40,
							height: 40
						},
						iconPath: 'https://132.232.44.105/group1/M00/00/01/rBsAEV0bXmmAAIiIAAAJAacwO1M690.png',
						clickable: true
					},
					{
						id: 2,
						position: {
							left: 10,
							top: 110,
							width: 40,
							height: 40
						},
						iconPath: 'https://132.232.44.105/group1/M00/00/01/rBsAEV0bXn2AeHBtAAAU4pJpMac386.png',
						clickable: true
					},
					{
						id: 3,
						position: {
							left: 10,
							top: 170,
							width: 40,
							height: 40
						},
						iconPath: 'https://132.232.44.105/group1/M00/00/01/rBsAEV0bXpSAPguvAAAEX1a-8Aw315.png',
						clickable: true
					}
				], //controls
				polyline: [{
					points: [],
					color: '#8A2BE288',
					width: "10",
					dottedLine: false,
					arrowLine: true,
				}], //画线
				marker: null, //选中的markerid
				height: {
					height: null
				}, //初始化已接订单容器的高度
				latitude: null,
				longitude: null,
				name: null,
			}
		},
		onShow() {
			setTimeout(() => {
				/* 创建地图对象 */
				this.map = uni.createMapContext('myMap');
			}, 0)
			setTimeout(() => {
				/* 将中心调到当前点（当前定位） */
				this.map.moveToLocation()
			}, 200)
			setTimeout(() => {
				/* 获取当前点的坐标并加marker */
				this.getCurrentLocation()
			}, 400)
		},
		onLoad(data) {
			this.latitude = data.lat;
			this.longitude = data.lng;
			this.name = data.name
			uni.setNavigationBarTitle({
				title: this.name
			});
		},
		methods: {
			/* 点击marker进行操作，进行当前位置和点击位置的连线 */
			markerEvent(e) {
				this.marker = e.target.markerId;
				this.polyline[0].points = [];
				this.polyline[0].points.push({
					latitude: this.covers[0].latitude,
					longitude: this.covers[0].longitude
				});
				this.polyline[0].points.push({
					latitude: this.covers[e.target.markerId - 1].latitude,
					longitude: this.covers[e.target.markerId - 1].longitude
				})
			},
			/* control点击事件 */
			controlEvent(e) {
				var id = e.mp.controlId;
				switch (id) {
					case 1:
						/* 第一个control */
						this.map.moveToLocation()
						break;
					case 2:
						/* 第二个control */
						this.getCurrentLocation();
						setTimeout(() => {
							if (this.polyline[0].points) {
								this.polyline[0].points[0].latitude = this.covers[0].latitude;
								this.polyline[0].points[0].longitude = this.covers[0].longitude;
							}
						}, 300)
						break;
					case 3:
						this.navigation();
						break;
					default:
						break;
				}
			},
			/* 获取当前位置 */
			getCurrentLocation() {
				uni.getLocation({
					type: 'gcj02', //获取的位置准确
					success: (res) => {
						this.covers[0].latitude = res.latitude;
						this.covers[0].longitude = res.longitude;
					}
				});
			},
			/* 导航 */
			navigation() {
				uni.openLocation({
					latitude: Number(this.latitude),
					longitude: Number(this.longitude),
					name: this.name,
					address: this.name,
					success: function() {}
				})
			},
			/* 去重函数（去除相同经纬度的数据） */
			removeSame(data) {
				let array = [];
				for (let j = 0; j < data.length; j++) {
					let status = true;
					for (let i = 0; i < array.length; i++) {
						if (data[j].businessId.position.longitude === array[i].longitude && data[j].businessId.position.latitude ===
							array[i].latitude) {
							status = false;
						}
					}
					if (status) {
						array.push(data[j].businessId.position)
					}
				}
				return array
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
</style>
