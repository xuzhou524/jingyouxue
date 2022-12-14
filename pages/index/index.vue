<template>
	<view class="pb-52">
		<view v-for="item in schoolList" :key="item.id">
			<view class="d-flex ml-22 mr-22 mt-22 border-radius-22 pt-22 pl-22 pb-22 pr-22" style="background-color: #FFFFFF;" @click="goDetail(item)">
				<image class="mr-22" style="width: 150rpx; height: 150rpx;border-radius: 10rpx;" :src="item.logo ? item.logo : '/static/school/defaultLogin.png'"></image>
				<view class="d-flex flex-col j-sb" style="width: 490rpx;">
					<view class="font-30 title-color truncate">
						{{ item.name }}
					</view>
					<view class="d-flex font-22">
						<view style="padding: 5rpx 15rpx;background-color: #D2F4D2;color: #00B07C;border-radius: 10rpx;">{{ item.nature == 1 ? '公办' : '民办' }}</view>
						<view v-if="item.characteristics == 1" class="theme-color ml-22" style="padding: 5rpx 15rpx;background-color: #FBECEE;border-radius: 10rpx;">普惠</view>
					</view>
					<view class="d-flex j-sb font-22 title-color-9">
						<text class="truncate" style="width: 300rpx;">
							{{ item.address }}
						</text>
						<text v-if="item.distance > 1000">
							距离您{{ item.distance / 1000 }}km
						</text>
						<text v-else>
							距离您{{ item.distance }}m
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const school = uniCloud.importObject('school') //第一步导入云对象
	export default {
		data() {
			return {
				schoolList: [],
				location:{},
			}
		},
		onLoad() {
			const self = this
			uni.getLocation({
				type: 'gcj02',
				success(res) {
					self.location = res
					self.getDistance()
				},
				fail: function (res) {
					console.log(res)
				}
			});
			this.addTodo()
		},
		onPullDownRefresh() {
			this.addTodo()
		},
		methods: {
			async addTodo () {
				try {
					// const res = await school.addSchool() //导入云对象后就可以直接调用该对象的方法了，注意使用异步await
					// uni.showToast({
					// 	title: '创建成功'
					// })
					
					const res = await school.getSchool()
					console.log(res)
					this.schoolList = [...res.data]
					this.getDistance()
				} catch (e) {
					// 符合uniCloud响应体规范 https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=resformat，自动抛出此错误 
					uni.showModal({
						title: '创建失败',
						content: e.errMsg,
						showCancel: false
					})
				} finally{
					uni.stopPullDownRefresh()
				}
			},
			getDistance(){
				this.schoolList.forEach((item) => {
					item.distance = this.$getDistance(this.location, item)
				});
			},
			goDetail(item){
				getApp().globalData.schoolDetailInfo = item
				uni.navigateTo({
					url:'/pages/detail/index'
				})
			}
		}
	}
</script>

<style>
</style>
