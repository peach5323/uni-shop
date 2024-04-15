<template>
  <view>
    <view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
      <button @click="chooseAddress" type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
    </view>
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          收货人：<text>{{address.userName}}</text>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话：<text>{{address.telNumber}}</text>
          </view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addsStr}}</view>
      </view>
    </view>
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        // address:{}
      };
    },
    methods:{
      ...mapMutations('m_user',['updateAddress']),
      async chooseAddress(){
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        // 返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象        const [err,succ] = await uni.chooseAddress().catch(err=>err)
        // 2. 用户成功的选择了收货地址
        if(err===null && succ.errMsg ==='chooseAddress:ok'){
          // this.address = succ
          this.updateAddress(succ)
        }
      }
    },
    computed:{
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['addsStr']),
      
    }
  }
</script>

<style lang="scss">
.address-border{
  display: block;
  width: 100%;
  height: 5px;
}
.address-choose-box{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  
}
.address-info-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90px;
  font-size: 12px;
  padding: 0 5px;
  .row1{
    display: flex;
    justify-content: space-between;
    .row1-right{
      display: flex;
      align-items: center;
      .phone{
        margin-right: 5px;
      }
    }
  }
  .row2{
    display: flex;
    align-items: center;
    margin-top: 10px;
    .row2-left{
      white-space: nowrap;
    }
  }
}

</style>