export const orders = {
	tabBar: [{
		id: 0,
		name: '全部'
	}, {
		id: 1,
		name: '待付款'
	}, {
		id: 2,
		name: '待使用'
	}, {
		id: 3,
		name: '待评价'
	}, {
		id: 4,
		name: '退款/售后'
	},{
		id: 5,
		name: '已完成'
	}]
}

export const orderDetails = {
	totalData: [{ //最上面的
		id: 0,
		name: '在线支付',
		field: 'price'
	}, {
		id: 1,
		name: '发票报销',
		result: '如需发票，请先与酒店确认可开'
	}],
	bookData: [{ //预订信息
		id: 0,
		name: '时间',
		field: 'time'
	}, {
		id: 1,
		name: '房间数',
		field: 'number'
	}, {
		id: 2,
		name: '联系手机',
		field: 'phone'
	}],
	orderData: [{ //订单信息
		id: 0,
		name: '订单号',
		field: 'id'
	}, {
		id: 1,
		name: '支付时间',
		field: 'time'
	}, {
		id: 2,
		name: '数量',
		field: 'number'
	}, {
		id: 3,
		name: '房费',
		field: 'price'
	}, {
		id: 4,
		name: '押金',
		result: '100'
	}, {
		id: 5,
		name: '支付金额',
		field: 'price'
	}, {
		id: 6,
		name: '退还押金',
		result: '100'
	}]
}
