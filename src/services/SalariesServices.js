import BaseService from "./OwnBaseService";

export async function apiGetSalaries(data) {
  return BaseService.post("/salary/getSalary", data);
}
