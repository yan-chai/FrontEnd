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

const { SubMenu } = Menu;

const Profile = () => {
    const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


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
                <Col class = 'profile_content'>
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
                                        name="firstname"
                                        rules={[{ required: true, message: 'Please input your firstname!' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
                                    </Form.Item>
                                </Col>

                                <Col>
                                    <Form.Item
                                        name="lastname"
                                        rules={[{ required: true, message: 'Please input your lastname!' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
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
                                    placeholder="email"
                                />
                            </Form.Item>

                            <span className='inline'>Country</span>
                            <Form.Item>
                                <Select>
                                    <Select.Option value="usa">USA</Select.Option>
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
};

export default Profile;
