export const leftModel = {
	loginMenu: [{
		id: 0,
		name: "钱包",
		icon: "pay",
		methods: "goWallet"
	}, {
		id: 1,
		name: "订单",
		icon: "form",
		methods: "goOrders"
	}, {
		id: 2,
		name: "设置",
		icon: "settings",
		methods: "goSetting"
	}, {
		id: 3,
		name: "退出登录",
		icon: "refresharrow",
		methods: "logout"
	}],
	noLoginMenu: [{
		id: 0,
		name: "登录",
		icon: "people",
		methods: "login"
	}]
}

// #ifdef APP-PLUS
const swiperHotel = 'https://www.sweetqianba.com/group1/M00/00/01/rBsAEV0bXS2AfJ_tAADZzRSpPws625.jpg',
	swiperWM = 'https://www.sweetqianba.com/group1/M00/00/01/rBsAEV0bXVSAJvXZAAEBP4lQ7hg427.jpg',
	swiperFood = 'https://www.sweetqianba.com/group1/M00/00/01/rBsAEV0bXXGAMLFgAAC8-H3ZcbU376.jpg',
	swiperMovie = 'https://www.sweetqianba.com/group1/M00/00/01/rBsAEV0bXYKAO0T4AAC27JYEF4I194.jpg'
// #endif
// #ifdef MP
const swiperHotel = 'https://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg',
	swiperWM = 'https://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
	swiperFood = 'https://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
	swiperMovie = 'https://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg'
// #endif
export const mainIcon = {
	iconList: [{
		icon: 'homefill',
		color: 'red',
		badge: 120,
		name: '民宿',
		methods:'goHotel'
	}, {
		icon: 'countdownfill',
		color: 'orange',
		badge: 1,
		name: '钟点房',
		methods:'goHotel'
	}, {
		icon: 'tagfill',
		color: 'yellow',
		badge: 0,
		name: '特惠酒店',
		methods:'goHotel'
	}, {
		icon: 'cardboardfill',
		color: 'olive',
		badge: 22,
		name: '电影',
		methods:'goMovie'
	}, {
		icon: 'noticefill',
		color: 'cyan',
		badge: 0,
		name: '提醒',
		methods:'goNoise'
	}, {
		icon: 'markfill',
		color: 'blue',
		badge: 0,
		name: '评价',
		methods:'goEvaluate'
	}, {
		icon: 'upstagefill',
		color: 'purple',
		badge: 0,
		name: '排行',
		methods:'goTop'
	}, {
		icon: 'questionfill',
		color: 'mauve',
		badge: 0,
		name: '帮助',
		methods:'goHelp'
	}],
	swiper: [{
			id: 0,
			img: swiperHotel
		},
		{
			id: 1,
			img: swiperWM
		},
		{
			id: 2,
			img: swiperFood
		},
		{
			id: 3,
			img: swiperMovie
		},
	],
}
