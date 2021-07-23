import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select} from 'antd';
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
import cookie from 'react-cookies';
import Navybar from "./components/navybar";

const { SubMenu } = Menu;
function Ticket(){

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
    return(
        <div>
            <Row className="homeHeader">
                <Col><img className="img" src="../city.png"></img></Col>
                <Col span={10}/>
                <Col span={12} className="banner">
                    <Button type="primary">Create a New Ticket</Button>
                </Col>
            </Row>
            <Divider />
            <br />
            <Row >

                <Navybar></Navybar>

                <Divider type="vertical" />
                <Col class = 'profile_content' span={8}>
                    <div className='form'>
                        <Form
                            name="ticket"
                            className="ticket-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <span className='inline'>Title *</span>

                                    <Form.Item
                                        name="pageName"
                                        rules={[{ required: true, message: 'Please input your page name!' }]}
                                    >
                                        <Input className='pageName'/>
                                    </Form.Item>



                            <span className='inline'>State*</span>
                            <Form.Item
                                rules={[{ required: true, message: 'Please select state' }]}
                            >

                                <Select defaultValue="CA">
                                    <Select.Option value="CA">CA</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>City*</span>
                            <Form.Item
                                name='city'
                                rules={[{ required: true, message: 'Please select city' }]}
                            >
                                <Select defaultValue="0">
                                    <Select.Option value="0">San Francisco</Select.Option>
                                    <Select.Option value="1">Los Angeles</Select.Option>
                                    <Select.Option value="2">San Jose</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Type*</span>
                            <Form.Item
                                name='type'
                                rules={[{ required: true, message: 'Please select ticket type' }]}
                            >
                                <Select defaultValue="0">
                                    <Select.Option value="0">Education</Select.Option>
                                    <Select.Option value="1">Government</Select.Option>
                                    <Select.Option value="2">Entertainment</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Status*</span>
                            <Form.Item
                                name='status'
                                rules={[{ required: true, message: 'Please select ticket' }]}
                            >
                                <Select defaultValue="0">
                                    <Select.Option value="0">Open</Select.Option>
                                    <Select.Option value="1">Private</Select.Option>
                                    <Select.Option value="2">Closed</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Priority*</span>
                            <Form.Item
                                name='priority'
                                rules={[{ required: true, message: 'Please select ticket priority' }]}
                            >
                                <Select defaultValue="0">
                                    <Select.Option value="0">Low</Select.Option>
                                    <Select.Option value="1">Medium</Select.Option>
                                    <Select.Option value="2">High</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Description*</span>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your description here' }]}
                            >
                                <textarea className='description'/>
                            </Form.Item>

                            <span className='inline'>Tags</span>
                                    <Form.Item
                                        name="ticketTag"
                                        rules={[{ required: false}]}
                                    >
                                        <Input className='ticketTag'/>
                                    </Form.Item>

                        </Form>
                        <div><Button size='large'>CANCEL</Button><Button size='large'>CREATE</Button></div>
                    </div>

                </Col>
            </Row>
        </div>
    );
}

export default Ticket
