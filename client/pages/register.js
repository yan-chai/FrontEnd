import {Button, Divider, Form, Input,Checkbox} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import React from "react"
React.useLayoutEffect = React.useEffect

function Login() {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

    return(
        <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/tmp.PNG' className='intropic' />
            <div className='content'>
                <div className='header'>Already have an Account? <a href='/register'>Sign in</a></div>
                <div className='auth'><Button size='large'>Sign up With Google</Button><Button size='large'>Sign up With Twitter</Button></div>
                <Divider plain>Or</Divider>
                <div className='form'>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <span className='inline'>Name</span>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                  </Form.Item>
                  <span className='inline'>Email</span>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                  >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                  </Form.Item>
                  <span className='inline'>Password</span>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <span className="login-form-forgot" href="">
                      Use 8 Character or More
                    </span>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" size='large'>
                      Create New Account
                    </Button>
                    Or <a href="/">Back to Home Page</a>
                  </Form.Item>
                </Form>
                </div>
            </div>

        </div>
    )
}

export default Login
