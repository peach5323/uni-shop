import api from '../utils/request.js'
// 搜索建议查询
export function getTokenAPI(data){
  return api.request({
    url:'/api/public/v1/users/wxlogin',
    method:'POST',
    data
  })
}