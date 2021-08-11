import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select, Avatar, Skeleton} from 'antd';
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
import Header from "./components/header";
import Link from 'next/link';


const data = [
    {
        title: 'Account',
        url: './settings',
        desc: 'User Seeting center'
    },
    {
        title: 'Reset Email & Name',
        url: './profile',
        desc: 'Edit User Email, City, Name'
    },
    {
        title: 'Security',
        url: './setpw',
        desc: 'Reset User Password'
    },
    {
        title:'My Tickets',
        url: './mytickets',
        desc: 'All Tickets User Posted'
    }
];

function Settings({profile}){


    return(
        <div>
            <Header></Header>
            <Divider />
            <br />
            <Row >

                <Navybar></Navybar>
                <Divider type="vertical" />
                <Col class = 'settings_content' >
                   <h2>User Center</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item actions={[<Link href={item.url}>More</Link>]}>
                                <List.Item.Meta
                                    title={<Link href={item.url}>{item.title}</Link>}
                                    description={item.desc}
                                />
                            </List.Item>
                        )}
                    />

                </Col>
            </Row>
        </div>
    );
}

Settings.getInitialProps = async (ctx) => {

    const URL = "http://127.0.0.1:3000/api/user/setting";
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

export default Settings
