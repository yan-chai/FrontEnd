import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select, Avatar, Skeleton,DatePicker,Space,Table} from 'antd';
import "../node_modules/antd/dist/antd.css"
import React from "react";
import Router from 'next/router';
import Link from 'next/link';
import cookie from 'react-cookies';
import { withRouter } from 'next/router';
import Navybar from "./components/navybar";
import Header from "./components/header";


function Mytickets({tickets}){

    async function deleteTicket(id) {
        const URL = "http://127.0.0.1:3000/api/ticket?id="+id;
        const response = await fetch(URL , {method: "DELETE"})
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
    }
    if (tickets.code == 200) {
        const data = tickets.data.userTickets;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },

            {
                title: 'Titile',
                dataIndex: 'title',
                key: 'title',
                // eslint-disable-next-line react/display-name
                render: text => <a>{text}</a>,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: text => {
                    if (text == false) {
                        return "Open"
                    } else {
                        return "Close"
                    }
                },
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority',
                render: text => {
                    if (text == 2) {
                        return "High"
                    } else if (text == 1){
                        return "Medium"
                    } else {
                        return "Low"
                    }
                }
            },

            {
                title: 'Create Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: text => <p>{text.substring(0,10)}</p>
            },
            {
                title: '',
                key: 'detail',
                // eslint-disable-next-line react/display-name
                render: (text, record) => (
                    <Space size="middle">
                        <a><Link href={"/detail?id="+record.id}>detail</Link></a>
                    </Space>
                ),
            },
            {
                title: '',
                key: 'edit',
                // eslint-disable-next-line react/display-name
                render: (text, record) => (
                    <Space size="middle">
                        <a><Link href={"/edit?id="+record.id}>edit</Link></a>
                    </Space>
                ),
            },
            {
                title: '',
                key: 'delete',
                // eslint-disable-next-line react/display-name
                render: (text, record) => (
                    <Space size="middle">
                        <Button danger name={record.id} onClick={() => {deleteTicket(record.id)} }>delete</Button>
                    </Space>
                ),
            },
        ];
        return(
            <div>
                <Header></Header>
                <Divider />
                <br />
                <Row >

                    <Navybar></Navybar>

                    <Divider type="vertical" />
                    <Col class = 'filter_tickets'>
                        <Divider></Divider>
                        <Table columns={columns} dataSource={data} />

                    </Col>
                </Row>
            </div>
        );
    } else{
        return(
            <div>
                <h1>Please Login Again</h1>
                <Link href='/login'>Log in</Link>
            </div>
        )
    }
}

Mytickets.getInitialProps = async (ctx) => {

    const URL = "http://127.0.0.1:3000/api/user/tickets";
    const res = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const json = await res.json();
    if (json.code == 200) {
        return {tickets: json}
    } else if (json.code == 500) {
        return {tickets: {
            code: 500
        }}
    } else if (json.code == 403) {
        return {tickets: {
            code: 403
    }}
}
    
}
export default withRouter(Mytickets);
