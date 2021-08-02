import {Button, Divider, Form, Input, Checkbox, Col, Row} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from "react"
import Link from 'next/link'
import Router from 'next/router';
import cookie from 'react-cookies'
import "../node_modules/antd/dist/antd.css"
React.useLayoutEffect = React.useEffect

function Explore(){
    const { Search } = Input;
    const onSearch = value => console.log(value);
    return(
        <div>
            <div className="exploreHeader">
                <Row >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Col><img className="img" src="../city.png"></img></Col>
                    <Col span={10}/>
                    <Col span={12} className="banner">

                        <Button type="primary">Create a New Ticket</Button>
                    </Col>
                </Row>
                <Divider />
                <div className = "searchBox">
                    <Row>
                        <h2>start the change now</h2>
                    </Row>
                    <Row>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 400 }} />
                    </Row>
                </div>
            </div>

            <div>
                <Row>
                    Explore tickets nearby
                </Row>
                <Row>

                </Row>
            </div>

        </div>





    )
}

export default Explore
