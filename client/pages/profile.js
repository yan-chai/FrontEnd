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

const { SubMenu } = Menu;

const Profile = ({profile}) => {
    const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };

    async function onFinish(values) {
        console.log(values.city)
        const URL = '/api/user?token='+cookie.load('token');
        const response = await fetch(URL, {
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
          }else if (data.code == 200) {
            alert(data.message);
          }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (profile.code == 200) {
        return (
            <div>
                <Row className="homeHeader">
                    <Col><img className="img" src="../city.png"></img></Col>
                    <Col span={10}/>
                    <Col span={12} className="banner">
                        {/*<Menu mode="horizontal">*/}
                        {/*    <Menu.Item key="newTicket" icon={<MailOutlined />}>*/}
                        {/*        New Ticket*/}
                        {/*    </Menu.Item>*/}
                        {/*</Menu>*/}
                        <Button type="primary">Create a New Ticket</Button>
                    </Col>
                </Row>
                <Divider />
                <br />
                <Row >
                    <Col className= "home_navy">
                        <Switch onChange={changeMode} /> Change Mode
                        <Divider type="vertical" />
                        <Switch onChange={changeTheme} /> Change Style
                        <br />
                        <br />
                        <Menu
                            style={{ width: 256}}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode={mode}
                            theme={theme}
                        >
                            <Menu.Item key="1" icon={<MailOutlined />}>
                                Navigation One
                            </Menu.Item>
                            <Menu.Item key="2" icon={<CalendarOutlined />}>
                                Navigation Two
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                                <SubMenu key="sub1-2" title="Submenu">
                                    <Menu.Item key="5">Option 5</Menu.Item>
                                    <Menu.Item key="6">Option 6</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
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
                                    <Select defaultValue="0">
                                        <Select.Option value="0">San Francisco</Select.Option>
                                        <Select.Option value="1">Los Angeles</Select.Option>
                                        <Select.Option value="2">San Jose</Select.Option>
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

    const token = ctx.query.token;
    const URL = "http://127.0.0.1:3000/api/user?token="+token;
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
