import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select, Avatar, Skeleton,DatePicker,Space,Table} from 'antd';
import "../node_modules/antd/dist/antd.css"
import React from "react";
import Router from 'next/router';
import cookie from 'react-cookies';
import Navybar from "./components/navybar";
import HomeHeader from "./components/homeHeader";


function Mytickets(){
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
            title: 'Create Date',
            dataIndex: 'createDate',
            key: 'createDate',
        },
        {
            title: '',
            key: 'detail',
            // eslint-disable-next-line react/display-name
            render: () => (
                <Space size="middle">
                    <a>detail</a>
                </Space>
            ),
        },
        {
            title: '',
            key: 'edit',
            // eslint-disable-next-line react/display-name
            render: () => (
                <Space size="middle">
                    <a>edit</a>
                </Space>
            ),
        },
        {
            title: '',
            key: 'delete',
            // eslint-disable-next-line react/display-name
            render: () => (
                <Space size="middle">
                    <a>delete</a>
                </Space>
            ),
        },
    ];
    return(
        <div>
            <HomeHeader></HomeHeader>
            <Divider />
            <br />
            <Row >

                <Navybar></Navybar>

                <Divider type="vertical" />
                <Col class = 'filter_tickets'>
                    <Row>
                        <Col>My tickets<br/>List of tickets</Col>
                        <Col span={9}/>
                        <Col>Sort by</Col>
                        <Divider type="vertical" />
                        <Col>
                            <Select defaultValue="0" style={{ width: 150 }} onChange={handleChange}>
                                <Option value="0">San Francisco</Option>
                                <Option value="1">San Jose</Option>
                                <Option value="2">Los Angels</Option>
                            </Select>
                        </Col>
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

export default Mytickets
