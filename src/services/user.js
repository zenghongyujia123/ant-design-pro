import request from '@/utils/request';
import { stringify } from 'qs';
const baseUrl = 'http://m.chaoqianwang.com'
export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function userlist(params) {
  return request(`${baseUrl}/user/list?${stringify(params)}`, { method: 'post' });
}
export async function orderlist(params) {
  return request(`${baseUrl}/order/list?${stringify(params)}`, { method: 'post' });
}
