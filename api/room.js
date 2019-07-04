import fly from '../utils/fly.js';

export function getRoom(data) {
	return fly.post('/hotel/getInfo', data)
}

// 根据房间id获取房间信息
export function getHouseByHouseId(data) {
	return fly.post('/house/getHouseByHouseId', data)
}
