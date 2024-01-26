import service from "@/utils/request";
export function employeeListApi(params) {
  return service({
    url: "/sys/user",
    method: "GET",
    params,
  });
}
