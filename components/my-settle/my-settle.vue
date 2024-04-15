<template>
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isAllChecked" /><text>全选</text>
    </label>
    <view class="amount-box">
      合计：<text class="amount">￥{{checkedAmount.toFixed(2)}}</text>
    </view>
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      changeAllState(){
        // 修改购物车中所有商品的选中状态
        // !this.isAllChecked 表示：当前全选按钮的状态取反之后，就是最新的勾选状态        this.updateAllGoodsState(!this.isAllChecked)
      }
    },
    computed:{
      // 1. 将 total 映射到当前组件中
      ...mapGetters('m_cart',['checkedCount','checkedAmount','total']),
      // 2. 是否全选
      isAllChecked(){
        return this.total === this.checkedCount
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container{
  position:fixed;
  bottom: 0;
  left:0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  width: 100%;
  height: 50px;
  background-color: white;
  font-size: 14px;
  .radio{
    display: flex;
    align-items: center;
  }
  .amount{
    color: #c00000;
    font-weight: bold;
  }
  .btn-settle{
    padding: 0 10px;
    background-color: #c00000;
    height: 50px;
    line-height: 50px;
    text-align: center;
    min-width: 100px;
    color: #fff;
  }
}
</style>