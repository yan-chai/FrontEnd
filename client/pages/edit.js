import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select} from 'antd';
import "../node_modules/antd/dist/antd.css"
import Router from 'next/router';
import { useRouter } from 'next/router'
import cookie from 'react-cookies';
import Navybar from "./components/navybar";
import React, {useState} from 'react';
import { withRouter } from 'next/router';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';
import Header from "./components/header";
const libraries = ["places"];

const { SubMenu } = Menu;

const mapContainerStyle = {
    width: "50vw",
    height: "50vh"
}
function Edit({ticket}){

    const router = useRouter()
    const {id} = router.query
    console.log(ticket)
    console.log(id)

    const center = {
        lat: ticket.data.lat,
        lng: ticket.data.long
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.google_api_key ,
        libraries,
    });

    const [lat, setLat] = React.useState(ticket.data.lat);
    const [lng, setLng] = React.useState(ticket.data.long);
    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";

    function typeOfTicket(type) {
        if(type == 1) {
            return "Education"
        } else if (type ==2) {
            return "Government"
        } else {
            return "Entertainment"
        }
    }

    function status(type) {
        if (type) {
            return "Close"
        } else {
            return "Open"
        }
    }
    function prio(type) {
        if (type == 0) {
            return "Low"
        } else if (type == 1) {
            return "Medium"
        } else {
            return "High"
        }
    }

    async function onFinish(values) {
        const URL = "http://127.0.0.1:3000/api/ticket?id="+id;
        const response = await fetch(URL , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": values.title,
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
            Router.push("/login")
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
                                <Input className='pageName' defaultValue={ticket.data.title} initialValues={ticket.data.title}/>
                            </Form.Item>
                            <span className='inline'>Type*</span>
                            <Form.Item
                                name='type'
                                rules={[{ required: true, message: 'Please select ticket type' }]}
                            >
                                <Select defaultValue={typeOfTicket(ticket.data.type)} initialValues={ticket.data.type}>
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
                                <Select defaultValue={status(ticket.data.status)} initialValues={ticket.data.status}>
                                    <Select.Option value="0">Open</Select.Option>
                                    <Select.Option value="1">Closed</Select.Option>
                                </Select>
                            </Form.Item>

                            <span className='inline'>Priority*</span>
                            <Form.Item
                                name='priority'
                                rules={[{ required: true, message: 'Please select ticket priority' }]}
                            >
                                <Select defaultValue={prio(ticket.data.priority)} initialValues={ticket.data.priority}>
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
                                <textarea className='description' defaultValue={ticket.data.content} initialValues={ticket.data.content}/>
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

Edit.getInitialProps = async (ctx) => {

    const URL = "http://127.0.0.1:3000/api/ticket/?id=" + ctx.query.id;
    const res = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const json = await res.json();
    if (json.code == 200) {
        return {ticket: json}
    } else if (json.code == 500) {
        return {ticket: {
            code: 500
        }}
    } else if (json.code == 403) {
        return {ticket: {
            code: 403
        }}
    }
}

export default withRouter(Edit);
