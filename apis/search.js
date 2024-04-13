import api from '../utils/request.js'
// 搜索建议查询
export function getQSearchAPI(qsearch){
  console.log(qsearch);
  return api.request({
    url:'/api/public/v1/goods/qsearch?query='+qsearch,
    method:'get'
  })
}