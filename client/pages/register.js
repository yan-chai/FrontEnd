import {Button, Divider, Form, Input,Checkbox} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import React from "react"
import Link from 'next/link'
import Router from 'next/router'
import "../node_modules/antd/dist/antd.css"
React.useLayoutEffect = React.useEffect

function Register() {

  async function onFinish(values) {
    if(values.password.length < 8) {
      alert("Password Should be 8 Character or More")
    } else {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": values.email,
          "pwd": values.password,
          "name": values.username,
          "city": 0
        })
      });
      const data = await response.json();
  
      if (data.code == 0) {
        alert(data.message);
      }else if (data.code == 200) {
        alert(data.message);
        Router.push("/login")
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

    return(
        <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/tmp.PNG' className='intropic' />
            <div className='content'>
                <div className='header'>Already have an Account? <Link href='/login'>Sign in</Link></div>
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
                    Or <Link href="/">Back to Home Page</Link>
                  </Form.Item>
                </Form>
                </div>
            </div>

        </div>
    )
}

export default Register
