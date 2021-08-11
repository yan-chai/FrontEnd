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

const Home = ({data}) => {
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

    return (
        <div>
            <Header/>
            <Divider />
            <br />
            <Row >
            <Navybar/>
                <Divider type="vertical" />
                <Col class = 'home_content'> 
                    <Divider />

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
                                        <Button type="primary" onClick={() => {Router.push("/tickets")}}>View More</Button>
                                    </Col>
                                </Row>
                                <div className="cards">
                                    <Card title={data.data.newTickets[0].title} bordered={true} style={{ width: 350 }}>
                                        <p>Create Time: {data.data.newTickets[0].createdAt.substring(0,10)}</p>
                                    </Card>
                                    <Divider />
                                    <Card title={data.data.newTickets[1].title} bordered={true} style={{ width: 350 }}>
                                    <p>Create Time: {data.data.newTickets[1].createdAt.substring(0,10)}</p>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                        <Divider type="vertical" />
                        <Col>
                            <div>
                                <Row>
                                    <Col>
                                        <span>Popular Tickets</span>
                                    </Col>
                                    <Col>
                                        <Button type="primary" onClick={() => {Router.push("/tickets")}}>View More</Button>
                                    </Col>
                                </Row>
                                <div className="home_popularCities">
                                    <Card title={data.data.highestRateTickets[0].title} bordered={true} style={{ width: 300 }}>
                                        <p>Rate: {data.data.highestRateTickets[0].rateSum}</p>
                                        <p>Create Time: {data.data.highestRateTickets[0].createdAt.substring(0,10)}</p>

                                    </Card>

                                    <Card title={data.data.highestRateTickets[1].title} bordered={true} style={{ width: 300 }}>
                                        <p>Rate: {data.data.highestRateTickets[1].rateSum}</p>
                                        <p>Create Time: {data.data.highestRateTickets[1].createdAt.substring(0,10)}</p>
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
Home.getInitialProps = async (ctx) => {

    const URL = "http://127.0.0.1:3000/api/city/landing";
    const res = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const json = await res.json();
    return {data: json}
}
export default Home;
