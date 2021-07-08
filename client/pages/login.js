import {Button, Divider, Form, Input,Checkbox} from 'antd'

function Login() {
    return(
        <div>
            <img src='/tmp.PNG' className='intropic' />
            <div className='content'>
                <div className='header'>Do not have account yet? <a href='/register'>Sign Up</a></div>
                <div className='auth'><Button size='large'>Sign in With Google</Button><Button size='large'>Sign in With Twitter</Button></div>
                <Divider plain>Or</Divider>
                <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      //onFinish={onFinish}
      //onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
            </div>
            
        </div>
    )
}

export default Login