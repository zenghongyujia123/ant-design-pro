import { fakeChartData } from '@/services/api';
import { dashboard_pay } from '@/services/user';
import moment from 'moment';
import { array } from 'prop-types';

export default {
  namespace: 'chart',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  effects: {
    *dashboard_pay(_, { call, put }) {
      const response = yield call(dashboard_pay);
      let sorceArray = [];
      let desArray = [];

      response.forEach(item => {
        item.x = new Date(item.x).getTime();
        sorceArray.push(item.x);
      })


      let list = [];
      let start = new Date(response[0].x);
      let end = new Date(response[response.length - 1].x);
      let on = true;
      while (on) {
        if (end < start) {
          on = false;
        }


        start = new Date(start.setMinutes(start.getMinutes() + 1));
        let item = { x: start.getTime(), y1: 0 }
        let index = sorceArray.indexOf(start.getTime());
        if (index >= 0) {
          item.y1 = response[index].y1;
        }
        desArray.push(item);
      }

      yield put({
        type: 'save',
        payload: { offlineChartData: desArray },
      });
    },

    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
