<template>
  <!-- 解决商品价格闪烁的问题 -->
  <view v-if="goodsInfo.goods_name" class="goods-info-container">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <view class="goods-info-box">
      <view class="price">￥{{goodsInfo.goods_price}}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{goodsInfo.goods_name}}</view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">快递：免运费</view>
    </view>
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options"
      :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {getGoodsDetailAPI} from '../../apis/goods.js'
  export default {
    data() {
      return {
        goodsInfo:{},
        options: [{
        			icon: 'shop',
        			text: '店铺',
        		}, {
        			icon: 'cart',
        			text: '购物车',
        			info: 2
        		}],
        	    buttonGroup: [{
        	      text: '加入购物车',
        	      backgroundColor: '#ff0000',
        	      color: '#fff'
        	    },
        	    {
        	      text: '立即购买',
        	      backgroundColor: '#ffa200',
        	      color: '#fff'
        	    }
        	    ]
      };
    },
    onLoad(optains) {
      const goods_id = optains.goods_id
      this.getGoodsDetail(goods_id)
      
    },
    methods:{
      async getGoodsDetail(id){
        const {message:res} = await getGoodsDetailAPI(id)
        // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
        // 解决 .webp 格式图片在 ios 设备上无法正常显示的问题
        res.goods_introduce= res.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/.webp/g, '.jpg')
        this.goodsInfo = res
      },
      // 轮播图预览
      preview(i){
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current:i,
          // 所有图片 url 地址的数组
          urls:this.goodsInfo.pics.map(x => x.pics_big)
        })
      },
      onClick (e) {
        if(e.content.text === '购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  swiper{
    height: 750rpx;
    image{
      width: 100%;
      height: 100%;
    }
  }
  .goods-info-box{
    padding: 10px ;
    .price{
      margin: 10px 0;
      color: #c00000;
      font-size: 18px;
    }
    .goods-info-body{
      display: flex;
      justify-content: space-between;
      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }
      .favi{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 120px;
        font-size: 12px;
        border-left: 1px solid #efefef;
        color: gray;
      }    }
    .yf{
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .goods-info-container{
    padding-bottom: 50px;
  }
</style>
