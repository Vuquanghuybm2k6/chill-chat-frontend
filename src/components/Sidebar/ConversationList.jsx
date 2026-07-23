import { useMemo } from 'react'
import { List, Avatar, Badge, Typography } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
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
        lastMessage: lastMsg ? (lastMsg.type === 'image' ? 'Hình ảnh' : lastMsg.content) : '',
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
        lastMessage: lastMsg ? (lastMsg.type === 'image' ? 'Hình ảnh' : lastMsg.content) : '',
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
      locale={{ emptyText: <div style={{ textAlign: 'center', padding: 40, color: '#B0B0B0', fontSize: 14 }}>Chưa có cuộc trò chuyện</div> }}
      renderItem={item => (
        <List.Item onClick={() => navigate(`/chat/${item.id}`)} style={{ cursor: 'pointer', padding: '10px 16px' }}>
          <List.Item.Meta
            avatar={
              item.isGroup ? (
                <Avatar size={44} icon={<TeamOutlined />} style={{ background: '#0068FF', borderRadius: 14 }} />
              ) : (
                <Badge dot color={item.statusOnline === 'online' ? '#0AC286' : '#C8C8C8'} offset={[-2, 30]}>
                  <Avatar size={44} src={item.avatar} icon={<UserOutlined />} style={{ borderRadius: 14 }} />
                </Badge>
              )
            }
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 500, color: '#333', lineHeight: '20px' }}>{item.name}</Text>
                {item.time && <Text style={{ fontSize: 11, color: '#B0B0B0', flexShrink: 0 }}>{formatTime(item.time)}</Text>}
              </div>
            }
            description={
              <Text style={{ fontSize: 13, color: item.lastMessage ? '#999' : '#C8C8C8', lineHeight: '18px' }} ellipsis>
                {item.lastMessage || 'Chưa có tin nhắn'}
              </Text>
            }
          />
        </List.Item>
      )}
    />
  )
}

export default ConversationList
