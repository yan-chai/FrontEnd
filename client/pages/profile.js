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

const { SubMenu } = Menu;

const Profile = ({profile}) => {

    function defaultCity(id) {
        if(id==1) {
            return "San Francisco"
        } else if (id == 2) {
            return "Los Angeles"
        } else if (id == 3) {
            return "San Jose"
        }
    }

    async function onFinish(values) {
        const response = await fetch("/api/user/setting", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email": values.email,
              "name": values.name,
              "city": values.city
            })
          });
          const data = await response.json();

          if (data.code == 200) {
            alert(data.message);
            Router.push("/login")
          }else if (data.code != 200) {
            alert(data.message);
          }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (profile.code == 200) {
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
                                name="profile"
                                className="profile-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <span className='inline'>Your Name</span>
                                <Row>
                                    <Col>
                                        <Form.Item
                                            name="name"
                                            rules={[{ required: true, message: 'Please input your name!' }]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} defaultValue={profile.data.name}/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <span className='inline'>Email</span>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your Email!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="email"
                                        defaultValue={profile.data.email}
                                    />
                                </Form.Item>

                                <span className='inline'>Country</span>
                                <Form.Item>
                                    <Select defaultValue="USA">
                                        <Select.Option value="usa">USA</Select.Option>
                                    </Select>
                                </Form.Item>

                                <span className='inline'>City</span>
                                <Form.Item name='city'>
                                    <Select defaultValue={defaultCity(profile.data.CityId)}>
                                        <Select.Option value="1">San Francisco</Select.Option>
                                        <Select.Option value="2">Los Angeles</Select.Option>
                                        <Select.Option value="3">San Jose</Select.Option>
                                    </Select>
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" >
                                        Save Changes
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                    </Col>
                </Row>
            </div>
        );
    } else {
        return (
            <div>
                <h1>{profile.message}</h1>
                <Link href='/login'>Log in</Link>
            </div>
        )
    }


};

Profile.getInitialProps = async (ctx) => {

    const URL = "http://127.0.0.1:3000/api/user/setting";
    const res = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const json = await res.json();
    return {profile: json}
}
export default withRouter(Profile);
