import request from "@/utils/request";
import { env } from "@/utils";

export function view(id) {
  return request({
    url: `${env.api_url}/variant_products/${id}`,
    method: "get"
  });
}

export function update(data) {
  return request({
    url: `${env.api_url}/variant_products/${data.id}`,
    method: "put",
    data
  });
}

export function index(query = null) {
  return request({
    url: `${env.api_url}/variant_products?page=${query.page}&limit=${query.limit}&product_id=${
      query.search.product_id
    }`,
    method: "get"
  });
}

export function create(data) {
  return request({
    url: `${env.api_url}/variant_products`,
    method: "post",
    data
  });
}

export function remove(id) {
  return request({
    url: `${env.api_url}/variant_products/${id}`,
    method: "delete"
  });
}
