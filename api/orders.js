import fly from '../utils/fly.js';

// 新增订单
export function addOrder(params) {
	return fly.post('/order/addOrder', params)
}
// 修改订单
export function postOrder(params) {
	return fly.post('/order/updateOrderStatus', params)
}

//根据状态获取订单信息
export function getOrderInfoByStatus(params) {
	return fly.get('/order/getOrderInfoByStatus', params)
}

// 根据orderId获取order信息
export function getOrderInfo(params) {
	return fly.get('/order/getOrderInfo', params)
}

// 删除订单
export function deleteOrder(params) {
	return fly.get('/order/deleteOrder', params)
}
