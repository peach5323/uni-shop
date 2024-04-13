<template>
  <view>
    <!-- 使用自定义组件 -->
    <!-- <my-search bgcolor="#333333" radius="5"></my-search> -->
    <my-search @myclick="toSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左边滚动视图区 -->
      <scroll-view class="left-scroll-view" :style="{height:windowHeight+'px'}" scroll-y="true" >
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item ',i === active ?'active':'']" @click="activeChanged(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右边滚动视图区 -->
      <scroll-view class="right-scroll-view" :style="{height:windowHeight+'px'}" :scroll-top="scrollTop" scroll-y="true" >
        <view v-for="(item2,i) in cateLevel2" :key="i" class="cate-lv2">
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="toGoodsList(item3)">
              <image :src="item3.cat_icon.replace('api-ugo-dev','api-hmugo-web')" mode="widthFix"/>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import {getCategoriesAPI} from '../../apis/cate.js'
  export default {
    data() {
      return {
        windowHeight:0,
        active:0,
        cateList:[],
        cateLevel2:[],
        // 滚动条距离顶部的距离
        scrollTop:0
      };
    },
    onLoad() {
    const sysInfo = uni.getWindowInfo()
    // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
    this.windowHeight = sysInfo.windowHeight - 50
    this.getCategories()
    },
    methods:{
      async getCategories(){
        const {message:res} = await getCategoriesAPI()
        this.cateList = res
        // 给二级分类赋值-默认值
        this.cateLevel2 = res[0].children
      },
      // 选中项改变的事件处理函数
      activeChanged(i){
         this.active = i
         // 给二级分类重新赋值
         this.cateLevel2 = this.cateList[i].children
         // 让 scrollTop 的值在 0 与 1 之间切换
         this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转商品页面
      toGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
        })
      },
      toSearch(){
        console.log('ok');
      }
      
    },
      
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  
  .left-scroll-view{
    width: 120px;
    
    .left-scroll-view-item{
      line-height: 60px;
      background-color: #f7f7f7;
      font-size: 12px;
      text-align: center;
      // 激活项的样式
      &.active{
        position: relative;
        background-color: #fff;
        // 渲染激活项左侧的红色指示边线
        &::before{
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          content: "  ";
          display: block;
          width: 3px;
          height: 30px;
          background: #c00000;
        }
      }
    }
    
    
  }

  .cate-lv2-title{
    padding: 15px 0;
      font-size: 12px;
      text-align: center;
      font-weight: bold;
  }
  .cate-lv3-list{
    display: flex;
    flex-wrap: wrap;
    
    .cate-lv3-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 33.33%;
      
      image {
        width: 60px;
        height: 60px;
      }
      text {
        font-size: 12px;
      }
    }
    
  }
}
</style>
