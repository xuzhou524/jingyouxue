<template>
	<view class="pb-52">
		<view class="d-flex flex-col ml-22 mr-22 mt-22 border-radius-22 pt-22 pl-22 pb-22 pr-22"
			style="background-color: #FFFFFF;">
			<map style="width: 100%; height: 600rpx;" scale=17  :latitude="schooldetail.latitude" :longitude="schooldetail.longitude" :markers="covers">
			</map>
		</view>
		<view class="d-flex flex-col ml-22 mr-22 mt-22 border-radius-22 pt-22 pl-22 pb-22 pr-22"
			style="background-color: #FFFFFF;">
			<view class="d-flex">
				<image class="mr-22" style="width: 150rpx; height: 150rpx;border-radius: 10rpx;"
					:src="schooldetail.logo ? schooldetail.logo : '/static/school/defaultLogin.png'"></image>
				<view class="d-flex flex-col j-sb py-10" style="width: 490rpx;">
					<view class="font-30 title-color">
						{{ schooldetail.name }}
					</view>
					<view class="font-22 title-color-9">
						{{ schooldetail.referrName }}
					</view>
				</view>
			</view>
			<view class="d-flex font-22 mt-22">
				<view style="padding: 5rpx 15rpx;background-color: #D2F4D2;border-radius: 10rpx;color: #00B07C;">
					{{ schooldetail.nature == 1 ? '公办' : '民办' }}
				</view>
				<view v-if="schooldetail.characteristics == 1" class="theme-color ml-22"
					style="padding: 5rpx 15rpx;background-color: #FBECEE;border-radius: 10rpx;">普惠</view>
			</view>
		</view>
		<view class="d-flex flex-col j-center ml-22 mr-22 mt-22 border-radius-22 pt-22 pl-22 pb-22 pr-22"
			style="background-color: #FFFFFF;">
			<text class="font-medium" style="font-size: 30rpx;">学校地址</text>
			<view class="d-flex j-sb a-center">
				<view class="d-flex flex-col mt-22 mr-22" style="font-size: 26rpx;flex-shrink: 0;">
					<text style="line-height: 50rpx;">
						{{ schooldetail.city + schooldetail.county + schooldetail.address }}
					</text>
					<text v-if="schooldetail.distance > 1000" style="color: #666666;">
						距离您{{ schooldetail.distance / 1000 }}km
					</text>
					<text v-else style="color: #666666;">
						距离您{{ schooldetail.distance }}m
					</text>
				</view>
				<view class="d-flex flex-col a-center flex-1" @click="goCall">
					<image style="width: 40rpx; height: 40rpx;" src="/static/school/phone.png"></image>
					<text style="font-size: 24rpx;color: #666666;margin-top: 5rpx;">电话</text>
				</view>
			</view>
		</view>
		<view class="d-flex flex-col ml-22 mr-22 mt-22 border-radius-22 pt-22 pl-22 pb-22 pr-22"
			style="background-color: #FFFFFF;">
			<text class="font-medium" style="font-size: 30rpx;">学校费用</text>
			<view class="mt-22" style="font-size: 26rpx;white-space:pre-wrap;line-height: 50rpx;">
				{{ schooldetail.fees || '暂无' }}
			</view>
		</view>
		<view class="d-flex flex-col ml-22 mr-22 mt-22 border-radius-22 pt-22 pl-22 pb-22 pr-22"
			style="background-color: #FFFFFF;">
			<text class="font-medium" style="font-size: 30rpx;">学校简介</text>
			<view class="mt-22" style="font-size: 26rpx;white-space:pre-wrap;line-height: 50rpx;">
				{{ schooldetail.profile }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schooldetail: {},
				covers: [],
			}
		},
		onLoad() {
			this.schooldetail = getApp().globalData.schoolDetailInfo || {}
			getApp().globalData.schoolDetailInfo = undefined
			let coverItem = {
				id:1,
				latitude:this.schooldetail.latitude,
				longitude:this.schooldetail.longitude,
				width:50,
				height:50,
				iconPath: '/static/school/schoolLocation.png'
			}
			this.covers.push(coverItem)
		},
		methods: {
			goCall() {
				uni.makePhoneCall({
					phoneNumber: this.schooldetail.contact
				})
			}
		}
	}
</script>

<style>

</style>
