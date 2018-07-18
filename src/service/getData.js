import fetch from '../config/fetch';

/**
*  组织树
*/
export const organizationzTree = groupId => fetch('/organizational/getOrganizationalManagementTree',{
  type:'search',
  groupId:groupId
});
