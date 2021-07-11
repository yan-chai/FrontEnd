import {Button, Divider, Form, Input,Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
            <img src='/tmp.PNG' className='intropic' />
            <div className='content'>
                <div className='header'>Do not have account yet? <a href='/register'>Sign Up</a></div>
                <div className='auth'><Button size='large'>Sign in With Google</Button><Button size='large'>Sign in With Twitter</Button></div>
                <Divider plain>Or</Divider>
                <div className='form'>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <span className='inline'>Email</span>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      Forgot password
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                    Or <a href="">register now!</a>
                  </Form.Item>
                </Form>
                </div>
            </div>
            
        </div>
    )
}

export default Login