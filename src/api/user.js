import request from "@/utils/request";
import { env } from "@/utils";

export function getUser(id) {
  return request({
    url: `${env.api_url}/users/${id}`,
    method: "get"
  });
}

export function updateUser(data) {
  return request({
    url: `${env.api_url}/users/${data.id}`,
    method: "put",
    data
  });
}

export function userList(query = null) {
  return request({
    url: `${env.api_url}/users?page=${query.page}&limit=${query.limit}&search=${
      query.search
    }`,
    method: "get"
  });
}

export function userCreate(data) {
  return request({
    url: `${env.api_url}/users`,
    method: "post",
    data
  });
}
