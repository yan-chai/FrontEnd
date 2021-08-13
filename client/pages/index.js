import { Row, Col, Button, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import "../node_modules/antd/dist/antd.css"
//import { useState } from 'react';
import React from "react"
import Router from 'next/router';

//http://localhost:3000

export default function Home() {

  function handleClick(e) {
    Router.push('/'+e.key);
  };

  return (
    <div>
      <Row  className="indexHeader">
        <Col span={4} className="logo"><img className="img" src="../city.png"></img></Col>
        <Col span={8}/>
        <Col span={10} className="banner">
        <Menu onClick={handleClick} mode="horizontal">
          <Menu.Item key="about" icon={<MailOutlined />}>
            About us
          </Menu.Item>
          <Menu.Item key="login" icon={<MailOutlined />}>
            Log in
          </Menu.Item>
          <Menu.Item key="register" icon={<MailOutlined />}>
            Register
          </Menu.Item>
        </Menu>
        </Col>
      </Row>
      <Row><Col span={24} className="slide"></Col></Row>
      <Row>
        <Col span={2}/>
        <Col span={20} className="content">
          <h1 className="title">City Log</h1>
          <br></br>
          <h1 className="slogan">Let's Unite for Better City</h1>
          <br></br>
          <Row className="bar">
            <Button className="button" size="large" type="primary" onClick={()=>{Router.push('/register')}}>Join Now!</Button>
            <Button className="button" size="large" type="primary" onClick={()=>{Router.push('/login')}}>Log in</Button>
            <Button className="button" size="large"onClick={()=>{Router.push('/home')}}>Visit as a Visitor</Button>
          </Row>
        </Col>
        <Col span={2}/>
      </Row>
    </div>
  )
}
