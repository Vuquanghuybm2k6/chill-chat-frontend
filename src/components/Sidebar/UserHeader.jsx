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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
      <Space size={12}>
        <Badge dot color="#0AC286" offset={[-4, 36]}>
          <Avatar size={40} src={user?.avatar} icon={<UserOutlined />} style={{ borderRadius: 14 }} />
        </Badge>
        <div>
          <Text style={{ fontSize: 15, fontWeight: 600, color: '#333', lineHeight: '20px' }}>{user?.fullName}</Text>
          <div style={{ fontSize: 12, color: '#0AC286', lineHeight: '16px' }}>Đang hoạt động</div>
        </div>
      </Space>
      <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }} trigger={['click']} placement="bottomRight">
        <Button type="text" icon={<SettingOutlined style={{ fontSize: 22, color: '#666' }} />} style={{ width: 40, height: 40 }} />
      </Dropdown>
    </div>
  )
}

export default UserHeader
