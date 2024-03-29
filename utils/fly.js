var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
fly.config.timeout = 10000
fly.config.baseURL = 'https://www.yufly.club:8443/classDesignAPP'
//添加请求拦截器
fly.interceptors.request.use(request => {
	//给所有请求添加自定义header
	const token = uni.getStorageSync('token')
	if (token) {
		request.headers['token'] = token
	}
	//可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
	return request
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
	response => {
		//只将请求结果的data字段返回
		return response.data
	},
	err => {
		//发生网络错误后会走到这里
	}
)

export default fly
