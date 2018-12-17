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
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, form }) => ({
  data: form.data,
  submitting: loading.effects['form/yifangcreate'],
}))
@Form.create()
class BasicForms extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.location.query._id) {
      dispatch({
        type: 'form/yifangdetail',
        payload: {
          yifang_id: this.props.location.query._id
        }
      });
    }
  }
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/yifangcreate',
          payload: { ...values, yifang_id: this.props.location.query._id || '' },
        });
      }
    });
  };

  render() {
    const { submitting, data } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

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

    return (
      <PageHeaderWrapper
        title='添加乙方'
        content='用户名不能重复'
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='用户名'>{getFieldDecorator('username', { initialValue: data.username || '', rules: [{ required: true, message: '请输入用户名' }], })(<Input placeholder='请输入用户名' />)}</FormItem>
            <FormItem {...formItemLayout} label='密码'>{getFieldDecorator('password', { initialValue: data.password || '', rules: [{ required: true, message: '请输入密码' }], })(<Input placeholder='请输入密码' />)}</FormItem>
            <FormItem {...formItemLayout} label='公司名'>{getFieldDecorator('nickname', { initialValue: data.nickname || '', rules: [{ required: true, message: '请输入公司名' }], })(<Input placeholder='请输入公司名' />)}</FormItem>
            <FormItem {...formItemLayout} label='联系人'>{getFieldDecorator('lianxiren_name', { initialValue: data.lianxiren_name || '', })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='联系电话'>{getFieldDecorator('lianxiren_phone', { initialValue: data.lianxiren_phone || '', })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='联系微信'>{getFieldDecorator('lianxiren_weixin', { initialValue: data.lianxiren_weixin || '', })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='其他1'>{getFieldDecorator('str1', { initialValue: data.str1 || '', })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='其他2'>{getFieldDecorator('str2', { initialValue: data.str2 || '', })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='其他3'>{getFieldDecorator('str3', { initialValue: data.str3 || '', })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='其他4'>{getFieldDecorator('str4', { initialValue: data.str4 || '', })(<Input />)}</FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
