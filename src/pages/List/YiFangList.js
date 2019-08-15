import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['error', 'success'];
const status = ['否', '是'];

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    { title: '账号', dataIndex: 'username', },
    {
      title: '公司', dataIndex: 'nickname', render: (nickname, record) => (
        <span>{(nickname || '').substr(0, 5)}</span>
      ),
    },
    { title: '总注册量', dataIndex: 'count', },
    
    { title: '今日ip', dataIndex: 'today_ip' },
    { title: '今日注册量', dataIndex: 'today_count' },
    { title: '今日进app', dataIndex: 'today_app_count' },
    { title: '今日首付', dataIndex: 'today_first_pay_count' },
    { title: '今日首转', dataIndex: 'today_first_zhuanhua', render: (_id, record) => (<span>{record.today_count == 0 ? 0 : (100 * (record.today_first_pay_count / record.today_count)).toFixed(2)}%</span>), },
    { title: '今日二付', dataIndex: 'today_second_pay_count' },

    { title: '昨天注册量', dataIndex: 'yestoday_count' },
    { title: '昨天进app', dataIndex: 'yestoday_app_count' },
    { title: '昨天首付', dataIndex: 'yestoday_first_pay_count' },
    { title: '昨天首转', dataIndex: 'yestoday_first_zhuanhua', render: (_id, record) => (<span>{record.yestoday_count == 0 ? 0 : (100 * (record.yestoday_first_pay_count / record.yestoday_count)).toFixed(2)}%</span>) },
    { title: '昨天二付', dataIndex: 'yestoday_second_pay_count' },
    {
      title: '操作',
      dataIndex: '_id',
      render: (_id, record) => (
        <Fragment>
          <Link to={{ pathname: '/form/yifang-detail', query: { _id: _id } }}>详情</Link>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      
      type: 'rule/yifanglist',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/yifanglist',
      payload: params,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
        </Row>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <a href="/form/yifang-detail">
              <Button icon="plus" type="primary" style={{ marginLeft: '10px' }}>
                新建
            </Button>
            </a>
          </div>
        </div>
      </Form >
    );
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { stepFormValues } = this.state;

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <StandardTable
              selectedRows={[]}
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
