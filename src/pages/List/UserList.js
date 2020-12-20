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
  none: '未申请',
  submit: '已提交',
  unpass: '未通过',
  unpay: '待打款',
  pay: '已打款',
};

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
      title: '用户ID',
      dataIndex: 'id',
    },
    {
      title: '消费时间',
      dataIndex: 'time',
    },
    {
      title: '消费金币',
      dataIndex: 'used',
    },
    {
      title: '剩余金币',
      dataIndex: 'remain',
    },
    // {
    //   title: '点击评估',
    //   dataIndex: 'is_evaluate_report',
    //   render(val) {
    //     return (
    //       <Badge status={statusMap[val ? 1 : 0]} text={status[val  ? 1 : 0]} />
    //     );
    //   },
    // },
    // {
    //   title: '评估付费',
    //   dataIndex: 'is_evaluate_report_time',
    //   render(val) {
    //     return (
    //       <Badge status={statusMap[val ? 1 : 0]} text={status[val  ? 1 : 0]} />
    //     );
    //   },
    // },
    // {
    //   title: '推荐付费',
    //   dataIndex: 'is_smart_recommend_time',
    //   render(val) {
    //     return (
    //       <Badge status={statusMap[val  ? 1 : 0]} text={status[val ? 1 : 0]} />
    //     );
    //   },
    // },
    // {
    //   title: '乙方',
    //   dataIndex: 'parent',
    // },
    // {
    //   title: '首次退款状态',
    //   dataIndex: 'first_refund_status',
    //   render(val) {
    //     return <Badge status={statusMap[0]} text={refundDic[val]} />;
    //   },
    // },
    // {
    //   title: '二次退款状态',
    //   dataIndex: 'refund_status',
    //   render(val) {
    //     return <Badge status={statusMap[0]} text={refundDic[val]} />;
    //   },
    // },
    // {
    //   title: '操作',
    //   dataIndex: '_id',
    //   render: (_id, record) => (
    //     <Fragment>
    //       <Link to={{ pathname: '/form/user-detail', query: { _id: _id } }}>详情</Link>
    //     </Fragment>
    //   ),
    // },
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
          <Col md={6} sm={24}>
            <FormItem label="用户ID">
              {getFieldDecorator('username')(<Input placeholder="请输入用户ID" />)}
            </FormItem>
          </Col>
          {/* <Col md={6} sm={24}>
            <FormItem label="游戏类型">
              {(<Input placeholder="请输入游戏类型" />)}
            </FormItem>
          </Col> */}
        </Row> <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="消费金币">
              {getFieldDecorator('vass')(<Input placeholder="最小" />)}
            </FormItem>
          </Col>
           <Col md={1} sm={1}>
             到
          </Col>
          <Col md={6} sm={24}>
            <FormItem>
              {(<Input placeholder="最大" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem  label="消费时间">
                  {getFieldDecorator('created_date')(
                    <DatePicker  md={8}
                      format="YYYY/MM/DD"
                      style={{ width: '100%' }}
                      placeholder="开始日期"
                    />
                )}
            </FormItem>
          </Col>
          <Col md={1} sm={24}>到</Col>
          <Col md={6} sm={24}>
            {getFieldDecorator('created_date')(
              <DatePicker  md={8}
                format="YYYY/MM/DD"
                style={{ width: '100%' }}
                placeholder="结束日期"
              />
            )}
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
    let {
      rule: { data },
      loading,
    } = this.props;
    const { stepFormValues } = this.state;
    data={
      list:[
        // {id:'02b89ebb6150ed00',time:'2020/9/27 23:26:15'	,used:'-3820'	,remain:'26180'},
      	// {id:'02b89ebb6150ed00',time:'2020/9/27 23:43:03'	,used:'-5768'	,remain:'20412'},
      	// {id:'02b89ebb6150ed00',time:'2020/9/27 23:57:21'	,used:'-9057'	,remain:'11355'},
      	// {id:'02b89ebb6150ed00',time:'2020/9/28 00:12:01'	,used:'+2419'	,remain:'13774'},
        // {id:'02b89ebb6150ed00',time:'2020/9/28 00:29:45'	,used:'+691'	,remain:'14465'},

        // {id:'c6b13c9749d53fac',time:'2020/9/27 23:27:05'	,used:'-1000'	,remain:'0'},

        // {id:'1814460360',time:'2020/9/27 23:24',	used:'-180'	,remain:'2820'},
	      // {id:'1814460360',time:'2020/9/27 23:27',	used:'-180'	,remain:'2640'},
	      // {id:'1814460360',time:'2020/9/27 23:30',	used:'+90'	,remain:'2730'},
	      // {id:'1814460360',time:'2020/9/27 23:35',	used:'-360'	,remain:'2370'},
	      // {id:'1814460360',time:'2020/9/27 23:37',	used:'-720'	,remain:'1650'},

      ],
      pagination:{total:1  }
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
