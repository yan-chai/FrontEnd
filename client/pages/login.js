import {Button, Divider, Form, Input,Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from "react"
import Link from 'next/link'
import Router from 'next/router';
import cookie from 'react-cookies'
import "../node_modules/antd/dist/antd.css"
React.useLayoutEffect = React.useEffect

function Login() {

  async function onFinish(values) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": values.username,
        "pwd": values.password
      })
    });
    const data = await response.json();
    if (data.code == 403) {
      alert(data.message);
    }else if (data.code == 200) {
      alert(data.message);
      Router.push("/home");
    } else if (data.code == 500) {
      alert("Server Error!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return(
      <div>
        <img src='/tmp.PNG' className='intropic' />
        <div className='content'>
          <div className='header'>Do not have account yet? <Link href='/register'>Sign Up</Link></div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
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

                <Link className="login-form-forgot" href="/resetpw">
                  Forgot password
                </Link>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: 150 }}>
                  LOG IN
                </Button>
                Or <Link href="/register">Register Now!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>

      </div>
  )
}

export default Login
