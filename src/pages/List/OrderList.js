import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
    // {
    //   title: '订单号',
    //   dataIndex: 'MerchantOrderNo',
    // },
    // {
    //   title: '充值金额',
    //   dataIndex: 'Amount',
    // },
    // {
    //   title: '用户ID',
    //   dataIndex: 'key',
    // },
    // {
    //   title: '充值单号',
    //   dataIndex: 'info.BankNo',
    // },
    // {
    //   title: '类型',
    //   dataIndex: 'productname',
    // },
    // {
    //   title: '时间',
    //   dataIndex: 'created_minute',
    //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
    // },

     {
      title: '订单号',
      dataIndex: 'order',
      width:'220px'
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      width:'100px'
    },
    {
      title: '用户ID',
      dataIndex: 'id',
      width:'200px'
    },
    {
      title: '充值单号',
      dataIndex: 'bankno',
      width:'150px'
    },
    // {
    //   title: '类型',
    //   dataIndex: 'productname',
    // },
    {
      title: '时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      width:'200px'
    },

    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '兑换金币数',
      dataIndex: 'errormsg',
    },
    // {
    //   title: '银行',
    //   dataIndex: 'info.organName',
    // },
    // {
    //   title: '乙方',
    //   dataIndex: 'user_parent',
    // },
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <a href="">详情</a>
    //     </Fragment>
    //   ),
    // },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/orderlist',
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
      type: 'rule/orderlist',
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
      };

      // this.setState({
      //   formValues: values,
      // });

      dispatch({
        type: 'rule/orderlist',
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
          <Col md={6} sm={24}>
            <FormItem label="用户ID">
              {(<Input placeholder="请输入用户ID" />)}
            </FormItem>
            <FormItem label="充值单号">
              {getFieldDecorator('requestno')(<Input placeholder="请输入单号" />)}
            </FormItem>
             <FormItem label="充值金额">
              {getFieldDecorator('username')(<Input placeholder="请输入充值金额" />)}
            </FormItem>
          </Col>
          <Col >
            <FormItem label="充值日期">
              {getFieldDecorator('date')(
                <DatePicker placeholder="请选择充值日期" />
              )}
            </FormItem>
          </Col>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button icon="plus" type="primary" style={{ marginLeft: '10px' }}>
                新建
              </Button>
            </div>
          </div>
          {/* <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col> */}
        </Row>

      
      </Form>
    );
  }

  render() {
    let {
      rule: { data },
      loading,
    } = this.props;
    const { stepFormValues } = this.state;
    console.log(data)

    data = {
      list:[
{order:	'20200927232333535010',amount:'3000',	id:'02b89ebb6150ed00',	bankno:'1814462763'	,status:'成功',time:'2020/9/27 23:23:53'	,errormsg:'30000'},
{order:	'20200927232451515510',amount:'100',	id:'c6b13c9749d53fac',	bankno:'1814463859'	,status:'成功',time:'2020/9/27 23:25:04'	,errormsg:'1000'},
{order:	'20200927232100999710',amount:'300',	id:'8b44d038f1bd9ce3',	bankno:'1814460360'	,status:'失败',time:'2020/9/27 23:21:18'	,errormsg:'3000'},


      ],
      pagination:{total:3}
    }

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
