import {
	getInfoByToken
} from 'api/auth.js'
export function putUserInfo(data) {
	const img = 'https://www.sweetqianba.com/group1/M00/00/00/rBsAEV0R21WAb6opAABD7xXMsJ4183.png';
	uni.setStorageSync('token', data.data)
	return new Promise((resolve, reject) => {
		getInfoByToken().then(data => {
			if (!data.data.pic) {
				data.data.pic = img
			}
			uni.setStorageSync('userInfo', data.data)
			if (data.errno == 200) {
				resolve({
					errno: 200,
					errmsg: data.errmsg
				})
			} else {
				resolve({
					errno: 201,
					errmsg: data.errmsg
				})
			}
		}).catch(err => {
			reject({
				errno: 500,
				errmsg: '修改失败'
			})
		})
	})
}
