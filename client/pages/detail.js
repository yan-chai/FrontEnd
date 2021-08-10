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
import { withRouter } from 'next/router';
import Router from 'next/router';
import { useRouter } from 'next/router'
import cookie from 'react-cookies';
import moment from 'moment';

import Navybar from "./components/navybar";
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';
const libraries = ["places"];

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

const mapContainerStyle = {
    width: "30vw",
    height: "50vh",
}


function Detail({ticket}){
    
    const author = ticket.data.ticketAuthor.name;
    const ticket_title = ticket.data.title;
    const content = ticket.data.content;
    const { TextArea } = Input;
    const center = {
        lat: ticket.data.lat,
        lng: ticket.data.long,
    };
    const lat = ticket.data.lat;
    const lng = ticket.data.long;
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.google_api_key ,
        libraries,
    });
    const rate = ticket.data.rateSum;
    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";
    const router = useRouter()
    const {id} = router.query
    async function onFinish(values) {
        const URL = "http://127.0.0.1:3000/api/reply?ticket="+id;
        console.log(URL)
        const response = await fetch(URL , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "content": values.content
            })
        });
        const data = await response.json();
        if (data.code == 403) {
            alert(data.message);
            Router.push("/login")
        }else if (data.code == 200) {
            alert(data.message);
            Router.push("/home");
        } else if (data.code == 500) {
            alert("Server Error!");
        }
    };
    const replies = ticket.data.Replies
    async function deleteComment(id) {
        const URL = "http://127.0.0.1:3000/api/reply?reply="+id;
        const response = await fetch(URL , {method: "DELETE"})
        const data = await response.json();
        if (data.code == 403) {
            alert(data.message);
            Router.push("/login")
        }else if (data.code == 200) {
            alert(data.message);
            Router.push("/home");
        } else if (data.code == 500) {
            alert("Server Error!");
        }
    }

    return(
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
                <Navybar></Navybar>
                <Divider type="vertical" />
                <Col span={16}>
                    <div className= "ticket_detail">
                        <h2>{ticket_title}</h2>
                        <Divider></Divider>
                        <span className="ticket_author">{author}</span>
                        <br />
                        <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={6}
                        center={center}
                        >
                            <Marker
                                position={{lat: lat, lng: lng}}
                            />
                        </GoogleMap>
                        <br />
                        <p className="ticket_content">{content}</p>
                        <br />
                        <Row>
                            <Col span={4}>Rate: {rate}</Col>
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
                            header={`Comments: ${replies.length} replies`}
                            itemLayout="horizontal"
                            dataSource={replies}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={[<span key="comment-delete" onClick={() => {deleteComment(item.id)}}>Delete</span>]}
                                        author={item.replyAuthor.name}
                                        content={item.content}
                                        datetime={item.createdAt}
                                    />
                                </li>
                            )}
                        />

                    </div>
                    <Divider></Divider>
                    <div className="new_comment">
                        <Form onFinish={onFinish}>
                            <Form.Item name="content">
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">
                                    Add Comment
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

Detail.getInitialProps = async (ctx) => {

    const URL = "http://127.0.0.1:3000/api/ticket/?id=" + ctx.query.id;
    const res = await fetch(URL, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const json = await res.json();
    return {ticket: json}
}
export default withRouter(Detail);