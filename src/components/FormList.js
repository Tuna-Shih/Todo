import React from 'react';
import styles from './styles/FormList.less';
import { Form, Input, Button } from 'antd';
import cookies from 'js-cookie';

const FormList = () => {
  const [form] = Form.useForm();

  const loadUserData = () => {
    const getData = cookies.get('userData');
    if (!getData) return [];
    return JSON.parse(getData);
  };

  const onFinish = inputData => {
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    const validate =
      inputData.email.match(emailRule) && inputData.phone.match(/^0\d{9}$/);
    if (!validate) return alert('Illegal input');
    const oldData = loadUserData();
    const dataList = [inputData, ...oldData];
    console.log(dataList);
    cookies.set('userData', JSON.stringify(dataList));
  };

  return (
    <div className={styles.wrapper}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'required'
            }
          ]}
          name="name">
          <Input placeholder="name" size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'required'
            }
          ]}>
          <Input placeholder="email" size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'required'
            }
          ]}>
          <Input placeholder="phone" size="large" />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: 'required'
            }
          ]}>
          <Input placeholder="address" size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormList;
