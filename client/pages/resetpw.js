import {Button, Divider, Form, Input,Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from "react"
import Link from 'next/link'
import Router from 'next/router';
import cookie from 'react-cookies'
import "../node_modules/antd/dist/antd.css"
import Login from "./login";
React.useLayoutEffect = React.useEffect

function Password(){

    async function onFinish(values) {
        const response = await fetch('/api/resetpw', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email": values.email
            })
          });
          const data = await response.json();
        if (data.code == 0) {
            alert(data.message);
        }else if (data.code == 200) {
            alert(data.message);
            Router.push('/login')
        }
    }

    return (
        <div>
            <img src='/tmp.PNG' className='intropic' />
            <div className='content'>
                <div className='header'>Do not have account yet? <Link href='/register'>Sign Up</Link></div>
                <div className = 'password_body'>
                    <p className='password_p1'>Forgot your password?</p>
                    <p className = 'password_p2'>Enter the email address you used when you joined and we’ll send
                        you instructions to reset your password.</p>
                    <br/>

                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <span className='inline'>Email</span>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                            style={{ width: 600 }}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                SEND RESET INSTRUCTIONS
                            </Button>
                        </Form.Item>
                    </Form>

                </div>

            </div>
        </div>
    )
}

export default Password
