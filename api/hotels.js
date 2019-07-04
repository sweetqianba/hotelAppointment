import fly from '../utils/fly.js';

// 通过地区、价格、星级、时间获取所有的酒店信息(通过地区、时间获取所有的小时房)
export function appGetHotels(params) {
	params.lng = '114.497704';
	params.lat = '36.570916';
	return fly.post('/hotel/getAllHotels', params)
}
// 通过地区、时间、价格、人数检索民宿
export function appGetMS(params) {
	params.lng = '114.497704';
	params.lat = '36.570916';
	return fly.post('/hotel/getAllMS', params)
}
// 根据token获取我喜欢的酒店
export function appGetHotelsByToken(params) {
	params.lng = '114.497704';
	params.lat = '36.570916';
	return fly.post('/user/getLoveHotels', params)
}

// 随机获取酒店信息
export function appGetRandomHotels(params) {
	params.lng = '114.497704';
	params.lat = '36.570916';
	return fly.post('/hotel/getPlainHotels', params)
}

// 根据酒店名称查询
export function getHotelInfoByHotelName(params) {
	params.lng = '114.497704';
	params.lat = '36.570916';
	return fly.post('/hotel/getHotelInfoByHotelName', params)
}
