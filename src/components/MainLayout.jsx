import { useState, useMemo } from 'react'
import { Layout, Tabs, Button, Badge, Typography } from 'antd'
import { MessageOutlined, TeamOutlined, PlusOutlined, MessageOutlined as MsgIcon } from '@ant-design/icons'
import { Routes, Route } from 'react-router-dom'
import { ChatProvider, useChat } from '../context/ChatContext'
import UserHeader from './Sidebar/UserHeader'
import SearchBar from './Sidebar/SearchBar'
import ConversationList from './Sidebar/ConversationList'
import ChatArea from './Chat/ChatArea'
import ContactList from './Contacts/ContactList'
import GroupChatModal from './Chat/GroupChatModal'
import UserInfo from '../pages/UserInfo'
import UserEdit from '../pages/UserEdit'

const { Text } = Typography
const { Sider, Content } = Layout

const EmptyChat = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
    <MsgIcon style={{ fontSize: 80, marginBottom: 20, color: '#ddd' }} />
    <span style={{ fontSize: 16 }}>Chọn một cuộc trò chuyện</span>
    <span style={{ color: '#aaa' }}>hoặc bắt đầu một cuộc trò chuyện mới</span>
  </div>
)

const MainContent = () => {
  const [tabKey, setTabKey] = useState('messages')
  const [groupModalOpen, setGroupModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { acceptList } = useChat()

  const contactBadgeCount = useMemo(() => acceptList.length || 0, [acceptList])

  const tabItems = [
    {
      key: 'messages',
      label: <span><MessageOutlined /> Tin nhắn</span>
    },
    {
      key: 'contacts',
      label: (
        <Badge count={contactBadgeCount} size="small" offset={[6, 0]}>
          <span><TeamOutlined /> Danh bạ</span>
        </Badge>
      )
    }
  ]

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={360} style={{ background: '#fff', borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column' }}>
        <UserHeader />
        <SearchBar value={search} onChange={setSearch} />
        <Tabs
          activeKey={tabKey}
          onChange={setTabKey}
          items={tabItems}
          style={{ padding: '0 12px' }}
          tabBarStyle={{ marginBottom: 0 }}
        />
        <div style={{ flex: 1, overflow: 'auto' }}>
          {tabKey === 'messages' && <ConversationList />}
          {tabKey === 'contacts' && <ContactList search={search} />}
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0' }}>
          <Button type="dashed" block icon={<PlusOutlined />} onClick={() => setGroupModalOpen(true)}>
            Tạo phòng chat
          </Button>
        </div>
      </Sider>
      <Layout>
        <Content style={{ background: '#f0f0f0', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route index element={<EmptyChat />} />
            <Route path="chat/:roomChatId" element={<ChatAreaWrapper />} />
            <Route path="user/info" element={<UserInfo />} />
            <Route path="user/edit" element={<UserEdit />} />
          </Routes>
        </Content>
      </Layout>
      <GroupChatModal open={groupModalOpen} onClose={() => setGroupModalOpen(false)} />
    </Layout>
  )
}

const ChatAreaWrapper = () => {
  const roomChatId = window.location.pathname.split('/chat/')[1]
  return <ChatArea roomChatId={roomChatId} />
}

const MainLayout = () => (
  <ChatProvider>
    <MainContent />
  </ChatProvider>
)

export default MainLayout
