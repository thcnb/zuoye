import service from "@/utils/request";

export function loginApi(data) {
  return service({
    url: "/sys/login",
    method: "POST",
    data,
  });
}
//用户信息
export function profileApi() {
  return service({
    url: "/sys/profile",
    method: "GET",
  });
}
//修改密码
export function updataPassApi(data) {
  return service({
    url: "/sys/user/updatePass",
    method: "PUT",
    data,
  });
}
//组织架构列表
export function departmentApi() {
  return service({
    url: "/company/department",
    method: "GET",
  });
}
//部门负责人列表
export function simpleApi() {
  return service({
    url: "/sys/user/simple",
    method: "GET",
  });
}
//添加部门
export function addDepartmentApi(data) {
  return service({
    url: "/company/department",
    method: "POST",
    data,
  });
}
//删除部门
export function delDepartmentApi(id) {
  return service({
    url: `/company/department/${id}`,
    method: "DELETE",
  });
}
//获取部门详情
export function departmentDetali(id) {
  return service({
    url: `/company/department/${id}`,
    method: "GET",
  });
}
//编辑部门
export function departmentRevise(id, data) {
  return service({
    url: `/company/department/${id}`,
    method: "PUT",
    data,
  });
}
