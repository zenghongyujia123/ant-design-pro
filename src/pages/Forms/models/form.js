import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';
import {
  reset_user,
  userorder,
  yifangcreate,
  jiafangcreate,
  update_auth_info_by_admin,
  uptoken,
  yifangdetail,
  jiafangdetail,
  get_setting,
  set_setting,
  userdetail,
  yop_refund_request,
  yop_refund_query,
  customercreate,
  customerdetail,
  yop_bindcard_pay_query_by_user,
  yop_auth_unbind_request,
  yop_auth_bindcard_list_by_user
} from '@/services/user';

export default {
  namespace: 'form',

  state: {
    data: {
      token: '',
      order_list: [],
      cardlist:[]
    },
    fileList: [],
  },

  effects: {
    
    *customercreate({ payload }, { call, put }) {
      let res = yield call(customercreate, payload);
      if (res.err_msg) message.error(res.err_msg);
      else {
        message.success('提交成功');
        yield put(routerRedux.push('/list/customer-list', {}));
      }
    },
    *yifangcreate({ payload }, { call, put }) {
      let res = yield call(yifangcreate, payload);
      if (res.err_msg) message.error(res.err_msg);
      else {
        message.success('提交成功');
        yield put(routerRedux.push('/list/yifang-list', {}));
      }
    },
    *update_auth_info_by_admin({ payload }, { call, put }) {
      let res = yield call(update_auth_info_by_admin, payload);
      if (res.err_msg) message.error(res.err_msg);
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
      if (res.err_msg) message.error(res.err_msg);
      else {
        message.success('提交成功');
        yield put(routerRedux.push('/list/jiafang-list', {}));
      }
    },
    *jiafangdetail({ payload, callback }, { call, put }) {
      let res = yield call(jiafangdetail, payload);
      if (res.err_msg) message.error(res.err_msg);
      else {
        res.fileList = [];
        if (res.logo) {
          res.fileList = [{ url: res.logo, uid: res.logo, status: 'done' }];
        }
        if (callback) {
          callback(res.fileList);
        }
        yield put({
          type: 'saveJiafangDetail',
          payload: res,
        });
      }
    },
    *yop_bindcard_pay_query_by_user({ payload, callback }, { call, put }) {
      let res = yield call(yop_bindcard_pay_query_by_user, payload);
      if (res.err_msg) message.error(res.err_msg);

      if(callback){
        return callback()
      }
    },
    *userorder({ payload, callback }, { call, put }) {
      let res = yield call(userorder, payload);
      if (res.err_msg) message.error(res.err_msg);
      else {
        yield put({
          type: 'saveOrderList',
          payload: res.list || [],
        });
      }
    },
    *yifangdetail({ payload, callback }, { call, put }) {
      let res = yield call(yifangdetail, payload);
      if (res.err_msg) message.error(res.err_msg);
      else {
        yield put({
          type: 'save',
          payload: res,
        });
      }
    },
    *customerdetail({ payload, callback }, { call, put }) {
      let res = yield call(customerdetail, payload);
      if (res.err_msg) message.error(res.err_msg);
      else {
        yield put({
          type: 'save',
          payload: res,
        });
      }
    },
    *yop_refund_query({ payload, callback }, { call, put }) {
      let res = yield call(yop_refund_query, payload);
      if (res.err_msg) message.error(res.err_msg);

      if(callback){
        return callback()
      }
    },
    *yop_refund_request({ payload, callback }, { call, put }) {
      let res = yield call(yop_refund_request, payload);
      if (res.err_msg) return message.error(res.err_msg);

      if (res.msg) {
        message.success(res.err_msg);
      }

      if (callback) callback();
      // yield put({
      //   type: 'save',
      //   payload: res,
      // });
    },

    *userdetail({ payload, callback }, { call, put }) {
      let detail = yield call(userdetail, payload);
      if (detail.err_msg) return message.error(res.err_msg);

      let order = yield call(userorder, payload);
      if (order.err_msg) return message.error(res.err_msg);

      // let bank = yield call(yop_auth_bindcard_list_by_user, payload);
      // if (bank.err_msg) return message.error(bank.err_msg);
      if (callback) {
        callback({
          // cardlist:bank.cardlist,
          order_list: order.list});
      }

      yield put({
        type: 'saveUserDetail',
        // payload: { order_list: order.list, cardlist:bank.cardlist||[],...detail },
        payload: { order_list: order.list, cardlist:[],...detail },
      });
    },
    *reset_user({ payload, callback }, { call, put }) {
      let res = yield call(reset_user, payload);
      if (res.err_msg) return message.error(res.err_msg);
      if (res.msg) return message.success(res.msg);
      return callback()
    },
    *yop_auth_unbind_request({ payload, callback }, { call, put }) {
      let res = yield call(yop_auth_unbind_request, payload);
      if (res.err_msg) return message.error(res.err_msg);
      if (res.msg) return message.success(res.msg);
      return callback()
    },
    *uptoken({ payload }, { call, put }) {
      let res = yield call(uptoken, payload);
      let a = 1;
      if (res.err_msg) message.error(res.err_msg);
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
    saveUserDetail(state, action) {
      return {
        data: { ...action.payload },
      };
    },
    saveJiafangDetail(state, action) {
      return {
        data: { ...action.payload },
      };
    },
    saveOrderList(state, action) {
      return {
        ...state,
        data: state.data,
        order_list: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        fileList: action.payload.fileList || [],
      };
    },
  },
};
