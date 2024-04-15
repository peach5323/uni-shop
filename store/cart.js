export default{
  namespaced:true,
  state:()=>({
  // 购物车的数组，用来存储购物车中每个商品的信息对象
  // 每个商品的信息对象，都包含如下 6 个属性：
  // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations:{
    addToCart(state,goods){
        const res = state.cart.find(i=>i.goods_id === goods.goods_id)
        if(!res){
          state.cart.push(goods)
        }else{
          res.goods_count++
        }
        // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
        this.commit('m_cart/saveToStorage')
    },
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state,goods){
      const res = state.cart.find(i=>i.goods_id === goods.goods_id)
      if(res){
        res.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新购物车中商品的数量
    updateGoodsCount(state,goods){
      const res = state.cart.find(i=>i.goods_id === goods.goods_id)
      if(res){
        res.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    removeGoodsById(state,goods_id){
      state.cart = state.cart.filter(i=>i.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },
    // 更新所有商品的勾选状态
    updateAllGoodsState(state,newState){
      state.cart.forEach(i=>i.goods_state=newState)
      this.commit('m_cart/saveToStorage')
    }
  },
  getters:{
    total(state){
     return state.cart.reduce((sum,i)=>sum + i.goods_count,0)
    },
    // 勾选的商品的总数量
    checkedCount(state){
      return state.cart.filter(i=>i.goods_state).reduce((sum,i)=>sum+i.goods_count,0)
    },
    checkedAmount(state){
      return state.cart.filter(i=>i.goods_state).reduce((sum,i)=>sum+i.goods_count*i.goods_price,0)
    },
  }
}