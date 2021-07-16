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
            <Row  className="homeHeader">
                <Col><img className="img" src="../city.png"></img></Col>
                <Col span={8}/>
                <Col span={10} className="banner">
                    {/*<Menu mode="horizontal">*/}
                    {/*    <Menu.Item key="newTicket" icon={<MailOutlined />}>*/}
                    {/*        New Ticket*/}
                    {/*    </Menu.Item>*/}
                    {/*</Menu>*/}
                    <Button type="primary">Create a New Ticket</Button>
                </Col>
            </Row>
            <Divider />
            <br />
            <Row>
                <Col className= "home_navy">
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
                </Col>
                <Divider type="vertical" />
                <Col>
                    <Row>
                        <div className='home_cascade'>
                            <Cascader
                                options={stateOptions}
                                expandTrigger="hover"
                                displayRender={displayRender}
                                onChange={onChange}
                            />
                            <Cascader
                                options={cityOptions}
                                expandTrigger="hover"
                                displayRender={displayRender}
                                onChange={onChange}
                            />
                            <Button type="primary">Go to city</Button>
                        </div>
                    </Row>

                    <Row>
                        <div className='home_ticketsInYourCity'>
                            <Row>
                                <Col>
                                    <span>Tickets in your location</span>
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
                                        <Card title={item.title}>Card content</Card>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Row>

                    <Row>
                        <Col>
                            <div className='home_recentTickets'>
                                <Row>
                                    <Col>
                                        <span>Recent Tickets</span>
                                    </Col>
                                    <Col>
                                        <Button type="primary">View More</Button>
                                    </Col>
                                </Row>
                                <div className="cards">
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

                                    <Card title="Card title" bordered={true} style={{ width: 300 }}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </div>
                            </div>
                        </Col>

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
