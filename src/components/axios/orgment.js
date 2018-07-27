import { fetch } from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js

//获得组织机构树数据
export function getGroupTree(groupId) {
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.Hallowmas+'/organizational/getOrganizationalManagementTree',
    method: 'get',//请求方法
    params:{
      groupId:groupId //传过去的参数
    }
  })
}
//查看组织套餐使用
export function checkSetMealUse(groupId) {
  return fetch({
    url:api.Hallowmas+'/organizational/getOrganizationalCount',
    method:'get',
    params: {
      groupId: groupId
    }
  })
}


