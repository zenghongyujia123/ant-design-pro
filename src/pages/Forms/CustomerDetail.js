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
        type: 'form/customerdetail',
        payload: {
          customer_id: this.props.location.query._id
        },
        callback: () => {
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
          type: 'form/customercreate',
          payload: { ...values, _id: this.props.location.query._id },
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
        title='编辑客服'
        content='名字不能重复'
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='客服用户名'>  {getFieldDecorator('username', { initialValue: data.username || '' ,rules: [{ required: true, message: '请输入username' }], })(<Input placeholder='username' />)}</FormItem>
            <FormItem {...formItemLayout} label='客服密码'>{getFieldDecorator('password', { initialValue: data.password || '', rules: [{ required: true, message: '请输入password' }], })(<Input placeholder='password' />)}</FormItem>
            <FormItem {...formItemLayout} label='客服角色'>{getFieldDecorator('customer_role', { initialValue: data.customer_role || '' , rules: [{ required: true, message: '请输入role' }],})(<Input placeholder='role' />)}</FormItem>
            <FormItem {...formItemLayout} label='客服状态'>  {getFieldDecorator('status', { initialValue: data.status || '' , rules: [{ required: true, message: '请输入status' }],})(<Input placeholder='status' />)}</FormItem>
            <FormItem {...formItemLayout} label='客服姓名'>  {getFieldDecorator('name', { initialValue: data.name || '' , rules: [{ required: true, message: '请输入name' }],})(<Input placeholder='name' />)}</FormItem>
            <FormItem {...formItemLayout} label='客服手机'>  {getFieldDecorator('phone', { initialValue: data.phone || '' , rules: [{ required: true, message: '请输入phone' }],})(<Input placeholder='phone' />)}</FormItem>
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
