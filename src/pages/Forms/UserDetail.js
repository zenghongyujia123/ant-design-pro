import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  message,
  Upload,
  Tooltip,
  Divider,
  Modal,
  Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import styles from './style.less';
import moment from 'moment';

const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, form }) => ({
  data: form.data,
  order_list: form.order_list,
  submitting: loading.effects['form/jiafangcreate'],
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {
    previewImage: '',
    data: {},
    order_list: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.location.query._id) {
      dispatch({
        type: 'form/userdetail',
        payload: {
          user_id: this.props.location.query._id,
        },
        callback: order_list => {
          this.setState({ order_list });
        },
      });

      // dispatch({
      //   type: 'form/userorder',
      //   payload: {
      //     user_id: this.props.location.query._id,
      //   },
      //   callback: () => {
      //     this.setState({});
      //   },
      // });
    }
  }
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // dispatch({
        //   type: 'form/jiafangcreate',
        //   payload: { ...values, jiafang_id: this.props.location.query._id },
        // });
      }
    });
  };

  handleRefundChange = (e, index, status, refund_list) => {
    const { dispatch, form, data } = this.props;
    if (data.refund_status === 'pay') {
      return;
    }
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (status !== 'pay') {
          refund_list[index].status = status;
          refund_list[index].refund_reason = values[`refund_reason${index}`];
          let refund_status = 'unpay';
          refund_list.forEach(item => {
            if (item.status != 'pass') {
              refund_status = 'unpass';
            }
          });

          console.log(refund_list);
          dispatch({
            type: 'form/update_auth_info_by_admin',
            payload: {
              refund_list,
              refund_status,
              refund_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              user_id: this.props.location.query._id,
            },
          });
        } else {
          dispatch({
            type: 'form/update_auth_info_by_admin',
            payload: {
              refund_status: 'pay',
              refund_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              user_id: this.props.location.query._id,
            },
          });
        }
      }
    });
  };
  handleFirstRefundChange = (e, index, status, first_refund_list) => {
    const { dispatch, form, data } = this.props;
    if (data.first_refund_status === 'pay') {
      return;
    }
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (status !== 'pay') {
          first_refund_list[index].status = status;
          first_refund_list[index].refund_reason = values[`first_refund_reason${index}`];
          let first_refund_status = 'unpay';
          first_refund_list.forEach(item => {
            if (item.status != 'pass') {
              first_refund_status = 'unpass';
            }
          });
          dispatch({
            type: 'form/update_auth_info_by_admin',
            payload: {
              first_refund_list,
              first_refund_status,
              first_refund_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              user_id: this.props.location.query._id,
            },
          });
        } else {
          dispatch({
            type: 'form/update_auth_info_by_admin',
            payload: {
              first_refund_status: 'pay',
              first_refund_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              user_id: this.props.location.query._id,
            },
          });
        }
      }
    });
  };

  reset_user() {
    const { dispatch, form, data } = this.props;
    dispatch({
      type: 'form/reset_user',
      payload: {
        user_id: this.props.location.query._id,
      },
      callback: () => {
        dispatch({
          type: 'form/userdetail',
          payload: {
            user_id: this.props.location.query._id,
          },
          callback: order_list => {
            this.setState({ order_list });
          },
        });
      },
    });
  }

  yop_refund_query(e, order) {
    const { dispatch, form, data } = this.props;

    dispatch({
      type: 'form/yop_refund_query',
      payload: {
        requestno: order.requestno,
        user_id: this.props.location.query._id,
      },
      callback: () => {
        dispatch({
          type: 'form/userdetail',
          payload: {
            user_id: this.props.location.query._id,
          },
          callback: order_list => {
            this.setState({ order_list });
          },
        });
      },
    });
  }
  yop_bindcard_pay_query_by_user(){
    const { dispatch, form, data } = this.props;

    dispatch({
      type: 'form/yop_bindcard_pay_query_by_user',
      payload: {
        user_id: this.props.location.query._id,
      },
      callback: () => {
        dispatch({
          type: 'form/userdetail',
          payload: {
            user_id: this.props.location.query._id,
          },
          callback: order_list => {
            this.setState({ order_list });
          },
        });
      },
    });
  }
  yop_refund_request(e, order) {
    const { dispatch, form, data } = this.props;
    if (order.status !== 'PAY_SUCCESS') {
      return;
    }

    dispatch({
      type: 'form/yop_refund_request',
      payload: {
        requestno: order.requestno,
        user_id: this.props.location.query._id,
      },
      callback: () => {
        dispatch({
          type: 'form/userdetail',
          payload: {
            user_id: this.props.location.query._id,
          },
          callback: order_list => {
            this.setState({ order_list });
          },
        });
      },
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const { submitting, data } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { previewImage, order_list } = this.state;

    return (
      <PageHeaderWrapper title="用户详情">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('username', { initialValue: data.username || '' })(
                <Input readOnly placeholder="无" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="注册时间">
              {getFieldDecorator('created', {
                initialValue: moment(data.created).format('YYYY-MM-DD HH:mm:ss') || '',
              })(<Input disabled placeholder="无" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="银行卡用户名">
              {getFieldDecorator('bank_username', { initialValue: data.bank_username || '' })(
                <Input readOnly placeholder="无" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="银行卡号">
              {getFieldDecorator('bank_cardno', { initialValue: data.bank_cardno || '' })(
                <Input readOnly placeholder="无" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="身份证号">
              {getFieldDecorator('id_no', {
                initialValue: data.face_info ? data.face_info.id_no : '',
              })(<Input readOnly placeholder="无" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="乙方渠道">
              {getFieldDecorator('parent', { initialValue: data.parent || '' })(
                <Input readOnly placeholder="无" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="登陆">
              {
                <RadioGroup value={data.sms_verify}>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="人脸">
              {
                <RadioGroup value={data.is_face_info}>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="填写个人资料">
              {
                <RadioGroup value={data.is_geren_ziliao}>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="填紧急联系人">
              {
                <RadioGroup value={data.is_jinji_contract}>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="绑定银行卡">
              {
                <RadioGroup value={data.is_bank}>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="首付">
              {
                <RadioGroup value={data.is_evaluate_report}>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="二次付款">
              {
                <RadioGroup value={data.is_smart_recommend}>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              }
            </FormItem>
            <Button
              type="primary"
              loading={submitting}
              style={{ marginRight: '10PX' }}
              onClick={e => {
                this.yop_bindcard_pay_query_by_user();
              }}
            >
              刷新总订单
            </Button>
            {data.order_list.map((order, index) => {
              return (
                <div key={index} style={{ background: '#ECECEC', padding: '30px' }}>
                  <Card title={`订单号-${order._id}`} bordered={false}>
                    <p>{`易宝订单：${order.info.yborderid}`}</p>
                    <p>{`订单类型：${order.productname}`}</p>
                    <p>{`订单状态：${order.status}`}</p>
                    <p>{`订单金额：${order.amount}`}</p>
                    <p>{`订单日期：${moment(order.created).format('YYYY-MM-DD HH:mm:ss')}`}</p>

                    <p>{`退款状态：${order.refund_status}`}</p>
                    <p>{`退款描述：${order.refund_info ? order.refund_info.errormsg : '无'}`}</p>
                    <Button
                      type="primary"
                      loading={submitting}
                      style={{ marginRight: '10PX' }}
                      onClick={e => {
                        this.yop_refund_request(e, order);
                      }}
                    >
                      退款
                    </Button>
                    <Button
                      type="primary"
                      loading={submitting}
                      onClick={e => {
                        this.yop_refund_query(e, order);
                      }}
                    >
                      刷新
                    </Button>
                  </Card>
                </div>
              );
            })}
            <Divider>
              首次次退款申请相关 （总状态：{data.first_refund_status}）(提交时间：
              {moment(data.first_refund_time).format('YYYY-MM-DD HH:mm:ss')})
            </Divider>
            {data.first_refund_list &&
              data.first_refund_list.length > 0 &&
              data.first_refund_list.map((first_refund, index) => {
                return (
                  <FormItem
                    key={first_refund.jiafang_id}
                    {...formItemLayout}
                    label={`${first_refund.name}`}
                  >
                    <img
                      style={{ width: '60px', height: '60px', marginRight: '10px' }}
                      src={first_refund.logo}
                    />
                    <img
                      style={{ width: '60px', height: '60px', marginRight: '10px' }}
                      onClick={e =>
                        window.open(
                          first_refund.refund_image.replace(
                            'pjgg8ntmh.bkt.clouddn.com',
                            'image.chaoqianwang.com'
                          )
                        )
                      }
                      src={first_refund.refund_image.replace(
                        'pjgg8ntmh.bkt.clouddn.com',
                        'image.chaoqianwang.com'
                      )}
                    />
                    {/* submit,pass,unpass */}
                    （当前状态图片状态：{first_refund.status || 'submit'}）
                    <Button
                      type="primary"
                      style={{ marginRight: '10px' }}
                      loading={submitting}
                      onClick={e => {
                        this.handleFirstRefundChange(e, index, 'pass', data.first_refund_list);
                      }}
                    >
                      通过
                    </Button>
                    <Button
                      type="danger"
                      loading={submitting}
                      onClick={e => {
                        this.handleFirstRefundChange(e, index, 'unpass', data.first_refund_list);
                      }}
                    >
                      不通过
                    </Button>
                    {getFieldDecorator(`first_refund_reason${index}`, {
                      initialValue: first_refund.refund_reason || '',
                    })(<Input placeholder="无" />)}
                  </FormItem>
                );
              })}
            <FormItem {...formItemLayout} label="谨慎点击首次付款">
              {data.first_refund_status === 'unpay' && (
                <Button
                  type="primary"
                  loading={submitting}
                  onClick={e => {
                    this.handleFirstRefundChange(e, 0, 'pay', data.first_refund_list);
                  }}
                >
                  设为已打款
                </Button>
              )}
            </FormItem>
            <Divider />
            <Divider>
              二次退款申请相关 （总状态：{data.refund_status}）(提交时间：
              {moment(data.refund_time).format('YYYY-MM-DD HH:mm:ss')})
            </Divider>
            {data.refund_list &&
              data.refund_list.length > 0 &&
              data.refund_list.map((refund, index) => {
                return (
                  <FormItem key={refund.jiafang_id} {...formItemLayout} label={`${refund.name}`}>
                    <img
                      style={{ width: '60px', height: '60px', marginRight: '10px' }}
                      src={refund.logo}
                    />
                    <img
                      style={{ width: '60px', height: '60px', marginRight: '10px' }}
                      onClick={e =>
                        window.open(
                          refund.refund_image.replace(
                            'pjgg8ntmh.bkt.clouddn.com',
                            'image.chaoqianwang.com'
                          )
                        )
                      }
                      src={refund.refund_image.replace(
                        'pjgg8ntmh.bkt.clouddn.com',
                        'image.chaoqianwang.com'
                      )}
                    />
                    {/* submit,pass,unpass */}
                    （当前状态图片状态：{refund.status || 'submit'}）
                    <Button
                      type="primary"
                      style={{ marginRight: '10px' }}
                      loading={submitting}
                      onClick={e => {
                        this.handleRefundChange(e, index, 'pass', data.refund_list);
                      }}
                    >
                      通过
                    </Button>
                    <Button
                      type="danger"
                      loading={submitting}
                      onClick={e => {
                        this.handleRefundChange(e, index, 'unpass', data.refund_list);
                      }}
                    >
                      不通过
                    </Button>
                    {/* <Input defaultValue={refund.reason || ''} placeholder='不通过原因' onChange={e => this.refundOnChange(e, data.refund_list[index])} /> */}
                    {getFieldDecorator(`refund_reason${index}`, {
                      initialValue: refund.refund_reason || '',
                    })(<Input placeholder="无" />)}
                  </FormItem>
                );
                //  <FormItem {...formItemLayout} label='甲方logo链接'>
                //   {getFieldDecorator(refund.jiafang_id, { initialValue: refund.logo || '' })()}
                // </FormItem>
              })}
            <FormItem {...formItemLayout} label="谨慎点击二次付款">
              {data.refund_status === 'unpay' && (
                <Button
                  type="primary"
                  loading={submitting}
                  onClick={e => {
                    this.handleRefundChange(e, 0, 'pay', data.refund_list);
                  }}
                >
                  设为已打款
                </Button>
              )}
            </FormItem>
            <Divider />
            refund_status first_refund_list first_refund_status
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button
                type="danger"
                loading={submitting}
                onClick={e => {
                  this.reset_user();
                }}
              >
                重置用户
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
