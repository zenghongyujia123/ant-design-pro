import request from '@/utils/request';
import { stringify } from 'qs';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function userlist(params) {
  return request(`/server/api/user/list?${stringify(params)}`, { method: 'post' });
}
export async function orderlist(params) {
  return request(`/server/api/order/list?${stringify(params)}`, { method: 'post' });
}
