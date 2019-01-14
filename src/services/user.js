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
export async function userorder(params) {
  return request(`${baseUrl}/order/list_by_user`, { method: 'POST', body: params });
}
export async function yop_refund_request(params) {
  return request(`${baseUrl}/yop_refund_request`, { method: 'POST', body: params });
}
export async function yop_refund_query(params) {
  return request(`${baseUrl}/yop_refund_query`, { method: 'POST', body: params });
}
export async function userdetail(params) {
  return request(`${baseUrl}/user/detail`, { method: 'POST', body: params });
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
export async function jiafanglist(params) {
  return request(`${baseUrl}/jiafang/list`, { method: 'POST', body: params });
}
export async function jiafangcreate(params) {
  return request(`${baseUrl}/jiafang/create`, { method: 'POST', body: params });
}

export async function jiafangdetail(params) {
  return request(`${baseUrl}/jiafang/detail`, { method: 'POST', body: params });
}

export async function yifangdetail(params) {
  return request(`${baseUrl}/yifang/detail`, { method: 'POST', body: params });
}

export async function userlogin(params) {
  return request(`${baseUrl}/d/user/dsignin`, { method: 'POST', body: params });
}

export async function uptoken(params) {
  return request(`${baseUrl}/qiniu/uptoken`, { method: 'GET', body: params });
}

export async function get_setting(params) {
  return request(`${baseUrl}/setting/get`, { method: 'POST', body: params });
}

export async function set_setting(params) {
  return request(`${baseUrl}/setting/set`, { method: 'POST', body: params });
}

export async function dashboard_pay(params) {
  return request(`${baseUrl}/order/dashboard_pay`, { method: 'POST', body: params });
}

export async function update_auth_info_by_admin(params) {
  return request(`${baseUrl}/user/update_auth_info_by_admin`, { method: 'POST', body: params });
}

export async function reset_user(params) {
  return request(`${baseUrl}/user/reset_user`, { method: 'POST', body: params });
}