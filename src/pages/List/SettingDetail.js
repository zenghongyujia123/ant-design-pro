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
  // message,
  Upload,
  Tooltip,
  Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, rule }) => ({
  data: rule.data,
  submitting: loading.effects['rule/set_setting'],
}))
@Form.create()

class BasicForms extends PureComponent {

  state = {
    data: {
      first_pay: {},
      second_pay: {}
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/get_setting',
      payload: {
      },
    });

  }
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'rule/set_setting',
          payload: values,
        });
      }
    });
  };



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
    const { } = this.state;

    return (
      <PageHeaderWrapper
        title='系统设置'
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='首次付款金额'>{getFieldDecorator('first_pay.amount', { initialValue: data.first_pay ? data.first_pay.amount : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='首次付款原价'>{getFieldDecorator('first_pay.source_amount', { initialValue: data.first_pay ? data.first_pay.source_amount : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='首次付款名称'>{getFieldDecorator('first_pay.productname', { initialValue: data.first_pay ? data.first_pay.productname : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
            <FormItem {...formItemLayout} label='首次付款类型'>{getFieldDecorator('first_pay.producttype', { initialValue: data.first_pay ? data.first_pay.producttype : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
            <FormItem {...formItemLayout} label='首次付款跳转'>{getFieldDecorator('first_pay.url', { initialValue: data.first_pay ? data.first_pay.url : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
            <FormItem {...formItemLayout} label='首次付款协议'>{getFieldDecorator('first_pay.xieyi_title', { initialValue: data.first_pay ? data.first_pay.xieyi_title : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
            <FormItem {...formItemLayout} label='首次付款协议url'>{getFieldDecorator('first_pay.xieyi_image', { initialValue: data.first_pay ? data.first_pay.xieyi_image : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>

            <FormItem {...formItemLayout} label='二次付款金额'>{getFieldDecorator('second_pay.amount', { initialValue: data.second_pay ? data.second_pay.amount : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='二次付款原价'>{getFieldDecorator('second_pay.source_amount', { initialValue: data.second_pay ? data.second_pay.source_amount : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>
            <FormItem {...formItemLayout} label='二次付款名称'>{getFieldDecorator('second_pay.productname', { initialValue: data.second_pay ? data.second_pay.productname : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
            <FormItem {...formItemLayout} label='二次付款类型'>{getFieldDecorator('second_pay.producttype', { initialValue: data.second_pay ? data.second_pay.producttype : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
            <FormItem {...formItemLayout} label='二次付款跳转'>{getFieldDecorator('second_pay.url', { initialValue: data.second_pay ? data.second_pay.url : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
            <FormItem {...formItemLayout} label='二次付款协议'>{getFieldDecorator('second_pay.xieyi_title', { initialValue: data.second_pay ? data.second_pay.xieyi_title : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
            <FormItem {...formItemLayout} label='二次付款协议url'>{getFieldDecorator('second_pay.xieyi_image', { initialValue: data.second_pay ? data.second_pay.xieyi_image : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>







            {/* <FormItem {...formItemLayout} label='甲方链接'>{getFieldDecorator('url', { initialValue: data.url || '', rules: [{ required: true, message: '请输入甲方链接' }], })(<Input placeholder='请输入甲方链接' />)}</FormItem> */}
            {/* <FormItem {...formItemLayout} label='短链接'>{getFieldDecorator('url_short', { initialValue: data.url_short || '' })(<Input disabled placeholder='短链接自动生成' />)}</FormItem>
            <FormItem {...formItemLayout} label='甲方描述'>{getFieldDecorator('desc', { initialValue: data.desc || '', rules: [{ required: true, message: '请输入甲方描述' }], })(<Input placeholder='请输入甲方描述' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他1'>  {getFieldDecorator('str1', { initialValue: data.str1 || '' })(<Input placeholder='请输入其他1' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他2'>{getFieldDecorator('str2', { initialValue: data.str2 || '' })(<Input placeholder='请输入其他2' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他3'>{getFieldDecorator('str3', { initialValue: data.str3 || '' })(<Input placeholder='请输入其他3' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他4'>  {getFieldDecorator('str4', { initialValue: data.str4 || '' })(<Input placeholder='请输入其他4' />)}</FormItem> */}
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
