import { Card, Avatar, Typography, Descriptions, Button, Space } from 'antd'
import { UserOutlined, EditOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const { Title } = Typography

const UserInfo = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} style={{ marginBottom: 16 }}>
        Quay lại
      </Button>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={80} src={user?.avatar} icon={<UserOutlined />} />
          <Title level={4} style={{ marginTop: 12, marginBottom: 0 }}>{user?.fullName}</Title>
          <Typography.Text type="secondary">{user?.email}</Typography.Text>
        </div>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Họ tên">{user?.fullName}</Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{user?.phone || 'Chưa cập nhật'}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">Đang hoạt động</Descriptions.Item>
        </Descriptions>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Space>
            <Button type="primary" icon={<EditOutlined />} onClick={() => navigate('/user/edit')}>
              Chỉnh sửa thông tin
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default UserInfo
