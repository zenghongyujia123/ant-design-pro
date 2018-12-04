import { userlist, orderlist, yifanglist } from '@/services/user';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
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
