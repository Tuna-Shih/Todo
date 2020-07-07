import React from 'react';
import { Form, Input, Button } from 'antd';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import useOnFinish from './hooks/useOnFinish';
import styles from './styles/FormList.less';

const FormList = () => {
  const [form] = Form.useForm();
  const onFinish = useOnFinish();

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
              required: true
            },
            () => ({
              validator(rule, value) {
                if (isEmail(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('must be form as email');
              }
            })
          ]}>
          <Input placeholder="email" size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true
            },
            () => ({
              validator(rule, value) {
                if (isMobilePhone(value, 'zh-TW')) {
                  return Promise.resolve();
                }
                return Promise.reject('must be form as phone');
              }
            })
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

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }>
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(FormList);
