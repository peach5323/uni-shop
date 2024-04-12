import api from '../utils/request.js'

// 获取分类数据
export function getCategoriesAPI(){
  return api.request({
    url:'/api/public/v1/categories',
    method:'get'
  })
}