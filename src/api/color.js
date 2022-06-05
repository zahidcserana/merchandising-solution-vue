import request from "@/utils/request";
import { env } from "@/utils";

export function view(id) {
  return request({
    url: `${env.api_url}/colors/${id}`,
    method: "get"
  });
}

export function remove(id) {
  return request({
    url: `${env.api_url}/colors/${id}`,
    method: "delete"
  });
}

export function update(data) {
  return request({
    url: `${env.api_url}/colors/${data.id}`,
    method: "put",
    data
  });
}

export function index(query = null) {
  return request({
    url: `${env.api_url}/colors?page=${query.page}&limit=${query.limit}&search=${
      query.search
    }`,
    method: "get"
  });
}

export function colorList(search) {
  return request({
    url: `${env.api_url}/colors/list`,
    method: "get",
    search
  });
}

export function create(data) {
  return request({
    url: `${env.api_url}/colors`,
    method: "post",
    data
  });
}
