import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select} from 'antd';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined, UserOutlined, LockOutlined,
} from '@ant-design/icons';
import "../node_modules/antd/dist/antd.css"
import Router from 'next/router';
import cookie from 'react-cookies';
import Navybar from "./components/navybar";
import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';
const libraries = ["places"];

const { SubMenu } = Menu;

const center = {
    lat: 36.4122,
    lng: -121.4741,
}
const mapContainerStyle = {
    width: "50vw",
    height: "50vh"
}
function Ticket(){

    {/*const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };*/}

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.google_api_key ,
        libraries,
    });

    const [lat, setLat] = React.useState(36.4122);
    const [lng, setLng] = React.useState(-121.4741);
    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";

    async function onFinish(values) {
        const token = cookie.load("token");
        const URL = "http://127.0.0.1:3000/api/ticket?token="+token;
        const response = await fetch(URL , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "title": values.title,
              "city": values.city,
              "lat": lat,
              "long": lng,
              "content": values.desc,
              "type": values.type,
              "priority": values.priority,
              "status": values.status
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
                <Col className = 'profile_content' span={14}>
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
                                        name="title"
                                        rules={[{ required: true, message: 'Please input your page name!' }]}
                                    >
                                        <Input className='pageName'/>
                                    </Form.Item>



                            <span className='inline'>State*</span>
                            <Form.Item
                                rules={[{ required: true, message: 'Please select state' }]}
                                name="state"
                            >

                                <Select>
                                    <Select.Option value="CA">CA</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>City*</span>
                            <Form.Item
                                name='city'
                                rules={[{ required: true, message: 'Please select city' }]}
                            >
                                <Select>
                                    <Select.Option value="1">San Francisco</Select.Option>
                                    <Select.Option value="2">Los Angeles</Select.Option>
                                    <Select.Option value="3">San Jose</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Type*</span>
                            <Form.Item
                                name='type'
                                rules={[{ required: true, message: 'Please select ticket type' }]}
                            >
                                <Select>
                                    <Select.Option value="1">Education</Select.Option>
                                    <Select.Option value="2">Government</Select.Option>
                                    <Select.Option value="3">Entertainment</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Status*</span>
                            <Form.Item
                                name='status'
                                rules={[{ required: true, message: 'Please select ticket' }]}
                            >
                                <Select>
                                    <Select.Option value="0">Open</Select.Option>
                                    <Select.Option value="1">Closed</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Priority*</span>
                            <Form.Item
                                name='priority'
                                rules={[{ required: true, message: 'Please select ticket priority' }]}
                            >
                                <Select>
                                    <Select.Option value="0">Low</Select.Option>
                                    <Select.Option value="1">Medium</Select.Option>
                                    <Select.Option value="2">High</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Description*</span>
                            <Form.Item
                                name="desc"
                                rules={[{ required: true, message: 'Please input your description here' }]}
                            >
                                <textarea className='description'/>
                            </Form.Item>
                            <span className='inline'>Select*</span>
                            <div>
                            <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={6}
                            center={center}
                            onClick={(e) => {
                                setLat(e.latLng.lat());
                                setLng(e.latLng.lng());
                            }}>
                                <Marker
                                    position={{lat: lat, lng: lng}}
                                />
                            </GoogleMap>
                            </div>
                            <Form.Item style={{margin: 5}}>
                            <Button type="primary" htmlType="submit" size='large'>
                                CREATE
                            </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Ticket
