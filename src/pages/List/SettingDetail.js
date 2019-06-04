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
  Tabs,
  Popconfirm,
  message,
  Upload,
  Tooltip,
  Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const confirm = Modal.confirm;
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
    e.preventDefault();
    this.showConfirm()
  };

  showConfirm() {
    let that= this;
    confirm({
      title: '慎重提示！！',
      content: '确定要保存吗？请谨慎修改！！！！',
      onOk() {
        const { dispatch, form } = that.props;
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            dispatch({
              type: 'rule/set_setting',
              payload: values,
            });
          }
        });
      },
      onCancel() { },
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
    const { } = this.state;

    return (
      <PageHeaderWrapper
        title='系统设置'
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="价格" key="1">
            <Card>
              <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem {...formItemLayout} label='首次付款金额'>{getFieldDecorator('first_pay.amount', { initialValue: data.first_pay ? data.first_pay.amount : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>
                <FormItem {...formItemLayout} label='首次付款原价'>{getFieldDecorator('first_pay.source_amount', { initialValue: data.first_pay ? data.first_pay.source_amount : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>
                <FormItem {...formItemLayout} label='首次付款名称'>{getFieldDecorator('first_pay.productname', { initialValue: data.first_pay ? data.first_pay.productname : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
                <FormItem {...formItemLayout} label='首次付款类型'>{getFieldDecorator('first_pay.producttype', { initialValue: data.first_pay ? data.first_pay.producttype : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
                <FormItem {...formItemLayout} label='首次付款跳转'>{getFieldDecorator('first_pay.url', { initialValue: data.first_pay ? data.first_pay.url : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
                <FormItem {...formItemLayout} label='首次付款协议'>{getFieldDecorator('first_pay.xieyi_title', { initialValue: data.first_pay ? data.first_pay.xieyi_title : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
                <FormItem {...formItemLayout} label='首次付款协议url'>{getFieldDecorator('first_pay.xieyi_image', { initialValue: data.first_pay ? data.first_pay.xieyi_image : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>

                <FormItem {...formItemLayout} label='二次付款金额'>{getFieldDecorator('second_pay.amount', { initialValue: data.second_pay ? data.second_pay.amount : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>
                <FormItem {...formItemLayout} label='二次付款原价'>{getFieldDecorator('second_pay.source_amount', { initialValue: data.second_pay ? data.second_pay.source_amount : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>
                <FormItem {...formItemLayout} label='二次付款名称'>{getFieldDecorator('second_pay.productname', { initialValue: data.second_pay ? data.second_pay.productname : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
                <FormItem {...formItemLayout} label='二次付款类型'>{getFieldDecorator('second_pay.producttype', { initialValue: data.second_pay ? data.second_pay.producttype : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
                <FormItem {...formItemLayout} label='二次付款跳转'>{getFieldDecorator('second_pay.url', { initialValue: data.second_pay ? data.second_pay.url : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
                <FormItem {...formItemLayout} label='二次付款协议'>{getFieldDecorator('second_pay.xieyi_title', { initialValue: data.second_pay ? data.second_pay.xieyi_title : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input disabled />)}</FormItem>
                <FormItem {...formItemLayout} label='二次付款协议url'>{getFieldDecorator('second_pay.xieyi_image', { initialValue: data.second_pay ? data.second_pay.xieyi_image : '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input />)}</FormItem>

                <FormItem {...formItemLayout} label='注册协议'>{getFieldDecorator('zhuce_image', { initialValue: data.zhuce_image|| '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input  />)}</FormItem>
                <FormItem {...formItemLayout} label='隐私协议'>{getFieldDecorator('yinsi_image', { initialValue: data.yinsi_image|| '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input  />)}</FormItem>
                <FormItem {...formItemLayout} label='是否贷超'>{getFieldDecorator('shifou_daichao', { initialValue: data.shifou_daichao|| '', rules: [{ required: true, message: '是否贷超' }], })(<Input  />)}</FormItem>

                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  {/* <Popconfirm placement="top" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
                    <Button>Top</Button>
                  </Popconfirm> */}
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    保存
              </Button>
                </FormItem>
              </Form>
            </Card>
          </TabPane>
          <TabPane tab="app" key="2">
            <Card>
              <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem {...formItemLayout} label='Android Url'>{getFieldDecorator('app_info.android_url', { initialValue: data.app_info ? data.app_info.android_url : '', rules: [{ required: true, message: '请输入android链接' }], })(<Input />)}</FormItem>
                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    保存
              </Button>
                </FormItem>
              </Form>
            </Card>
          </TabPane>
        </Tabs>,
       </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
