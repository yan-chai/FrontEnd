import {Row, Menu, Switch, Divider, Button, Cascader, Card, List, Col, Form, Input, Select, Avatar, Skeleton,DatePicker,Space,Table,Comment,Tooltip} from 'antd';
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
import moment from 'moment';

import Navybar from "./components/navybar";

const data = [
    {
        actions: [<span key="comment-delete">Delete</span>],
        author: 'Lucy',

        content: (
            <p>
                This is the comment. This is the comment.This is the comment.This is the comment.This is the comment.
                This is the comment.This is the comment.This is the comment.This is the comment.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-delete">Delete</span>],
        author: 'Lucy',

        content: (
            <p>
                This is the comment. This is the comment.This is the comment.This is the comment.This is the comment.
                This is the comment.This is the comment.This is the comment.This is the comment.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];




function Detail(){
    const author = "Lucy";
    const ticket_title = "This is the title of the ticket";
    const { TextArea } = Input;

    return(
        <div>
            <Row className="homeHeader">
                <Col><img className="img" src="../city.png"></img></Col>
                <Col span={10}/>
                <Col span={12} className="banner">
                    <Button type="primary">Create a New Ticket</Button>
                </Col>
            </Row>
            <Divider />
            <br />
            <Row >

                <Navybar></Navybar>

                <Divider type="vertical" />
                <Col>
                    <div className= "ticket_detail">
                        <h2>{ticket_title}</h2>
                        <Divider></Divider>
                        <span className="ticket_author">{author}</span>
                        <p className="ticket_content">This the the content of the ticket</p>
                        <Row>
                            <Col><Button type="primary"> Upvote </Button></Col>
                            <Col span={2}/>
                            <Col><Button type="primary">Downvote</Button></Col>
                        </Row>
                    </div>
                    <br></br>
                    <br></br>


                    <div className="comments">
                        <List
                            className="comment-list"
                            header={`Comments: ${data.length} replies`}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={item.actions}
                                        author={item.author}
                                        content={item.content}
                                        datetime={item.datetime}
                                    />
                                </li>
                            )}
                        />

                    </div>
                    <Divider></Divider>
                    <div className="new_comment">

                            <Form.Item>
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">
                                    Add Comment
                                </Button>
                            </Form.Item>
                    </div>

                </Col>



            </Row>
        </div>
    );
}

export default Detail
