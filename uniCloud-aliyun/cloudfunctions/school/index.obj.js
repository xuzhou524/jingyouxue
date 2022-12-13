// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129

const db = uniCloud.database()

module.exports = {
	_before: function() { // 通用预处理器

	},
	async addSchool() {
		try {
			await db.collection('school').add({
				id:100000,
				province: '北京',
				provinceCode: '110000',
				city: '北京市',
				cityCode: '110000',
				county: '房山区',
				countyCode: '110111',
				street: '',
				address: '北京市房山区长阳镇怡和北路4号院',
				longitude: 116.22329,
				latitude: 39.76640,

				logo: '',
				name: '房山区伽悦然幼儿园',
				referrName: '伽悦然幼儿园',
				group: '',

				department: '集体',
				nature: '民办',
				characteristics: 1,

				contact: '15810858086',
				fees: '98000',
				otherFees: '0',
			})
		} catch (e) {
			console.log(e);
		}
		// title = title.trim()
		// content = content.trim()
		// if (!title || !content) {
		// 	return {
		// 		errCode: 'INVALID_TODO',
		// 		errMsg: 'TODO标题或内容不可为空'
		// 	}
		// }
		// // ...其他逻辑
		// return {
		// 	errCode: 0,
		// 	errMsg: '创建成功'
		// }
	},
	async getSchool() {
		try {
			let data =  await db.collection('school').get()
			return data
		} catch (e) {
			console.log(e);
		}
	}
}
