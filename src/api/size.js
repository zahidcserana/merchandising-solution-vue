import request from "@/utils/request";
import { env } from "@/utils";

export function view(id) {
  return request({
    url: `${env.api_url}/sizes/${id}`,
    method: "get"
  });
}

export function update(data) {
  return request({
    url: `${env.api_url}/sizes/${data.id}`,
    method: "put",
    data
  });
}

export function index(query = null) {
  return request({
    url: `${env.api_url}/sizes?page=${query.page}&limit=${query.limit}&search=${
      query.search
    }`,
    method: "get"
  });
}

export function sizeList(search) {
  return request({
    url: `${env.api_url}/sizes/list`,
    method: "get",
    search
  });
}

export function create(data) {
  return request({
    url: `${env.api_url}/sizes`,
    method: "post",
    data
  });
}
