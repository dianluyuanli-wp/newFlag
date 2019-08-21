import * as React from 'react';
import { FormEvent } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import apiMap from '@apiMap';
import {FormComponentProps} from 'antd/lib/form/Form';
import { netModel, writeCookie, parseCookie } from 'xiaohuli-package';
import s from './index.css';

interface formValue {
    userName: string;
    password: string
}

const Login = (props: FormComponentProps) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.form.validateFields(async (err: Error, values: formValue) => {
          if (!err) {
            const res = await netModel.post(apiMap.get('verify'), {
                userName: values.userName,
                passWord: values.password
            },{});
            if(res === 'verified') {
                writeCookie(values, 10);
                window.location.href='/home.html';
            } else {
                message.error('账号密码错误')
            }
          }
        });
    }
    const { getFieldDecorator } = props.form;
    const { userName, password } = parseCookie();
    return (
        <Form onSubmit={handleSubmit} className={s.login_form}>
            <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    initialValue: userName
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                    initialValue: password
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
            </Form.Item>
            <a className={s.login_register} href='/register.html'>register new account</a>
            <Button type="primary" htmlType="submit" className={s.login_form_button}>
                Log in
            </Button>
        </Form>
    )
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);
export default WrappedLogin;

//const mainName = this.store.$content[mainIndex].name;
