import axios from "axios";

const TokenKey = "token";

export function getToken() {
  return localStorage.getItem(TokenKey);
  // return Cookies.get(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  console.log(removeToken);
  // return localStorage.removeItem(TokenKey)
  // return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem("user_info"));
}

export const env = {
  production: false,
  api_url: "http://localhost:3000/api/",
  domain: "http://localhost:3000/",
  protocal: "http://",
  storeHoshName: "localhost:8080",
  patnerHoshName: "localhost:8080",
  partner: "localhost"
};

export const headers = {
  Authorization: "Bearer " + localStorage.getItem("token")
};

export const instance = axios.create({
  baseURL: env.api_url,
  timeout: 1000,
  headers: headers
});

export class Helpers {
  static setLoading(enable) {
    if (enable) {
    }
  }
}
