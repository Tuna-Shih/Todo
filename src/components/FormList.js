import React from 'react';
import styles from './styles/FormList.less';
import { Form, Input, Button } from 'antd';
import cookies from 'js-cookie';

const FormList = () => {
  const [form] = Form.useForm();

  const onFinish = inputData => {
    const getData = cookies.get('userData');
    const oldData = getData ? JSON.parse(getData) : [];

    const dataList = [inputData, ...oldData];

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
              message: 'must be form as email',
              type: 'email'
            }
          ]}>
          <Input placeholder="email" size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'must be form as phone',
              pattern: /^0\d{9}$/
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
