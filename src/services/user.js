import request from '@/utils/request';
import { stringify } from 'qs';
// const baseUrl = 'http://m.chaoqianwang.com'
const baseUrl = 'http://localhost:7001'
export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function userlist(params) {
  return request(`${baseUrl}/user/list`, { method: 'POST', body: params });
}
export async function orderlist(params) {
  return request(`${baseUrl}/order/list`, { method: 'POST', body: params });
}
export async function yifanglist(params) {
  return request(`${baseUrl}/yifang/list`, { method: 'POST', body: params });
}
export async function yifangcreate(params) {
  return request(`${baseUrl}/yifang/create`, { method: 'POST', body: params });
}

export async function userlogin(params) {
  return request(`${baseUrl}/d/user/dsignin`, { method: 'POST', body: params });
}
