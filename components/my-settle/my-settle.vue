<template>
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isAllChecked" /><text>全选</text>
    </label>
    <view class="amount-box">
      合计：<text class="amount">￥{{checkedAmount.toFixed(2)}}</text>
    </view>
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex'
  import showMsg from '@/utils/showMsg.js'
  export default {
    name:"my-settle",
    data() {
      return {
        seconds:3,
        timer:null
      };
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      showTips(n){
        uni.showToast({
          icon:'none',
          title:'请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask:true,
          duration:1500
        })
      },
      delayNavigate(){
        // 把 data 中的秒数重置成 3 秒
        this.seconds = 3
        // 1. 展示提示消息，此时 seconds 的值等于 3
        this.showTips(this.seconds)
        // 2. 创建定时器，每隔 1 秒执行一次
        this.timer = setInterval(()=>{
          // 2.1 先让秒数自减 1
          this.seconds--
          if(this.seconds<=0){
            clearInterval(this.timer)
            uni.switchTab({
              url:'/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType:'switchTab',
                  from:'/pages/cart/cart'
                })
              }
            })
            return
          }
          // 2.2 再根据最新的秒数，进行消息提示
          this.showTips(this.seconds)
        },1000)
      },
      changeAllState(){
        // 修改购物车中所有商品的选中状态
        // !this.isAllChecked 表示：当前全选按钮的状态取反之后，就是最新的勾选状态        this.updateAllGoodsState(!this.isAllChecked)
      },
      settlement(){
        if(!this.checkedCount) return showMsg({title:'请选择要结算的商品！'})
        if(!this.addsStr) return showMsg({title:'请选择要结算的地址！'})
        // if(!this.token) return showMsg({title:'请先登录！'})
        if(!this.token) return this.delayNavigate()
      }
    },
    computed:{
      // 1. 将 total 映射到当前组件中
      ...mapGetters('m_cart',['checkedCount','checkedAmount','total']),
      ...mapGetters('m_user',['addsStr']),
      ...mapState('m_user',['token']),
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