import {Button, Divider, Form, Input,Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from "react"
import Link from 'next/link'
import Router from 'next/router';
import cookie from 'react-cookies'
import "../node_modules/antd/dist/antd.css"
import Login from "./login";
React.useLayoutEffect = React.useEffect

function Newpw(){


    return (
        <div>
            <img src='/tmp.PNG' className='intropic' />
            <div className='content'>
                <div className='header'>Do not have account yet? <Link href='/register'>Sign Up</Link></div>
                <div className = 'password_body'>
                    <Form>
                        <span className='inline'>New Password</span>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                            style={{ width: 600 }}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="email"
                            />
                        </Form.Item>
                        <span className='inline'>Retype password</span>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please retype your new password!' }]}
                            style={{ width: 600 }}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="email"
                            />
                        </Form.Item>

                    </Form>

                </div>




            </div>
        </div>
    )
}

export default Newpw
