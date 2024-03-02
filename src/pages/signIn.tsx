import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Flex, Form, Input } from 'antd';
import { useAuth } from '../auth/authProvider';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldType = {
  email: string;
};

function SignIn() {
  const { isLoggedIn, setUserEmail, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    setUserEmail(values.email);
    setIsLoggedIn(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    isLoggedIn && navigate('/', { replace: true });
  }, [isLoggedIn]);

  return (
    <Flex flex={1} vertical justify='center' align='center' className='pt-20 p-10'>
      <Avatar shape='square' className='mb-10' size={64} icon={<UserOutlined />} />
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        className='max-w-[500px] w-[100%] h-[90vh]'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          name='email'
          rules={[
            { required: true, message: 'Please input your email!' },
            { pattern: emailRegex, message: 'Please enter a valid email!' },
          ]}
        >
          <Input size='large' placeholder='Type your email' />
        </Form.Item>

        <Form.Item className='justify-end flex mt-10'>
          <Button size='large' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default SignIn;
