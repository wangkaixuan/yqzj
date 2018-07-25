import { fetch } from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js


//获得组织机构树数据
export function getOrganizationalManagementTree(groupId) {
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.Hallowmas+'/organizational/getOrganizationalManagementTree',
    method: 'get',//请求方法
    params:{
      groupId:groupId //传过去的参数
    }
  })
}

//有新接口的时候像上面那样再来一次
// //修改昵称接口
// export function userID(name){
//   return fetch({
//     url:api.myself_name,
//     method:"put",
//     data:{
//       nickname:name
//     }
//   })
// }
//
//
// //取消转发赞踩接口
// export function cancelForward(articleId,type){
//   return fetch({
//     url:api.detail_article+articleId+"/forwarded_impress",
//     method:"delete",
//     params:{
//       type:type
//     }
//   })
// }
