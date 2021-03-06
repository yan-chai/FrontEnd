import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select} from 'antd';
import "../node_modules/antd/dist/antd.css"
import Router from 'next/router';
import cookie from 'react-cookies';
import Navybar from "./components/navybar";
import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';
import Header from "./components/header";
const libraries = ["places"];

const { SubMenu } = Menu;

const mapContainerStyle = {
    width: "50vw",
    height: "50vh"
}
function Ticket(){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.google_api_key ,
        libraries,
    });

    const [lat, setLat] = React.useState(36.4122);
    const [lng, setLng] = React.useState(-121.4741);
    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";

    function handleCity(value) {
        if (value == 1) {
            setLat(37.6439)
            setLng(-122.2459)
        } else if (value == 2) {
            setLat(34.0339)
            setLng(-118.1559)
        } else {
            setLat(37.1815)
            setLng(-121.5222)
        }
    }

    async function onFinish(values) {
        const URL = "http://127.0.0.1:3000/api/ticket";
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
            <Header/>
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
                                <Select onChange={handleCity}>
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
                                    center={{lat: lat, lng:lng}}
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
