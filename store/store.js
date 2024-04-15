// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
// 4. 向外共享 Store 的实例对象
const store = new Vuex.Store({
  modules:{
    m_cart:moduleCart,
    m_user:moduleUser
  }
})
export default store