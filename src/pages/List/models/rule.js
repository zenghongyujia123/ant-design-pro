import { userlist, orderlist, yifanglist,jiafanglist,get_setting,set_setting } from '@/services/user';
import { message } from 'antd';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
      first_pay:{},
      second_pay:{}
    },
  },

  effects: {
    *get_setting({ payload }, { call, put }) {
      let res = yield call(get_setting, payload);
      if (res.err_msg)
        message.error(res.err_msg);
      else {
        yield put({
          type: 'save',
          payload: res,
        });
      }
    },
    *set_setting({ payload }, { call, put }) {
      let res = yield call(set_setting, payload);
      if (res.err_msg)
        message.error(res.err_msg);
      else {
        message.success('提交成功');
        yield put({
          type: 'save',
          payload: res,
        });
      }
    },

    *userlist({ payload }, { call, put }) {
      const response = yield call(userlist, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *orderlist({ payload }, { call, put }) {
      const response = yield call(orderlist, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *yifanglist({ payload }, { call, put }) {
      const response = yield call(yifanglist, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *jiafanglist({ payload }, { call, put }) {
      const response = yield call(jiafanglist, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
