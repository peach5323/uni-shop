import api from '../utils/request.js'
// 获取轮播图
export function getSwiperData(){
  return api.request({
    url:'/api/public/v1/home/swiperdata',
    method:'get'
  })
}
// 获取分类导航
export function getNavData(){
  return api.request({
    url:'/api/public/v1/home/catitems',
    method:'get'
  })
}
// 获取楼层数据
export function getFloorData(){
  return api.request({
    url:'/api/public/v1/home/floordata',
    method:'get'
  })
}