import api from '../utils/request.js'
export function getSwiperData(){
  return api.request({
    url:'/api/public/v1/home/swiperdata',
    method:'get'
  })
}