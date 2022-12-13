/**
 * @desc 根据两点经纬度获取距离
 */
export function getDistance(item1, item2) {
	let lat1 = item1.latitude || 0;
	let lng1 = item1.longitude || 0;
	let lat2 = item2.latitude || 0;
	let lng2 = item2.longitude || 0;

	var rad1 = lat1 * Math.PI / 180.0;
	var rad2 = lat2 * Math.PI / 180.0;
	var a = rad1 - rad2;
	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	var r = 6378137;
	var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math
		.pow(Math.sin(b / 2), 2)));
	return Math.trunc(distance);
}
