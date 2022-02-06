import request from "@/utils/request";
import { env } from "@/utils";

export function view(id) {
  return request({
    url: `${env.api_url}/products/${id}`,
    method: "get"
  });
}

export function update(data) {
  return request({
    url: `${env.api_url}/products/${data.id}`,
    method: "put",
    data
  });
}

export function index(query = null) {
  return request({
    url: `${env.api_url}/products?page=${query.page}&limit=${query.limit}&search=${
      query.search
    }`,
    method: "get"
  });
}

export function create(data) {
  return request({
    url: `${env.api_url}/products`,
    method: "post",
    data
  });
}

export function productList(option) {
  return request({
    url: `${env.api_url}/products/list`,
    method: "get",
    params: option
  });
}