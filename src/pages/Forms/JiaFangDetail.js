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


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, form }) => ({
  fileList: form.fileList,
  data: form.data,
  submitting: loading.effects['form/jiafangcreate'],
}))
@Form.create()

class BasicForms extends PureComponent {

  state = {
    previewVisible: false,
    previewImage: '',
    data: {},
    fileList: this.props.fileList,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.location.query._id) {
      dispatch({
        type: 'form/jiafangdetail',
        payload: {
          jiafang_id: this.props.location.query._id
        },
        callback: (fileList) => {
          this.setState({ fileList })
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

  handleLogoChange = ({ fileList }) => {
    this.setState({ fileList });
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
    const { previewVisible, previewImage, fileList } = this.state;
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
            <FormItem {...formItemLayout} label='甲方描述'>{getFieldDecorator('desc', { initialValue: data.desc || '', rules: [{ required: true, message: '请输入甲方描述' }], })(<Input placeholder='请输入甲方描述' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他1'>  {getFieldDecorator('str1', { initialValue: data.str1 || '' })(<Input placeholder='请输入其他1' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他2'>{getFieldDecorator('str2', { initialValue: data.str2 || '' })(<Input placeholder='请输入其他2' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他3'>{getFieldDecorator('str3', { initialValue: data.str3 || '' })(<Input placeholder='请输入其他3' />)}</FormItem>
            <FormItem {...formItemLayout} label='其他4'>  {getFieldDecorator('str4', { initialValue: data.str4 || '' })(<Input placeholder='请输入其他4' />)}</FormItem>
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
