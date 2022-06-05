import request from "@/utils/request";
import { env } from "@/utils";

export function view(id) {
  return request({
    url: `${env.api_url}/categories/${id}`,
    method: "get"
  });
}

export function update(data) {
  return request({
    url: `${env.api_url}/categories/${data.id}`,
    method: "put",
    data
  });
}

export function index(query = null) {
  return request({
    url: `${env.api_url}/categories?page=${query.page}&limit=${
      query.limit
    }&search=${query.search}`,
    method: "get"
  });
}

export function categoryList(search = '') {
  return request({
    url: `${env.api_url}/categories/list?search=${search}`,
    method: "get"
  });
}

export function create(data) {
  return request({
    url: `${env.api_url}/categories`,
    method: "post",
    data
  });
}
