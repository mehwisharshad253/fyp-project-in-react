import React, { useState } from 'react'
import {
  Modal,
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import './styles.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { BaseUrl } from '../../config'
import { Link, useHistory } from 'react-router-dom';


// ant design

const { Option } = Select;



const LoginModal = ({
  modalVisible,
  hideModal
}) => {


  // using form hooks


  const history = useHistory()
  const [form] = Form.useForm();



  // component states   
  const [isLoginShow, setisLoginShow] = useState(true)
  const [isSignupShow, setisSignupShow] = useState(false)


  // component functions
  const loginHandle = (e) => {
    e.preventDefault()

  }



  const onFinishSignup = (values) => {
    console.log('sing up:', values);

    fetch(`${BaseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then((resp) => {
        if (resp.success) {

          console.log(resp.user.role);
          localStorage.setItem('userToken', resp.token)
          localStorage.setItem('userDetails', JSON.stringify(resp.user))
   

          hideModal()
        }
      }).catch(err => {
        console.log(err)
      })

  };

  //signin fetch


  //signin fetch end


  const onFinishLogin = (values) => {
    fetch(`${BaseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then((resp) => {
        if (resp.success) {
          console.log(resp);
          localStorage.setItem('userToken', resp.token)
          localStorage.setItem('userDetails', JSON.stringify(resp.user))
          if (resp.user.role == 'admin') {
            history.push('/dashboard')
          }else{
            history.push('/') 
          }
          hideModal()
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  // @showing signup page
  const showRegisterPage = () => {
    setisLoginShow(false)
    setisSignupShow(true)
  }



  // @showing login page

  const showLoginPage = () => {
    setisSignupShow(false)
    setisLoginShow(true)
  }



  // layout

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="92">+92</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );



  return (
    <Modal
      open={modalVisible}
      onOk={loginHandle}
      onCancel={hideModal}
      okText='Login'
      okButtonProps={{
        hidden: true
      }}
      cancelButtonProps={{
        hidden: true
      }}

    >
      {
        isLoginShow && (
          <div>
            <div className='login__headertext'>
              <h4>Login To Your Account</h4>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishLogin}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

                <Link className="login-form-forgot" to='forgot-password'>
                  Forgot password
                </Link>
              </Form.Item>

              <Form.Item className='d-flex'>
                <Button size='large' type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>

              </Form.Item>
              Or <button onClick={showRegisterPage}>register now!</button>


            </Form>

          </div>

        )
      }

      {
        isSignupShow && (
          <div>
            <div className='login__headertext'>
              <h4>Sign up</h4>
            </div>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinishSignup}
              initialValues={{ residence: [''], prefix: '86' }}
              style={{ maxWidth: 600 }}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[

                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ]}
              >
                <Input placeholder='Enter Name' className='border' />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input placeholder='Enter Email' className='border' />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder='Enter Password' />
              </Form.Item>

              <Form.Item
                name="password"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[

                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder='Enter Password' />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input placeholder='Phone Number' className='border' addonBefore={prefixSelector} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender!' }]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button size='large' type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
            <button onClick={showLoginPage}>Already Have an Account ? Login</button>
          </div>
        )
      }
    </Modal>
  )
}

export default LoginModal



