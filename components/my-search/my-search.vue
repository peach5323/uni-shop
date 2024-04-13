<template>
  <view class="my-search-container" :style="{'background': bgcolor}">
    <view class="my-search-box" :style="{'border-radius': radius+'px'}" @click="serchBoxHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      // 背景颜色
      bgcolor : {
        type : String,
        default : '#c00000'
      },
      // 圆角尺寸 单位px
      radius:{
        type : Number,
        default : 18
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      serchBoxHandler(){
        // 触发外界通过 @myclick 绑定的 click 事件处理函数
        this.$emit('myclick')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  // background: #c00000;
  .my-search-box{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 100%;
    background: #ffffff;
    // border-radius: 15px;
    .placeholder{
      margin-left: 5px;
      font-style: 15px;
    }
  }
}
</style>