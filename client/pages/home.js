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
import Navybar from "./components/navybar";
import Header from "./components/header";

const { SubMenu } = Menu;

const Home = () => {
    const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

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
            <Header/>
            <Divider />
            <br />
            <Row >
            <Navybar/>
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
