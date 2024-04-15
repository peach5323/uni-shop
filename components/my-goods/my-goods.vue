<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image class="goods-pic" :src="goods.goods_small_logo || defaultPic" mode=""></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{goods.goods_price.toFixed(2)}}</view>
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
        
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      },
      // 是否展示图片左侧的 radio
      showRadio:{
        type: Boolean,
        default:false
      },
      // 是否展示价格右侧的 NumberBox 组件
      showNum:{
        type: Boolean,
        default:false
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic:
        'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods:{
      radioClickHandler(){
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      numberChangeHandler(val){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:+val
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  width: 750rpx;
  box-sizing: border-box;
  .goods-item-left{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 5px;
    .goods-pic{
      display: block;
      width: 100px;
      height: 100px;
    }
  }
  .goods-item-right{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .goods-price{
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>