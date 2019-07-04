import fly from '../utils/fly.js';

// 新增评价
export function addEvaluate(data) {
	return fly.post('/evaluate/addEvaluate', data)
}

// 根据token获取评价
export function getEvaluatesByUid() {
	return fly.get('/evaluate/getEvaluatesByUid')
}

// 根据不同的type获取不同的评价
export function getAllEvaluates(data) {
	return fly.get('/evaluate/getAllEvaluates', data)
}
