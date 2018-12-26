import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';
import { yifangcreate, jiafangcreate, update_auth_info_by_admin, uptoken, yifangdetail, jiafangdetail, get_setting, set_setting, userdetail } from '@/services/user';

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
    *update_auth_info_by_admin({ payload }, { call, put }) {
      let res = yield call(update_auth_info_by_admin, payload);
      if (res.err_msg)
        message.error(res.err_msg);
      else {
        message.success('提交成功');
        yield put({
          type: 'save',
          payload: res.user,
        });
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


    *yifangdetail({ payload, callback }, { call, put }) {
      let res = yield call(yifangdetail, payload);
      if (res.err_msg)
        message.error(res.err_msg);
      else {
        yield put({
          type: 'save',
          payload: res,
        });
      }
    },
    *userdetail({ payload, callback }, { call, put }) {
      let res = yield call(userdetail, payload);
      if (res.err_msg)
        message.error(res.err_msg);
      else {
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
