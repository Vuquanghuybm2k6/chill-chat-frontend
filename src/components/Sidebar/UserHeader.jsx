import { Avatar, Typography, Badge, Button, Dropdown, Space, Modal } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const { Text } = Typography

const UserHeader = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    Modal.confirm({
      title: 'Đăng xuất',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc muốn đăng xuất?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: async () => { await logout(); navigate('/login') }
    })
  }

  const handleMenuClick = ({ key }) => {
    if (key === 'profile') navigate('/user/info')
    if (key === 'logout') handleLogout()
  }

  const menuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true }
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
      <Space>
        <Badge dot color="#0AC286" offset={[-4, 36]}>
          <Avatar size={40} src={user?.avatar} icon={<UserOutlined />} />
        </Badge>
        <div>
          <Text strong style={{ fontSize: 15 }}>{user?.fullName}</Text>
          <div><Text type="secondary" style={{ fontSize: 12 }}>Đang hoạt động</Text></div>
        </div>
      </Space>
      <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }} trigger={['click']} placement="bottomRight">
        <Button type="text" icon={<SettingOutlined style={{ fontSize: 20, color: '#666' }} />} />
      </Dropdown>
    </div>
  )
}

export default UserHeader
