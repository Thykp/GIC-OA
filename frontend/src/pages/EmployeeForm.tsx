import React, { useEffect } from 'react';
import { Form, Input, Button, Radio, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, updateEmployee, fetchCafes, fetchEmployees } from '../services/api';

export default function EmployeeForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [cafes, setCafes] = React.useState<any[]>([]);

  useEffect(() => {
    fetchCafes().then(res => setCafes(res.data));
    if (id) {
      fetchEmployees().then(res => {
        const emp = res.data.find((e: any) => e.id === id);
        form.setFieldsValue(emp);
      });
    }
  }, [id]);

  const onFinish = (values: any) => {
    const action = id ? updateEmployee : createEmployee;
    action({ ...values, id, start_date: new Date().toISOString().split('T')[0] })
      .then(() => navigate('/employees'));
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="id" label="Employee ID" rules={[{ required: true }]}><Input disabled={!!id} /></Form.Item>
      <Form.Item name="name" label="Name" rules={[{ min: 6, max: 10, required: true }]}><Input /></Form.Item>
      <Form.Item name="email_address" label="Email" rules={[{ type: 'email', required: true }]}><Input /></Form.Item>
      <Form.Item name="phone_number" label="Phone" rules={[{ pattern: /^[89]\d{7}$/, required: true }]}><Input /></Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="cafe_id" label="Assigned Café" rules={[{ required: true }]}>  <Select options={cafes.map(c => ({ label: c.name, value: c.id }))} />  </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">Submit</Button>
        <Button onClick={() => navigate('/employees')} style={{ marginLeft: 8 }}>Cancel</Button>
      </Form.Item>
    </Form>
  );
}