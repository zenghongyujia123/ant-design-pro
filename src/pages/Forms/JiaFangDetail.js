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
  Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, form }) => ({
  data: form.data,
  submitting: loading.effects['form/jiafangcreate'],
}))
@Form.create()

class BasicForms extends PureComponent {

  state = {
    data: {
    },
    status:''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.location.query._id) {
      dispatch({
        type: 'form/jiafangdetail',
        payload: {
          jiafang_id: this.props.location.query._id
        },
        callback: () => {
          this.setState({ status: this.props.data.status})
        }
      });
    }


    dispatch({
      type: 'form/uptoken',
    });

  }
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        dispatch({
          type: 'form/jiafangcreate',
          payload: { ...values, jiafang_id: this.props.location.query._id },
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
    const {  } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderWrapper
        title='编辑甲方'
        content='名字不能重复'
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='甲方名称'>{getFieldDecorator('name', { initialValue: data.name || '', rules: [{ required: true, message: '请输入甲方名称' }], })(<Input placeholder='请输入甲方名称' />)}</FormItem>
            <FormItem {...formItemLayout} label='甲方logo链接'>{getFieldDecorator('logo', { initialValue: data.logo || '', rules: [{ required: true, message: '请输入甲方logo链接' }], })(<Input placeholder='请输入甲方logo链接' />)}<img style={{width:'60px',height:'60px'}} src={ data.logo}></img></FormItem>
            <FormItem {...formItemLayout} label='甲方退款失败示列图'>{getFieldDecorator('failed_img', { initialValue: data.failed_img || '', rules: [{ required: true, message: '请输入甲方退款失败示列图' }], })(<Input placeholder='请输入甲方退款失败示列图' />)}<img style={{width:'60px',height:'60px'}} src={ data.failed_img}></img></FormItem>
            

            <FormItem {...formItemLayout} label='甲方链接'>{getFieldDecorator('url', { initialValue: data.url || '', rules: [{ required: true, message: '请输入甲方链接' }], })(<Input placeholder='请输入甲方链接' />)}</FormItem>
            <FormItem {...formItemLayout} label='短链接'>{getFieldDecorator('url_short', { initialValue: data.url_short || '' })(<Input disabled placeholder='短链接自动生成' />)}</FormItem>
            <FormItem {...formItemLayout} label='可统计链接'>{getFieldDecorator('url_tongji', { initialValue: data.url_tongji || '' })(<Input disabled placeholder='可统计链接自动生成' />)}</FormItem>
            <FormItem {...formItemLayout} label='甲方描述'>{getFieldDecorator('desc', { initialValue: data.desc || '', rules: [{ required: true, message: '请输入甲方描述' }], })(<Input placeholder='请输入甲方描述' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他1'>  {getFieldDecorator('str1', { initialValue: data.str1 || '' })(<Input placeholder='请输入其他1' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他2'>{getFieldDecorator('str2', { initialValue: data.str2 || '' })(<Input placeholder='请输入其他2:甲方次付，甲方推荐' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他3'>{getFieldDecorator('str3', { initialValue: data.str3 || '' })(<Input placeholder='请输入其他3' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他4'>  {getFieldDecorator('str4', { initialValue: data.str4 || '' })(<Input placeholder='请输入其他4' />)}</FormItem>

            <FormItem {...formItemLayout} label='贷超其他1'>  {getFieldDecorator('d_str1', { initialValue: data.d_str1 || '' })(<Input placeholder='2000-20000' />)}</FormItem>
            <FormItem {...formItemLayout} label='贷超其他2'>  {getFieldDecorator('d_str2', { initialValue: data.d_str2 || '' })(<Input placeholder='日息0.01%' />)}</FormItem>
            <FormItem {...formItemLayout} label='贷超其他3'>  {getFieldDecorator('d_str3', { initialValue: data.d_str3 || '' })(<Input placeholder='2004人申请通过' />)}</FormItem>
            <FormItem {...formItemLayout} label='贷超其他4'>  {getFieldDecorator('d_str4', { initialValue: data.d_str4 || '' })(<Input placeholder='7-30天' />)}</FormItem>
            <FormItem {...formItemLayout} label='贷超其他5'>  {getFieldDecorator('d_str5', { initialValue: data.d_str5 || '' })(<Input placeholder='节钱极速通道，10分钟必须下款' />)}</FormItem>
             <FormItem {...formItemLayout} label='贷超其他6'>  {getFieldDecorator('d_str6', { initialValue: data.d_str6 || '' })(<Input placeholder='请输入贷超其他6' />)}</FormItem> 
             <FormItem {...formItemLayout} label='贷超其他7'>  {getFieldDecorator('d_str7', { initialValue: data.d_str7 || '' })(<Input placeholder='如果放入贷超就写贷超' />)}</FormItem> 
            <FormItem {...formItemLayout} label='状态'>  {getFieldDecorator('status', { initialValue: data.status || '' })(<Input placeholder='valid invalid' />)}</FormItem> 

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
