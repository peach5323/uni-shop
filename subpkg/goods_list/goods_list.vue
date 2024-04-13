<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodsList" :key="i" @click="toDetail(item.goods_id)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  import {getGoodsListAPI} from '../../apis/goods.js'
  import showMsg from '../../utils/showMsg.js'
  export default {
    data() {
      return {
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:20
        },
        goodsList:[],
        total:0,
        isLoading:false
      }
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb){
        // ** 打开节流阀
        this.isLoading = true
        const {message:res} =  await getGoodsListAPI(this.queryObj)
        // ** 关闭节流阀
        this.isLoading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        this.goodsList = [...this.goodsList,...res.goods]
        this.total = res.total
      },
      toDetail(id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+id
        })
      }
    },
    // 触底的事件
    onReachBottom(){
      // 判断是否还有下一页数据
      if(this.queryObj.pagenum*this.queryObj.pagesize >= this.total){
        return showMsg({title:"数据加载完毕！"})
      } 
      // 判断是否正在请求其它数据，如果是，则不发起额外的请求
      if(this.isLoading) return
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh(){
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      this.getGoodsList(()=> uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
</style>
