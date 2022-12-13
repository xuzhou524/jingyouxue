/**
 * @description 参数变成对象
 * @param {String} search 字符串
 * @returns
 */

const query2Dict = search => {
	const pattern = /([^?&=]+)=([^&#]*)/g
	const dict = {}

	search.replace(pattern, (rs, $1, $2) => {
		const key = $1.trim()
		const value = $2
		dict[key] = value
	})
	return dict
}

/**
 * 划分url
 * @param {url} url
 * @param {Boolean} flat 是否同级展示query
 */
const getUrlInfo = (url = "", flat = false) => {
	const [uri, ...search] = url.split("?")
	const query = search.reduce((total, current) => (total = Object.assign({}, query2Dict(current), total)), {}) || {}
	return flat
		? {
				uri,
				...query,
		  }
		: {
				uri,
				query,
		  }
}

/**
 * @Description 防抖函数
 * 防止网络慢的情况下，用户多次点击导致重复操作
 * @Author zhangyingcai
 */
const debounce = (fn, gapTime, flag) => {
	let timeout
	return function () {
		const context = this
		const args = [...arguments]

		if (timeout) clearTimeout(timeout)
		if (flag) {
			// 开始边界
			// 在 timer === null 时立即执行函数
			// 同时开启延时函数 timer = null
			if (!timeout) {
				fn.apply(context, args)
			}
			timeout = setTimeout(() => {
				timeout = null
			}, gapTime)
		} else {
			// 结束边界
			timeout = setTimeout(() => fn.apply(context, args), gapTime)
		}
	}
}

/**
 * @Description 节流函数
 *  防止网络慢的情况下，用户多次点击导致重复操作
 * @Author zhangyingcai
 */
const throttle = (fn, gapTime) => {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 1000
	}
	let _lastTime = null
	// 返回新的函数
	return function () {
		let _nowTime = +new Date()
		if (_nowTime - _lastTime > gapTime || !_lastTime) {
			fn.apply(this, arguments) //将this和参数传给原函数
			_lastTime = _nowTime
		}
	}
}

// 验证是否需要适配iphoneX 10 11 12 13
const checkTabAdapt = () => {
	const res = wx.getSystemInfoSync()
	const reg = /(iPhone(\s?X|\s?10|\s?11|\s?12|\s?13))|unknown.*/i
	const status = reg.test(res.model)
	if (status) {
		return true
	}
	return false
}
/**
 * 保留几位并向上取整
 * @param {数字}n
 * @param {保留几位}several
 * @param {四舍五入还是向上取整}flag
 */
const takeUpNumber = (n = 0, several = 0, flag = false) => {
	const fillZero = Number(1 + "0".repeat(several))
	if (flag) {
		return Math.ceil(n * fillZero) / fillZero
	} else {
		return Math.round(n * fillZero) / fillZero
	}
}

/**
 * 保留几位小数，并去掉末尾无用的0
 * @param {Number} n 数字
 * @param {Number} several 保留几位
 * @param {Boolean} noEndZero 是否无调末尾无用的0
 * @return {Number}
 */
const numberToFixed = (n = 0, several = 0, noEndZero = true) => {
	n = n * 1
	const ret = n.toFixed(several)
	if (noEndZero) {
		return parseFloat(ret)
	}
	return ret
}
/**
 * *格式化num 保留几位
 * @param {*} num
 * @param {*} precision
 * @returns
 */
const revise = (num = 0, precision = 8) => +parseFloat((+num).toPrecision(precision))

/**
 * @Description 当前数组存在并且有值
 * @param { Array } arr
 * @return { Boolean }
 */
const isArray = arr => arr && Array.isArray(arr) && arr.length > 0

/**
 * 生成UUID
 */
const generateUUID = () => {
	let d = new Date().getTime()
	const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (d + Math.random() * 16) % 16 | 0
		d = Math.floor(d / 16)
		return (c == "x" ? r : (r & 0x7) | 0x8).toString(16)
	})

	return uuid
}

/**
 * 对象、数据深拷贝
 * @param {要copy的对象} obj
 */
const deepCopy = obj => {
	if (typeof obj !== "object") return
	var newObj = obj instanceof Array ? [] : {}
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = typeof obj[key] === "object" && !!obj[key] ? deepCopy(obj[key]) : obj[key]
		}
	}
	return newObj
}

/*
 *保留指定小数
 *@num:要转换的数值
 *@dot:保留的小数位数
 */
const parseNum = (num = 0, { dot = 2, isRound = true } = {}) => {
	const m = 10 ** dot
	const n = isRound ? Math.round : Math.floor
	const k = n(parseFloat(num) * m)
	return k / m
}

/**
 * 判断小数位数
 * @param {小数位数} n
 */
const digitNumber = n => {
	return (String(n).split(".")[1] || []).length
}

/**
 * @Description 手机号、身份证号码加密
 * @param { Number } number 要转换的号码 小于7位数字的不转
 * @return { String } ‘156 **** ** 78’
 */
const encryptionNumber = (number = "") => {
	if (number.length < 7) return number
	const pre = number.slice(0, 3)
	const last = number.slice(-2)
	return `${pre}  ****  **${last}`
}

/**
 * @Description 两个数组是否全等
 * @Author xjt
 * @Date 2021/10/15 20:21:49
 * @param { Boolean }
 * @return { Boolean }
 */
function arrayIsEqual(source, target) {
	return source.length == target.length && source.every((item, index) => item == target[index])
}

/**
 * @Description比较两个对象是否相同
 * @param x {Object} 对象1
 * @param y {Object} 对象2
 * @return  {Boolean} true 为相等，false 为不等
 */
const objIsEqual = function (x, y) {
	if (x === y) {
		return true
	}
	if (!(x instanceof Object) || !(y instanceof Object)) {
		return false
	}
	if (x.constructor !== y.constructor) {
		return false
	}

	for (var p in x) {
		if (x.hasOwnProperty(p)) {
			if (!y.hasOwnProperty(p)) {
				return false
			}
			if (x[p] === y[p]) {
				continue
			}
			if (typeof x[p] !== "object") {
				return false
			}
			if (!Object.equals(x[p], y[p])) {
				return false
			}
		}
	}
	for (p in y) {
		if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
			return false
		}
	}
	return true
}

/**
 * @Description 正则校验手机号
 * @param { String } areaCode 手机号归属地
 * @param { String } phoneNumber 手机号
 * @return { Boolean } 手机号是否合规
 */
const regCheckMobile = (areaCode, phoneNumber) => {
	if (!phoneNumber) return false
	const reg = areaCode == "86" ? /^1\d{10}$/ : /\d/
	return reg.test(phoneNumber)
}

/**
 * @description 校验对象是否为空
 * @param {Object} obj 
 * @returns {Boolean} true|false
 */
const isObjEmpty = (obj) => {
	if(obj && typeof obj === "object" && Object.keys(obj).length) {
    return true
	}
	return false
}

export {
	getUrlInfo,
	throttle,
	debounce,
	checkTabAdapt,
	takeUpNumber,
	numberToFixed,
	revise,
	isArray,
	generateUUID,
	deepCopy,
	parseNum,
	digitNumber,
	encryptionNumber,
	arrayIsEqual,
	objIsEqual,
	regCheckMobile,
	isObjEmpty,
	query2Dict
}
