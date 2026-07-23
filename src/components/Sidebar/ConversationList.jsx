import { useMemo } from 'react'
import { List, Avatar, Badge, Typography } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'

const { Text } = Typography

const ConversationList = () => {
  const navigate = useNavigate()
  const { friends, conversations, messages } = useChat()

  const merged = useMemo(() => {
    const list = []
    friends.forEach(f => {
      const roomMessages = messages[f.roomChatId] || []
      const lastMsg = roomMessages[roomMessages.length - 1]
      list.push({
        id: f.roomChatId,
        name: f.fullName,
        avatar: f.avatar,
        statusOnline: f.statusOnline,
        lastMessage: lastMsg ? (lastMsg.type === 'image' ? '[Hình ảnh]' : lastMsg.content) : '',
        time: lastMsg?.createdAt || lastMsg?.timestamp,
        isGroup: false
      })
    })
    conversations.forEach(c => {
      const roomMessages = messages[c._id] || []
      const lastMsg = roomMessages[roomMessages.length - 1]
      list.push({
        id: c._id,
        name: c.title,
        avatar: null,
        lastMessage: lastMsg ? (lastMsg.type === 'image' ? '[Hình ảnh]' : lastMsg.content) : '',
        time: lastMsg?.createdAt || lastMsg?.timestamp,
        isGroup: true
      })
    })
    list.sort((a, b) => (b.time || 0) - (a.time || 0))
    return list
  }, [friends, conversations, messages])

  const formatTime = (t) => {
    if (!t) return ''
    const d = new Date(t)
    const now = new Date()
    if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
  }

  return (
    <List
      dataSource={merged}
      locale={{ emptyText: 'Chưa có cuộc trò chuyện nào' }}
      renderItem={item => (
        <List.Item onClick={() => navigate(`/chat/${item.id}`)} style={{ cursor: 'pointer', padding: '12px 16px' }}>
          <List.Item.Meta
            avatar={
              item.isGroup ? (
                <Avatar size={44} icon={<TeamOutlined />} style={{ background: '#0068FF' }} />
              ) : (
                <Badge dot color={item.statusOnline === 'online' ? '#0AC286' : '#ccc'} offset={[-2, 28]}>
                  <Avatar size={44} src={item.avatar} icon={<UserOutlined />} />
                </Badge>
              )
            }
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text strong style={{ fontSize: 14 }}>{item.name}</Text>
                {item.time && <Text type="secondary" style={{ fontSize: 11 }}>{formatTime(item.time)}</Text>}
              </div>
            }
            description={<Text type="secondary" ellipsis style={{ fontSize: 13 }}>{item.lastMessage || 'Chưa có tin nhắn'}</Text>}
          />
        </List.Item>
      )}
    />
  )
}

export default ConversationList
