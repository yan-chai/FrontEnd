import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select} from 'antd';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined, UserOutlined, LockOutlined,
} from '@ant-design/icons';
import cookie from 'react-cookies'
import Router from 'next/router';
import "../../node_modules/antd/dist/antd.css"
import React from "react";

const { SubMenu } = Menu;
function Navybar(){
    const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };

    async function handleClick(e) {
        if (e.key == 8){
            const response = await fetch('/api/user/logout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const data = await response.json();
              if (data.code == 200) {
                Router.push('/login');
              } else {
                  alert(data.message)
              }
        } else if (e.key == 1) {
            Router.push('/home');
        } else if (e.key == 2) {
            Router.push('/filter');
        } else if (e.key == 4) {
            Router.push('/setting');
        } else if (e.key == 5) {
            Router.push('/profile');
        } else if (e.key == 6) {
            Router.push('/setpw');
        }
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return(
        <Col className= "home_navy">
            <Switch onChange={changeMode} /> Change Mode
            <Divider type="vertical" />
            <Switch onChange={changeTheme} /> Change Style
            <br />
            <br />
            <Menu
                onClick={handleClick}
                style={{ width: 256}}
                defaultSelectedKeys={['1']}
                mode={mode}
                theme={theme}
            >
                <Menu.Item key="1" icon={<MailOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="2" icon={<CalendarOutlined />}>
                    View Tickets
                </Menu.Item>
                <SubMenu key="3" icon={<SettingOutlined />} title="User">
                    <Menu.Item key="4">center</Menu.Item>
                    <Menu.Item key="5">Edit Email&Name</Menu.Item>
                    <Menu.Item key="6">Change Password</Menu.Item>
                    <Menu.Item key="7">My Ticket</Menu.Item>
                </SubMenu>
                <Menu.Item key="8" icon={<LockOutlined />}>
                    Log Out
                </Menu.Item>
            </Menu>
        </Col>
    )

}

export default Navybar
