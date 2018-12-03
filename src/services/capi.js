import { stringify } from 'qs';
import request from '@/utils/request';

import axios from 'axios';

export async function post(url, data) {
  let res = await axios({
    method: 'post',
    url: url,
    data: data,
  });
  return res.data;
}
