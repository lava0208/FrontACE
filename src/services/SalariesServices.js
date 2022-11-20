import BaseService from "./OwnBaseService";

export async function apiGetSalaries(data) {
  return BaseService.post("/salary/getSalary", data);
}
export async function apiGetGraph(data) {
  return BaseService.post("/graph/getgraph", data);
}
