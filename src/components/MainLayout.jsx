import { useState, useMemo } from 'react'
import { Layout, Tabs, Button, Badge } from 'antd'
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

const { Sider, Content } = Layout

const EmptyChat = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#B0B0B0', background: '#EDEDED' }}>
    <MsgIcon style={{ fontSize: 80, marginBottom: 20, color: '#D8D8D8' }} />
    <span style={{ fontSize: 16, color: '#999' }}>Chọn một cuộc trò chuyện</span>
    <span style={{ fontSize: 14, color: '#C0C0C0', marginTop: 4 }}>hoặc bắt đầu một cuộc trò chuyện mới</span>
  </div>
)

const MainContent = () => {
  const [tabKey, setTabKey] = useState('messages')
  const [groupModalOpen, setGroupModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { acceptList } = useChat()

  const tabItems = [
    {
      key: 'messages',
      label: <span style={{ fontSize: 14 }}><MessageOutlined /> Tin nhắn</span>
    },
    {
      key: 'contacts',
      label: (
        <Badge count={acceptList.length || 0} size="small" offset={[6, 0]} style={{ fontSize: 11 }}>
          <span style={{ fontSize: 14 }}><TeamOutlined /> Danh bạ</span>
        </Badge>
      )
    }
  ]

  return (
    <Layout style={{ height: '100vh', background: '#EDEDED' }}>
      <Sider width={360} style={{ background: '#fff', borderRight: '1px solid #E8E8E8', display: 'flex', flexDirection: 'column', boxShadow: '1px 0 3px rgba(0,0,0,0.04)' }}>
        <UserHeader />
        <SearchBar value={search} onChange={setSearch} />
        <Tabs
          activeKey={tabKey}
          onChange={setTabKey}
          items={tabItems}
          style={{ padding: '0 12px 0 16px', minHeight: 44 }}
          tabBarStyle={{ marginBottom: 0, marginTop: 0 }}
          moreIcon={null}
        />
        <div style={{ flex: 1, overflow: 'auto', borderTop: '1px solid #F0F0F0' }}>
          {tabKey === 'messages' && <ConversationList />}
          {tabKey === 'contacts' && <ContactList search={search} />}
        </div>
        <div style={{ padding: '10px 16px', borderTop: '1px solid #F0F0F0' }}>
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={() => setGroupModalOpen(true)}
            style={{ height: 36, borderRadius: 18, borderColor: '#D9D9D9', color: '#666', fontSize: 14 }}
          >
            Tạo phòng chat
          </Button>
        </div>
      </Sider>
      <Layout style={{ background: '#EDEDED' }}>
        <Content style={{ display: 'flex', flexDirection: 'column', background: '#EDEDED' }}>
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
