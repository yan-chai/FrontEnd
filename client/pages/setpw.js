import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Checkbox,Select} from 'antd';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined, UserOutlined, LockOutlined,
} from '@ant-design/icons';
import "../node_modules/antd/dist/antd.css"
import React from "react";
import Router from 'next/router';
import Link from 'next/link';
import cookie from 'react-cookies';
import { withRouter } from 'next/router';
import Navybar from "./components/navybar";
import Header from "./components/header";

const Profile = () => {

    async function onFinish(values) {
        if(values.pw1 != values.pw2) {
            alert("The two passwords you typed do not match")
        } else if (values.pw1.length < 8) {
            alert("Password Should be 8 Character or More")
        }
        else {
            const response = await fetch("api/user/pwd", {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "pwd": values.pw1
                })
              });
              const data = await response.json();
    
              if (data.code == 200) {
                alert(data.message);
                Router.push("/login")
              }else if (data.code == 200) {
                alert(data.message);
              }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
            <div>
                <Header/>
                <Divider />
                <br />
                <Row >
                   <Navybar/>
                    <Divider type="vertical" />
                    <Col class = 'profile_content' span={8}>
                        <div className='form'>
                        <Form
                        onFinish={onFinish}>
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

                    </Col>
                </Row>
            </div>
        );
};

export default withRouter(Profile);
