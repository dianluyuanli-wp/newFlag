import * as React from 'react';
import { FormEvent } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import apiMap from '@apiMap';
import {FormComponentProps} from 'antd/lib/form/Form';
import { netModel, writeCookie, parseCookie } from 'xiaohuli-package';
import s from './index.css';

interface formValue {
    userName: string;
    password: string;
    repassword: string
}

const register = function(props: FormComponentProps) {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.form.validateFields(async (err: Error, values: formValue) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if (values.password !== values.repassword) {
                message.error('两次密码输入不一致');
                return;
            }
            const res = await netModel.post(apiMap.get('addUser'), {
                userName: values.userName,
                passWord: values.password
            },{});
            if(res === 'add user success!') {
                writeCookie(values, 30);
                window.location.href='/flag.html';
            } else {
                message.error('用户名已被占用')
            }
            //console.log(res, 'answer');
          }
        });
    }
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={handleSubmit} className={s.login_form}>
            <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('repassword', {
                    rules: [{ required: true, message: 'Please input your Password again !' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="rePassword" />
                )}
            </Form.Item>
            <Button type="primary" htmlType="submit" className={s.login_form_button}>
                Register
            </Button>
        </Form>
    )
}

const WrappedLogin = Form.create({ name: 'normal_login' })(register);
export default WrappedLogin;