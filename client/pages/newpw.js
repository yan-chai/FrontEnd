import {Button, Divider, Form, Input,Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from "react"
import Link from 'next/link'
import Router from 'next/router';
import cookie from 'react-cookies'
import "../node_modules/antd/dist/antd.css"
import Login from "./login";
import { withRouter, useRouter } from 'next/router';
React.useLayoutEffect = React.useEffect

function Newpw(){
    const router = useRouter()
    const {token} = router.query
    async function onFinish(value) {
        if(value.pw1.length < 8) {
            alert("Password Should be 8 Character or More")
          } else if (value.pw1 != value.pw2) {
            alert("The two passwords you typed do not match")
          }
          else {
            const response = await fetch('/api/user/recoverPwd', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "pwd": value.pw1,
                "token": token
              })
            });
            const data = await response.json();
      
            if (data.code == 200) {
              alert(data.message);
              Router.push("/login")
            }else {
              alert(data.message);
            }
          }
    }


    return (
        <div>
            <img src='/tmp.PNG' className='intropic' />
            <div className='content'>
                <div className='header'>Do not have account yet? <Link href='/register'>Sign Up</Link></div>
                <div className = 'password_body'>
                    <Form onFinish={onFinish}>
                        <span className='inline'>New Password</span>
                        <Form.Item
                            name="pw1"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                            style={{ width: 600 }}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                            />
                        </Form.Item>
                        <span className='inline'>Retype password</span>
                        <Form.Item
                            name="pw2"
                            rules={[{ required: true, message: 'Please retype your new password!' }]}
                            style={{ width: 600 }}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                SUBMIT
                            </Button>
                        </Form.Item>

                    </Form>
                </div>

            </div>
        </div>
    )
}

export default Newpw
