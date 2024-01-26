import service from "@/utils/request";
//角色列表
export function roleApi(params){
  return service({
    url:'/sys/role',
    method:'GET',
    params
  })
}
//添加角色
export function AddroleApi(data){
  return service({
    url:'/sys/role',
    method:'POST',
    data
  })
}
//修改角色
export function editApi(id,data){
  return service({
    url:`/sys/role/${id}`,
    method:'PUT',
    data
  })
}
//删除角色
export function deleteApi(id){
  return service({
    url:`/sys/role/${id}`,
    method:'DELETE',
  })
}
