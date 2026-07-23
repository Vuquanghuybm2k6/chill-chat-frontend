import { useState } from 'react'
import { Card, Form, Input, Button, Typography, Avatar, Upload, message as antMsg } from 'antd'
import { UserOutlined, ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api'

const { Title } = Typography

const UserEdit = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('fullName', values.fullName)
      formData.append('email', values.email)
      formData.append('phone', values.phone || '')
      if (values.password) formData.append('password', values.password)
      if (values.avatar?.file?.originFileObj) formData.append('avatar', values.avatar.file.originFileObj)
      await api.patch('/user/edit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      antMsg.success('Cập nhật thông tin thành công')
      navigate('/user/info')
    } catch (err) {
      antMsg.error(err.response?.data?.message || 'Cập nhật thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/user/info')} style={{ marginBottom: 16 }}>
        Quay lại
      </Button>
      <Card>
        <Title level={4} style={{ textAlign: 'center' }}>Chỉnh sửa thông tin</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ fullName: user?.fullName, email: user?.email, phone: user?.phone }}
        >
          <Form.Item name="avatar" label="Ảnh đại diện">
            <Upload maxCount={1} beforeUpload={() => false} listType="picture-card" accept="image/*">
              <div><UploadOutlined /><br />Chọn ảnh</div>
            </Upload>
          </Form.Item>
          <Form.Item name="fullName" label="Họ tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu mới (để trống nếu không đổi)">
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={() => navigate('/user/info')} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Lưu thay đổi</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default UserEdit
