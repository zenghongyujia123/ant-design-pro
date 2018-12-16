import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';
import { yifangcreate, jiafangcreate, uptoken, jiafangdetail, get_setting, set_setting } from '@/services/user';

export default {
  namespace: 'form',

  state: {
    data: {
      token: '',
    },
    fileList: []
  },

  effects: {
    *yifangcreate({ payload }, { call, put }) {
      let res = yield call(yifangcreate, payload);
      if (res.err_msg)
        message.error(res.err_msg);
      else {
        message.success('提交成功');
        yield put(routerRedux.push('/list/yifang-list', {}));
      }
    },
   
    *jiafangcreate({ payload }, { call, put }) {
      let res = yield call(jiafangcreate, payload);
      if (res.err_msg)
        message.error(res.err_msg);
      else {
        message.success('提交成功');
        yield put(routerRedux.push('/list/jiafang-list', {}));
      }
    },
    *jiafangdetail({ payload, callback }, { call, put }) {
      let res = yield call(jiafangdetail, payload);
      if (res.err_msg)
        message.error(res.err_msg);
      else {
        res.fileList = [];
        if (res.logo) {
          res.fileList = [{ url: res.logo, uid: res.logo, status: 'done' }];
        }
        if (callback) {
          callback(res.fileList);
        }
        yield put({
          type: 'save',
          payload: res,
        });
      }
    },
    *uptoken({ payload }, { call, put }) {
      let res = yield call(uptoken, payload);
      let a = 1;
      if (res.err_msg)
        message.error(res.err_msg);
      else {
        yield put({
          type: 'save',
          payload: res,
        });
      }
    },

    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        fileList: action.payload.fileList || []
      };
    },
  },
};
