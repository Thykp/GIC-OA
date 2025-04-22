import { useEffect } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { createCafe, updateCafe, fetchCafes } from '../services/api';

export default function CafeForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCafes().then(res => {
        const cafe = res.data.find((c: any) => c.id === id);
        form.setFieldsValue(cafe);
      });
    }
  }, [id]);

  const onFinish = (values: any) => {
    const action = id ? updateCafe : createCafe;
    action({ ...values, id }).then(() => navigate('/cafes'));
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ min: 6, max: 10, required: true }]}>  <Input /> </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ max: 256 }]}>  <Input.TextArea /> </Form.Item>
      <Form.Item name="logo_url" label="Logo URL" rules={[{ type: 'url' }]}><Input /></Form.Item>
      <Form.Item name="location" label="Location" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">Submit</Button>
        <Button onClick={() => navigate('/cafes')} style={{ marginLeft: 8 }}>Cancel</Button>
      </Form.Item>
    </Form>
  );
}