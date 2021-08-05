import {Row, Button, Col} from 'antd';
import Router from 'next/router';


export default function Header() {
    async function handleLogOut() {
        const response = await fetch('/api/user/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (data.code == 200) {
            Router.push('/login');
          } else {
              alert(data.message)
          }
    }

    function newTicket() {
        Router.push('/newTicket')
    }
    return (
        <Row className="homeHeader">
            <Col><img className="img" src="../city.png"></img></Col>
            <Col span={12}/>
            <Col className="banner">
                <Button type="primary" onClick={newTicket}>Create a New Ticket</Button>
            </Col>
            <Col span={2}/>
            <Col className="banner"> <Button onClick={handleLogOut}>Log out</Button></Col>
        </Row>
    )
    
}


