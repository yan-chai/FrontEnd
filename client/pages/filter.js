import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select, Avatar, Skeleton,DatePicker,Space,Table} from 'antd';
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




function Filter(){
    const { Option } = Select;

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    const data = [
        {
            key: '1',
            id: '1',
            requester_name: 'Lucy',
            subject: 'ABCDEF',
            status: 'open',
            priority:'medium',
            assignee: 'James',
            createDate: '3 july 2021'

        },

    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Requester name',
            dataIndex: 'requester_name',
            key: 'requester_name',
        },
        {
            title: 'Subjects',
            dataIndex: 'subject',
            key: 'subject',
            // eslint-disable-next-line react/display-name
            render: text => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: 'Assignee',
            dataIndex: 'assignee',
            key: 'assignee',
        },
        {
            title: 'Create Date',
            dataIndex: 'createDate',
            key: 'createDate',
        },
        {
            title: '',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: () => (
                <Space size="middle">
                    <a>more</a>
                </Space>
            ),
        },
    ];
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
                <Col class = 'filter_tickets'>
                    <Row>
                        <Col>All requested ticket<br/>List of tickets</Col>
                        <Col span={6}/>
                        <Col>Sort by</Col>
                        <Divider type="vertical" />
                        <Col>
                            <Select defaultValue="0" style={{ width: 80 }} onChange={handleChange}>
                                <Option value="0">Open</Option>
                                <Option value="1">Private</Option>
                                <Option value="2">Closed</Option>
                            </Select>
                        </Col>
                        <Divider type="vertical" />
                        <Col>
                            <Select defaultValue="0" style={{ width: 80 }} onChange={handleChange}>
                                <Option value="0">Low</Option>
                                <Option value="1">Medium</Option>
                                <Option value="2">High</Option>
                            </Select>
                        </Col>
                        <Divider type="vertical" />
                        <Col><DatePicker onChange={onChange} /></Col>
                    </Row>
                    <Divider></Divider>
                    <Table columns={columns} dataSource={data} />

                </Col>
            </Row>
        </div>
    );
}

export default Filter
