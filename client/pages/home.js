import {Row,Menu, Switch, Divider, Button, Cascader, Card, List, Col} from 'antd';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import "../node_modules/antd/dist/antd.css"
import React from "react";
import Router from 'next/router';
import cookie from 'react-cookies';

const { SubMenu } = Menu;

const Home = () => {
    const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };

    const stateOptions = [{value: 'California', label: 'California',},
                     {value: 'Washington', label: 'Washington'}];

    const cityOptions = [{value: 'San Francisco', label: 'San Francisco',},
        {value: 'Los Angels', label: 'Los Angels'}];

    function onChange(value) {
        console.log(value);
    }

    function handleClick(e) {
        if (e.key == "logout"){
            cookie.remove('token');
            Router.push('/login');
        } else{
            Router.push('/'+e.key+'?token='+cookie.load('token'));
        }
    }

   // Just show the latest item.
    function displayRender(label) {
        return label[label.length - 1];
    }

    const ticketData = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 5',
        },
        {
            title: 'Title 6',
        },
    ];

    return (
        <div>
            <Row className="homeHeader">
                <Col><img className="img" src="../city.png"></img></Col>
                <Col span={12}/>
                <Col className="banner">
                    <Button type="primary">Create a New Ticket</Button>
                </Col>
                <Col span={2}/>
                <Col className="banner"> <Button>Log out</Button></Col>
            </Row>
            <Divider />
            <br />
            <Row >
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
                        <SubMenu key="sub2" icon={<SettingOutlined />} title="User">
                            <Menu.Item key="profile">Change Name and Email</Menu.Item>
                            <Menu.Item key="setpw">Change Password</Menu.Item>
                            <Menu.Item key="9">User Center</Menu.Item>
                            <Menu.Item key="logout">Log Out</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <Button type="primary">Create a New Ticket</Button>
                </Col>
                <Divider type="vertical" />
                <Col class = 'home_content'>
                    <Row className = 'home_cascade'>
                            <Col>
                                <Row>Select State</Row>
                                <Row>
                                    <Cascader
                                        options={stateOptions}
                                        expandTrigger="hover"
                                        displayRender={displayRender}
                                        onChange={onChange}
                                    />
                                </Row>
                            </Col>
                            <Col>
                                <Row>Select City</Row>
                                <Row>
                                    <Cascader
                                        options={cityOptions}
                                        expandTrigger="hover"
                                        displayRender={displayRender}
                                        onChange={onChange}
                                    />
                                </Row>
                            </Col>
                            <Col>
                                <br/>
                                <Button type="primary">Go to city</Button>
                            </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <div className='home_ticketsInYourCity'>
                            <Row>
                                <Col span={20}>
                                    Tickets in your location
                                </Col>
                                <Col>
                                    <Button type="primary">View More</Button>
                                </Col>
                            </Row>
                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 1,
                                    sm: 2,
                                    md: 4,
                                    lg: 4,
                                    xl: 6,
                                    xxl: 3,
                                }}
                                dataSource={ticketData}
                                renderItem={item => (
                                    <List.Item>
                                        <Card title={item.title}> Card content</Card>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Row>

                    <Divider  />
                    <Row>
                        <Col>
                            <div className='home_recentTickets'>
                                <Row>
                                    <Col>
                                        <span>Recent Tickets</span>
                                    </Col>
                                    <Col pan={5}></Col>
                                    <Col>
                                        <Button type="primary">View More</Button>
                                    </Col>
                                </Row>
                                <div className="cards">
                                    <Card title="Card title" bordered={true} style={{ width: 350 }}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                    <Divider />
                                    <Card title="Card title" bordered={true} style={{ width: 350 }}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                    <Divider  />
                                    <Card title="Card title" bordered={true} style={{ width: 350 }}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                        <Divider type="vertical" />
                        <Col>
                            <div>
                                <Row>
                                    <Col>
                                        <span>Popular Cities in Your State</span>
                                    </Col>
                                    <Col>
                                        <Button type="primary">View More</Button>
                                    </Col>
                                </Row>
                                <div className="home_popularCities">
                                    <Card title="Card title" bordered={true} style={{ width: 300 }}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>

                                    <Card title="Card title" bordered={true} style={{ width: 300 }}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
