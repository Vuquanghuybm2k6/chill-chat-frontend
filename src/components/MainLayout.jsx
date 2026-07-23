import { useState } from 'react'
import { Layout, Avatar, Typography, Badge, Input, Tabs, List, Button, Dropdown, Space } from 'antd'
import {
  MessageOutlined, TeamOutlined, UserOutlined,
  SearchOutlined, SettingOutlined, LogoutOutlined,
  EditOutlined, BellOutlined
} from '@ant-design/icons'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ChatProvider } from '../context/ChatContext'

const { Sider, Content } = Layout
const { Text } = Typography

const UserHeader = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true }
  ]

  const handleMenuClick = async ({ key }) => {
    if (key === 'logout') {
      await logout()
      navigate('/login')
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
      <Space>
        <Badge dot color="#0AC286" offset={[-4, 36]}>
          <Avatar size={40} src={user?.avatar} icon={<UserOutlined />} />
        </Badge>
        <div>
          <Text strong style={{ fontSize: 15 }}>{user?.fullName}</Text>
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>Đang hoạt động</Text>
          </div>
        </div>
      </Space>
      <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }} trigger={['click']} placement="bottomRight">
        <Button type="text" icon={<SettingOutlined style={{ fontSize: 20, color: '#666' }} />} />
      </Dropdown>
    </div>
  )
}

const SearchBar = () => (
  <div style={{ padding: '8px 12px' }}>
    <Input prefix={<SearchOutlined style={{ color: '#999' }} />} placeholder="Tìm kiếm..." variant="borderless" style={{ background: '#f0f0f0', borderRadius: 20 }} />
  </div>
)

const ConversationList = () => {
  const navigate = useNavigate()
  const data = []

  return (
    <List
      dataSource={data}
      locale={{ emptyText: 'Chưa có cuộc trò chuyện nào' }}
      renderItem={item => (
        <List.Item onClick={() => navigate(`/chat/${item.id}`)} style={{ cursor: 'pointer', padding: '12px 16px' }}>
          <List.Item.Meta
            avatar={<Badge dot color="#0AC286" offset={[-2, 28]}><Avatar size={44} icon={<UserOutlined />} /></Badge>}
            title={<Text strong>{item.name}</Text>}
            description={<Text type="secondary" ellipsis>{item.lastMessage}</Text>}
          />
        </List.Item>
      )}
    />
  )
}

const EmptyChat = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
    <MessageOutlined style={{ fontSize: 80, marginBottom: 20, color: '#ddd' }} />
    <Text style={{ fontSize: 16 }}>Chọn một cuộc trò chuyện</Text>
    <Text type="secondary">hoặc bắt đầu một cuộc trò chuyện mới</Text>
  </div>
)

const MainLayout = () => {
  const [tabKey, setTabKey] = useState('messages')

  const tabItems = [
    { key: 'messages', label: <span><MessageOutlined /> Tin nhắn</span> },
    { key: 'contacts', label: <span><TeamOutlined /> Danh bạ</span> }
  ]

  return (
    <ChatProvider>
      <Layout style={{ height: '100vh' }}>
        <Sider width={360} style={{ background: '#fff', borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column' }}>
          <UserHeader />
          <SearchBar />
          <Tabs
            activeKey={tabKey}
            onChange={setTabKey}
            items={tabItems}
            style={{ padding: '0 12px' }}
            tabBarStyle={{ marginBottom: 0 }}
          />
          <div style={{ flex: 1, overflow: 'auto' }}>
            {tabKey === 'messages' && <ConversationList />}
            {tabKey === 'contacts' && <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>Danh bạ</div>}
          </div>
        </Sider>
        <Layout>
          <Content style={{ background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route index element={<EmptyChat />} />
              <Route path="chat/:roomChatId" element={<div style={{ padding: 20 }}>Chat Area</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ChatProvider>
  )
}

export default MainLayout
