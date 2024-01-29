import service from "@/utils/request";
//列表
export function employeeListApi(params) {
  return service({
    url: "/sys/user",
    method: "GET",
    params,
  });
}
//批量导出excel
export function exportExcleApi() {
  return service({
    url: "/sys/user/export",
    method: "GET",
    responseType: "blob",
  });
}
//添加
export function addemployeeListApi(data) {
  return service({
    url: "/sys/user",
    method: "POST",
    data,
  });
}
//删除
export function delmployeeListApi(id) {
  return service({
    url: `/sys/user/${id}`,
    method: "DELETE",
  });
}
//获取角色基本信息
export function detalimployeeListApi(id) {
  return service({
    url: `/sys/user/${id}`,
    method: "GET",
  });
}
//修改角色基本信息
export function emitmployeeListApi(id,data) {
  return service({
    url: `/sys/user/${id}`,
    method: "PUT",
    data
  });
}
//下载员⼯导⼊模版
export function getExportTemplateApi() {
  return service({
    url: "/sys/user/import/template",
    responseType: "blob", // ⼆进制⽂件流
    method: "GET",
  });
}
// 上传⽤户的excel
export function importEmployeeApi(data) {
  return service({
    url: "/sys/user/import",
    method: "POST",
    data, // form-data类型 因为要上传⽂件类型
    headers: { "Content-Type": "multipart/form-data" },
  });
}
//获取角色详情
export function emitApi(id) {
  return service({
    url: `/sys/role/${id}`,
    method: "GET",
  });
}
//获取权限已启用的角色列表
export function enabledApi() {
  return service({
    url: "/sys/role/list/enabled",
    method: "GET",
  });
}
//分配权限
export function assignRoleApi(data) {
  return service({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}

