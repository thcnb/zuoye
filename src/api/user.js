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
