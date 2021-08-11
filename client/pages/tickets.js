import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select, Avatar, Skeleton,DatePicker,Space,Table} from 'antd';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined, UserOutlined, LockOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import "../node_modules/antd/dist/antd.css"
import Router from 'next/router';
import cookie from 'react-cookies';
import Navybar from "./components/navybar";
import Header from "./components/header";
import React, {useState, useRef, useEffect} from 'react';


function Filter(){
    const { Option } = Select;

    const [city, setCity] = React.useState(1);
    const [status, setStat] = React.useState(-1);
    const [prio, setPrio] = React.useState(-1);
    const [date, setDate] = React.useState(true);
    const [d, setData] = React.useState([])

    async function handleChange() {
        let url;
        if (status != -1 && prio != -1) {
            url = "http://127.0.0.1:3000/api/city/tickets/?id="+city+"&status="+status+"&priority="+prio+"&isDesc="+date;
        } else if (status != -1) {
            url = "http://127.0.0.1:3000/api/city/tickets/?id="+city+"&status="+status+"&isDesc="+date;
        } else if (prio != -1) {
            url = "http://127.0.0.1:3000/api/city/tickets/?id="+city+"&priority="+prio+"&isDesc="+date;
        } else {
            url = "http://127.0.0.1:3000/api/city/tickets/?id="+city+"&isDesc="+date;
        }
        const res = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        if (data.code == 403) {
            alert(data.message);
        } else if (data.code == 500) {
            alert("Server Error!");
        } else {
            setData(data.data.cityTickets)
        }
    }

    function selectCity(value) {
        setCity(value);
    }

    useEffect(() => {
        handleChange()
      }, [city, prio, date, status]);

    async function changeStatu(value) {
        setStat(value);
    }

    async function changePrio(value) {
        setPrio(value);
    }

    async function changeOrder(value) {
        setDate(value);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'ticketAuthor',
            key: 'ticketAuthor',
            render: text => <a>{text.name}</a>,
        },
        {
            title: 'Subjects',
            dataIndex: 'type',
            key: 'type',
            render: text => {
                if (text == 1) {
                    return <a>Education</a>
                } else if (text == 2) {
                    return <a>Government</a>
                } else {
                    return <a>Entertainment</a>
                }
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: text => {
                if (text) {
                    return <a>Close</a>
                } else {
                    return <a>Open</a>
                }
            },
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: text => {
                if (text == 0) {
                    return <a>Low</a>
                } else if (text == 1) {
                    return <a>Medium</a>
                } else {
                    return <a>High</a>
                }
            },
        },
        {
            title: 'Create Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => <p>{text.substring(0,10)}</p>
        },
        {
            title: '',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (text, record) => (
                <Space size="middle">
                    <a><Link href={"/detail?id="+record.id}>detail</Link></a>
                </Space>
            ),
        },
    ];
    return(
        <div>
            <Header/>
            <Divider />
            <br />
            <Row >

                <Navybar></Navybar>

                <Divider type="vertical" />
                <Col class = 'filter_tickets'>
                    <Row>
                        <Col span={2}>City</Col>
                        <Col span={3}>
                            <Select defaultValue="1" style={{ width: 150 }} onChange={selectCity}>
                                <Option value="1">San Francisco</Option>
                                <Option value="2">Los Angeles</Option>
                                <Option value="3">San Jose</Option>
                            </Select>
                        </Col>
                        <Col span={6}/>
                        <Col>Sort by</Col>
                        <Divider type="vertical" />
                        <Col>
                            <Select defaultValue="false" style={{ width: 80 }} onChange={changeStatu}>
                                <Option value="false">Open</Option>
                                <Option value="true">Closed</Option>
                            </Select>
                        </Col>
                        <Divider type="vertical" />
                        <Col>
                            <Select defaultValue="0" style={{ width: 80 }} onChange={changePrio}>
                                <Option value="0">Low</Option>
                                <Option value="1">Medium</Option>
                                <Option value="2">High</Option>
                            </Select>
                        </Col>
                        <Divider type="vertical" />
                        <Col>
                            <Select defaultValue="true" style={{ width: 80 }} onChange={changeOrder}>
                                <Option value="true">Desc</Option>
                                <Option value="false">Asc</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Table columns={columns} dataSource={d} />

                </Col>
            </Row>
        </div>
    );
}

export default Filter
