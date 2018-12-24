import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';

import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));
const TopSearch = React.lazy(() => import('./TopSearch'));
const ProportionSales = React.lazy(() => import('./ProportionSales'));
const OfflineData = React.lazy(() => import('./OfflineData'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/dashboard_pay'],
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/dashboard_pay',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      // offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    let { offlineData } = { "offlineData": [{ "name": "Stores 0", "cvr": 0.9 }, { "name": "Stores 1", "cvr": 0.5 }, { "name": "Stores 2", "cvr": 0.5 }, { "name": "Stores 3", "cvr": 0.1 }, { "name": "Stores 4", "cvr": 0.7 }, { "name": "Stores 5", "cvr": 0.9 }, { "name": "Stores 6", "cvr": 0.3 }, { "name": "Stores 7", "cvr": 0.4 }, { "name": "Stores 8", "cvr": 0.2 }, { "name": "Stores 9", "cvr": 0.9 }], "offlineChartData": [{ "x": 1545630708576, "y1": 28, "y2": 41 }, { "x": 1545632508576, "y1": 26, "y2": 77 }, { "x": 1545634308576, "y1": 57, "y2": 69 }, { "x": 1545636108576, "y1": 21, "y2": 11 }, { "x": 1545637908576, "y1": 34, "y2": 65 }, { "x": 1545639708576, "y1": 74, "y2": 70 }, { "x": 1545641508576, "y1": 97, "y2": 63 }, { "x": 1545643308576, "y1": 24, "y2": 91 }, { "x": 1545645108576, "y1": 50, "y2": 33 }, { "x": 1545646908576, "y1": 16, "y2": 35 }, { "x": 1545648708576, "y1": 100, "y2": 76 }, { "x": 1545650508576, "y1": 64, "y2": 97 }, { "x": 1545652308576, "y1": 66, "y2": 18 }, { "x": 1545654108576, "y1": 80, "y2": 28 }, { "x": 1545655908576, "y1": 19, "y2": 33 }, { "x": 1545657708576, "y1": 40, "y2": 106 }, { "x": 1545659508576, "y1": 69, "y2": 79 }, { "x": 1545661308576, "y1": 93, "y2": 39 }, { "x": 1545663108576, "y1": 44, "y2": 27 }, { "x": 1545664908576, "y1": 14, "y2": 35 }] }

    const activeKey = '';

    return (
      <GridContent>
        {/* <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={visitData} />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={salesData}
            isActive={this.isActive}
            handleRangePickerChange={this.handleRangePickerChange}
            loading={loading}
            selectDate={this.selectDate}
          />
        </Suspense>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={visitData2}
                selectDate={this.selectDate}
                searchData={searchData}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData}
                handleChangeSalesType={this.handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row> */}
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={offlineData}
            offlineChartData={offlineChartData}
            handleTabChange={this.handleTabChange}
          />
        </Suspense>
      </GridContent>
    );
  }
}

export default Analysis;
