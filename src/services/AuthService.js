import ApiService from "./ApiService";
import BaseService from "./OwnBaseService";

export async function apiSignIn(data) {
  return BaseService.post("/user/login", data);
}

export async function apiSignUp(data) {
  return BaseService.post("/user/createuser", data);
}

export async function apiSignOut(data) {
  return ApiService.fetchData({
    url: "/sign-out",
    method: "post",
    data,
  });
}

