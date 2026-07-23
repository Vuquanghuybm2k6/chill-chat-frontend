import { useState } from 'react'
import { Layout, Tabs } from 'antd'
import { MessageOutlined, TeamOutlined } from '@ant-design/icons'
import { Routes, Route } from 'react-router-dom'
import { ChatProvider } from '../context/ChatContext'
import UserHeader from './Sidebar/UserHeader'
import SearchBar from './Sidebar/SearchBar'
import ConversationList from './Sidebar/ConversationList'
import ChatArea from './Chat/ChatArea'
import ContactList from './Contacts/ContactList'

const { Sider, Content } = Layout

const EmptyChat = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
    <MessageOutlined style={{ fontSize: 80, marginBottom: 20, color: '#ddd' }} />
    <span style={{ fontSize: 16 }}>Chọn một cuộc trò chuyện</span>
    <span style={{ color: '#aaa' }}>hoặc bắt đầu một cuộc trò chuyện mới</span>
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
            {tabKey === 'contacts' && <ContactList />}
          </div>
        </Sider>
        <Layout>
          <Content style={{ background: '#f0f0f0', display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route index element={<EmptyChat />} />
              <Route path="chat/:roomChatId" element={<ChatAreaWrapper />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ChatProvider>
  )
}

const ChatAreaWrapper = () => {
  const params = { roomChatId: window.location.pathname.split('/chat/')[1] }
  return <ChatArea roomChatId={params.roomChatId} />
}

export default MainLayout
