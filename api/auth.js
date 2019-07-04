import fly from '../utils/fly.js';

// 登录接口
export function appLogin(data) {
	return fly.post('/user/userLogin', data)
}

// 注册接口
export function appRegist(data) {
	return fly.post('/user/userRegister', data)
}

// 修改个人信息
export function appUpdInfo(data) {
	return fly.post('/user/updateInfo', data)
}

// 发送验证码
export function sendMSM(data) {
	return fly.post('/SMS/sendSMS', data)
}

//通过token解析用户信息
export function getInfoByToken() {
	return fly.get('/user/getUserInfoByToken')
}

// 上传图片到图床
export function postPic(file) {
	return fly.post('https://www.sweetqianba.com/fastDfs/uploadFile', file)
}

// 通过code修改用户信息
export function appUpdUserInfoByCode(params) {
	return fly.post('/user/updateInfoBySMS', params)
}
