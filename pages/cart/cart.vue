<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
    <view class="cart-titel">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-titel-text">购物车</text>
    </view>
    <uni-swipe-action ref="swipeAction">
      <block v-for="(item,i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler($event,item,i)">
          <my-goods :goods="item" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle ></my-settle>
  </view>
  <!-- 空白购物车的区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        options:[{
            text:'删除',
            style:{
              backgroundColor:'#c00000'
            }
          }]
      };
    },
    computed:{
      ...mapState('m_cart',['cart']),
    },
    methods:{
      ...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
      radioChangeHandler(e){
        this.updateGoodsState(e)
      },
      numChangeHandler(e){
        this.updateGoodsCount(e)
      },
      swipeActionClickHandler(e,item,index){
        let {content} = e
        if (content.text === '删除') {
        	uni.showModal({
        		title: '提示',
        		content: '是否删除',
        		success: res => {
        			if (res.confirm) {
                this.removeGoodsById(item.goods_id)
        			} else if (res.cancel) {
        				console.log('用户点击取消');
        			}
        		}
        	});
        }
      }
    }
  }
</script>

<style lang="scss">
.cart-titel{
  display: flex;
  align-items: center;
  padding-left: 5px;
  height: 40px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  .cart-titel-text{
    margin-left: 10px;
  }
}
.cart-container{
  padding-bottom: 50px;
}
.empty-cart{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-img{
    width: 90px;
    height: 90px;
  }
  .tip-text{
    margin-top: 15px;
    font-size: 14px;
    color: gray;
  }
}
</style>
