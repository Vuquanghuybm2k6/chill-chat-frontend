import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Input, Button, Typography, Steps, message as antMsg } from 'antd'
import { MailOutlined, LockOutlined, KeyOutlined, MessageOutlined } from '@ant-design/icons'
import api from '../api'

const { Title, Text } = Typography

const ForgotPassword = () => {
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')

  const handleSendOtp = async (values) => {
    setLoading(true)
    try {
      await api.post('/user/password/forgot', { email: values.email })
      setEmail(values.email)
      antMsg.success('Mã OTP đã được gửi đến email của bạn')
      setCurrent(1)
    } catch (err) {
      antMsg.error(err.response?.data?.message || 'Gửi OTP thất bại')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (values) => {
    setLoading(true)
    try {
      const res = await api.post('/user/password/otp', { email, otp: values.otp })
      setResetToken(res.data.data.token)
      antMsg.success('Xác thực OTP thành công')
      setCurrent(2)
    } catch (err) {
      antMsg.error(err.response?.data?.message || 'Xác thực OTP thất bại')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (values) => {
    setLoading(true)
    try {
      localStorage.setItem('token', resetToken)
      await api.post('/user/password/reset', { password: values.password, confirmPassword: values.confirmPassword })
      localStorage.removeItem('token')
      antMsg.success('Đổi mật khẩu thành công')
      window.location.href = '/login'
    } catch (err) {
      antMsg.error(err.response?.data?.message || 'Đổi mật khẩu thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0068FF 0%, #00A3FF 100%)' }}>
      <Card style={{ width: 440, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }} styles={{ body: { padding: '40px 32px' } }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={3} style={{ margin: 0 }}>Quên mật khẩu</Title>
          <Text type="secondary">Lấy lại quyền truy cập tài khoản của bạn</Text>
        </div>

        <Steps
          current={current}
          size="small"
          items={[
            { title: 'Email', icon: <MailOutlined /> },
            { title: 'OTP', icon: <KeyOutlined /> },
            { title: 'Mật khẩu mới', icon: <LockOutlined /> }
          ]}
          style={{ marginBottom: 32 }}
        />

        {current === 0 && (
          <Form layout="vertical" onFinish={handleSendOtp} size="large">
            <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]}>
              <Input prefix={<MailOutlined />} placeholder="Email của bạn" />
            </Form.Item>
            <Form.Item style={{ marginBottom: 12 }}>
              <Button type="primary" htmlType="submit" loading={loading} block style={{ height: 44 }}>
                Gửi mã OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {current === 1 && (
          <Form layout="vertical" onFinish={handleVerifyOtp} size="large">
            <Text style={{ display: 'block', marginBottom: 16 }}>Nhập mã OTP đã gửi đến <strong>{email}</strong></Text>
            <Form.Item name="otp" rules={[{ required: true, message: 'Vui lòng nhập mã OTP' }]}>
              <Input prefix={<KeyOutlined />} placeholder="Mã OTP" maxLength={6} style={{ textAlign: 'center', letterSpacing: 8, fontSize: 18 }} />
            </Form.Item>
            <Form.Item style={{ marginBottom: 12 }}>
              <Button type="primary" htmlType="submit" loading={loading} block style={{ height: 44 }}>
                Xác thực
              </Button>
            </Form.Item>
          </Form>
        )}

        {current === 2 && (
          <Form layout="vertical" onFinish={handleResetPassword} size="large">
            <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }, { min: 6, message: 'Mật khẩu ít nhất 6 ký tự' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
            </Form.Item>
            <Form.Item name="confirmPassword" rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) return Promise.resolve(); return Promise.reject(new Error('Mật khẩu không trùng khớp')) } })
            ]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
            </Form.Item>
            <Form.Item style={{ marginBottom: 12 }}>
              <Button type="primary" htmlType="submit" loading={loading} block style={{ height: 44 }}>
                Đặt lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
        )}

        <div style={{ textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#0068FF' }}>Quay lại đăng nhập</Link>
        </div>
      </Card>
    </div>
  )
}

export default ForgotPassword
