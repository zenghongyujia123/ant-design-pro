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
const refundDic = {
  'none': '未申请',
  'submit': '已提交',
  'unpass': '未通过',
  'unpay': '待打款',
  'pay': '已打款',
}

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
    {
      title: '手机号',
      dataIndex: 'username',
    },
    {
      title: '时间',
      dataIndex: 'created',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '人脸识别',
      dataIndex: 'is_face_info',
      render(val) {
        return (
          <Badge status={statusMap[val === true ? 1 : 0]} text={status[val === true ? 1 : 0]} />
        );
      },
    },
    {
      title: '银行绑定',
      dataIndex: 'is_bank',
      render(val) {
        return (
          <Badge status={statusMap[val === true ? 1 : 0]} text={status[val === true ? 1 : 0]} />
        );
      },
    },
    {
      title: '评估付费',
      dataIndex: 'is_evaluate_report',
      render(val) {
        return (
          <Badge status={statusMap[val === true ? 1 : 0]} text={status[val === true ? 1 : 0]} />
        );
      },
    },
    {
      title: '推荐付费',
      dataIndex: 'is_smart_recommend',
      render(val) {
        return (
          <Badge status={statusMap[val === true ? 1 : 0]} text={status[val === true ? 1 : 0]} />
        );
      },
    },
    {
      title: '乙方',
      dataIndex: 'parent',
    },
    {
      title: '是否登陆',
      dataIndex: 'app_name',
      render(val) {
        return (
          <Badge status={statusMap[val ? 1 : 0]} text={status[val ? 1 : 0]} />
        );
      },
    },
    {
      title: '首次退款状态',
      dataIndex: 'first_refund_status',
      render(val) {
        return (
          <Badge status={statusMap[0]} text={refundDic[val]} />
        );
      },
    },
    {
      title: '二次退款状态',
      dataIndex: 'refund_status',
      render(val) {
        return (
          <Badge status={statusMap[0]} text={refundDic[val]} />
        );
      },
    },
    {
      title: '操作',
      dataIndex: '_id',
      render: (_id, record) => (
        <Fragment>
          <Link to={{ pathname: '/form/user-detail', query: { _id: _id } }}>详情</Link>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/userlist',
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
      type: 'rule/userlist',
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
        type: 'rule/userlist',
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
          <Col md={4} sm={24}>
            <FormItem label="乙方账号">
              {getFieldDecorator('parent')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={4} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('username')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="银行绑定">
              {getFieldDecorator('is_bank')(
                <Select placeholder="银行绑定" style={{ width: '100%' }}>
                  <Option value="">默认</Option>
                  <Option value="false">否</Option>
                  <Option value="true">是</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="首次付费">
              {getFieldDecorator('is_evaluate_report')(
                <Select placeholder="首次付费" style={{ width: '100%' }}>
                  <Option value="">默认</Option>
                  <Option value="false">否</Option>
                  <Option value="true">是</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="二次付费">
              {getFieldDecorator('is_smart_recommend')(
                <Select placeholder="二次付费" style={{ width: '100%' }}>
                  <Option value="">默认</Option>
                  <Option value="false">否</Option>
                  <Option value="true">是</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="创建日期">
              {getFieldDecorator('created_date')(
                <DatePicker format="YYYY/MM/DD" style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}>
            <FormItem label="首次退款">
              {getFieldDecorator('first_refund_status')(
                <Select placeholder="首次退款" style={{ width: '100%' }}>
                  <Option value="">默认</Option>
                  <Option value="submit">已申请</Option>
                  <Option value="unpass">未通过</Option>
                  <Option value="unpay">待打款</Option>
                  <Option value="pay">已付款</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="二次退款">
              {getFieldDecorator('refund_status')(
                <Select placeholder="二次退款" style={{ width: '100%' }}>
                  <Option value="">默认</Option>
                  <Option value="submit">已申请</Option>
                  <Option value="unpass">未通过</Option>
                  <Option value="unpay">待打款</Option>
                  <Option value="pay">已付款</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </div>
        </div>
      </Form>
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
