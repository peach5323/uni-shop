import api from '../utils/request.js'
// 获取轮播图
export function getSwiperDataAPI(){
  return api.request({
    url:'/api/public/v1/home/swiperdata',
    method:'get'
  })
}
// 获取分类导航
export function getNavDataAPI(){
  return api.request({
    url:'/api/public/v1/home/catitems',
    method:'get'
  })
}
// 获取楼层数据
export function getFloorDataAPI(){
  return api.request({
    url:'/api/public/v1/home/floordata',
    method:'get'
  })
}