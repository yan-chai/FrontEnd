import {Menu, Switch, Divider, Button,Cascader,Card,List} from 'antd';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import "../node_modules/antd/dist/antd.css"
import React from "react";
import Home from "./home";

const { SubMenu } = Menu;

const Edit = () => {

    const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };
    return (
        <div>
            <img className="home_logo" src="../city.png"></img>
            <Button type="primary">New Ticket</Button>
            <Divider />
            <br />
            <div className= "home_navy">
                <Switch onChange={changeMode} /> Change Mode
                <Divider type="vertical" />
                <Switch onChange={changeTheme} /> Change Style
                <br />
                <br />
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode={mode}
                    theme={theme}
                >
                    <Menu.Item key="1" icon={<MailOutlined />}>
                        Navigation One
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CalendarOutlined />}>
                        Navigation Two
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                        <SubMenu key="sub1-2" title="Submenu">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                    </SubMenu>
                    <Button type="primary">Create a New Ticket</Button>
                </Menu>
            </div>
        </div>



    );
}

export default Edit;
