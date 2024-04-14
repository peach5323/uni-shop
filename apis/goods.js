import api from '../utils/request.js'

// 商品列表搜索
export function getGoodsListAPI(queryObj){
  return api.request({
    url:'/api/public/v1/goods/search',
    method:'get',
    data:{
      ...queryObj
    }
  })
}

// 商品详情
export function getGoodsDetailAPI(id){
  return api.request({
    url:'/api/public/v1/goods/detail',
    method:'get',
    data:{
      goods_id:id
    }
  })
}