import fly from '../utils/fly.js';

/* 登录接口 */
export function appLogin(payload) {
	console.log(JSON.stringify(payload))
	return fly.post('/user/app/login', payload)
}
