import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import authService from '../services/auth.service';
import { login } from '../actions/auth';
import { LOGIN_SUCCESS } from '../actions/types';

const LoginModal = ({ open, setOpen, setUser }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogin = () => {
    authService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        setUser(data)
        setOpen(false)
        setError("")
      }, (error, payload) => {
        setError("Invalid account password");

      }
    )
  };


  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal title="LOGIN" open={open} onOk={handleLogin} onCancel={handleCancel}>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input onChange={(e) => { setEmail(e.target.value); setError("") }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password onChange={(e) => { setPassword(e.target.value); setError("") }} />
        </Form.Item>
        <p><i>{error}</i></p>

      </Form>
    </Modal>
  );
};

export default LoginModal;
