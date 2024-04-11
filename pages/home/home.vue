<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`" class="swiper-item">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view v-for="(item,i) in navList" :key="i" class="nav-item" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <view class="floor-list">
      <view class="floot-item" v-for="(item,i) in floorList" :key="i">
        <image class="floot-title" :src="item.floor_title.image_src"></image>
        <view class="floor-products">
          <navigator class="left-img" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="right-img">
            <navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
  import {getSwiperData,getNavData,getFloorData} from '../../apis/home'
  export default {
    data() {
      return {
        swiperList:[],
        navList:[],
        floorList:[]
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      async getSwiperList(){
       const {message:res} = await getSwiperData()
       this.swiperList = res
      },
      async getNavList(){
       const {message:res} = await getNavData()
       this.navList = res
      },
      async getFloorList(){
       const {message:res} = await getFloorData()
       // 处理数据
       res.forEach(item=>{
         item.product_list.forEach(i=>{
          i.url = '/subpkg/goods_list/goods_list?'+i.navigator_url.split('?')[1]
         })
       })
       this.floorList = res
      },
      navClickHandler(item){
        if(item.name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item,
  image{
    width: 100%;
    height: 100%;
  }
}
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;
  .nav-img{
    width: 128rpx;
    height: 140rpx;
  }
}
.floot-title{
  height: 60rpx;
  width: 100%;
}
.floor-products{
  display: flex;
  .left-img{
    padding-left: 10rpx;
  }
  .right-img{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
