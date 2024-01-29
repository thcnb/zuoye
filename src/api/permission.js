import service from "@/utils/request";

//获取权限列表
export function permissionListApi() {
  return service({
    url: "/sys/permission",
    method: "GET",
  });
}
//新增权限
export function addpermissionApi(data) {
  return service({
    url: "/sys/permission",
    method: "POST",
    data,
  });
}
//删除权限
export function delpermissionApi(id) {
  return service({
    url: `/sys/permission/${id}`,
    method: "DELETE",
  });
}
//获取权限详情
export function emitpermissiosApi(id){
  return service({
    url:`/sys/permission/${id}`,
    method:'GET'
  })
}
//修改权限详情
export function detalipermissisApi(id,data){
  return service({
    url:`/sys/permission/${id}`,
    method:'PUT',
    data
  })
}
