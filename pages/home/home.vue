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
  </view>
</template>

<script>
  import {getSwiperData} from '../../apis/home'
  export default {
    data() {
      return {
        swiperList:[]
      };
    },
    onLoad() {
      this.getSwiperList()
    },
    methods:{
      async getSwiperList(){
       const {message:res} = await getSwiperData()
       this.swiperList=res
       // console.log(res);
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
</style>
