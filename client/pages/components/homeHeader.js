import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select, Avatar, Skeleton,DatePicker,Space,Table} from 'antd';
import "../../node_modules/antd/dist/antd.css"
import React from "react";
import Router from 'next/router';
import cookie from 'react-cookies';


function HomeHeader(){
    return(
        <Row className="homeHeader">
            <Col><img className="img" src="../city.png"></img></Col>
            <Col span={11}/>
            <Col className="banner">
                <Button type="primary">Create a New Ticket</Button>
            </Col>
            <Col span={2}/>
            <Col className="banner"> <Button>Log out</Button></Col>
        </Row>
    )
}

export default HomeHeader
