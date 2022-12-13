'use strict';

const db = uniCloud.database()
const uniID = require('uni-id')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	// context.APPID = ''
	// context.LOCALE = 'zh-Hans'
	// uniID.cr
	
	
	//返回数据给客户端
	return event
};
