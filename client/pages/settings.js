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


const data = [
    {
        title: 'Account',
    },
    {
        title: 'Notifications',
    },
    {
        title: 'Security',
    },
    {
        title: 'Appearance',
    },
    {
        title:'Billing Information',
    },
    {
        title:'Connections',
    }
];

function Settings(){


    return(
        <div>
            <Row className="homeHeader">
                <Col><img className="img" src="../city.png"></img></Col>
                <Col span={10}/>
                <Col span={12} className="banner">
                    <Button type="primary">Create a New Ticket</Button>

                </Col>
                <Col span={2}/>
                <Col> <Button type="primary">Create a New Ticket</Button></Col>
            </Row>
            <Divider />
            <br />
            <Row >

                <Navybar></Navybar>

                <Divider type="vertical" />
                <Col class = 'settings_content' >
                   <h2>Settings</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item actions={[<a key="list-loadmore-edit">more</a>]}>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                />
                            </List.Item>
                        )}
                    />

                </Col>
            </Row>
        </div>
    );
}

export default Settings
