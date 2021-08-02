import {Button, Divider, Form, Input, Checkbox, Col,Row} from 'antd';
import { UserOutlined, LockOutlined,LeftOutlined  } from '@ant-design/icons';
import React from "react"
import Link from 'next/link'
import Router from 'next/router';
import cookie from 'react-cookies'
import "../node_modules/antd/dist/antd.css"
import Login from "./login";
React.useLayoutEffect = React.useEffect

function Email(){
    return (
        <div>
            <Row className='email_header'>
                <Col><LeftOutlined /></Col>
                <Col span={8}/>
                <Col>Do not have account yet? <Link href='/register'>Sign Up</Link></Col>

            </Row>
            <div className="email_body">
                <h1>Reset your password</h1>
                <div className="email_innerbox">
                    <h2>Check your email</h2>
                    <p>We’ve sent an email to For security reasons,
                        you’ll only receive a link to reset your password if this email
                        address is registered to your account.</p>
                    <h3>Don’t get the email?</h3>
                    <p>Check your email spam or junk folder

                        Check you’ve entered your email address correctly</p>
                </div>

            </div>








        </div>
    )
}

export default Email
