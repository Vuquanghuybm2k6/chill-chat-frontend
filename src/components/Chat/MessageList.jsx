import { useEffect, useRef, useMemo } from 'react'
import { Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import MessageBubble from './MessageBubble'
import { useChat } from '../../context/ChatContext'

const { Text } = Typography

const MessageList = ({ roomChatId }) => {
  const { messages, loading } = useChat()
  const bottomRef = useRef(null)
  const list = messages[roomChatId] || []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [list.length])

  const grouped = useMemo(() => {
    const groups = []
    let lastDate = ''
    list.forEach(msg => {
      const d = msg.createdAt || msg.timestamp
      const dateStr = d ? new Date(d).toLocaleDateString('vi-VN') : ''
      if (dateStr && dateStr !== lastDate) {
        groups.push({ type: 'date', date: d })
        lastDate = dateStr
      }
      groups.push({ type: 'msg', data: msg })
    })
    return groups
  }, [list])

  const formatDate = (t) => {
    if (!t) return ''
    const d = new Date(t)
    const now = new Date()
    if (d.toDateString() === now.toDateString()) return 'Hôm nay'
    const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Hôm qua'
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '8px 0', background: '#EDEDED' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin indicator={<LoadingOutlined spin />} /></div>
      ) : list.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#B0B0B0' }}>
          <Text style={{ fontSize: 14 }}>Chưa có tin nhắn</Text>
          <div style={{ fontSize: 13, color: '#ccc', marginTop: 4 }}>Hãy bắt đầu cuộc trò chuyện</div>
        </div>
      ) : (
        grouped.map((item, idx) => {
          if (item.type === 'date') {
            return (
              <div key={`date-${idx}`} style={{ textAlign: 'center', margin: '10px 0' }}>
                <Text style={{ fontSize: 12, color: '#999', background: '#E0E0E0', padding: '2px 14px', borderRadius: 10, lineHeight: '20px', display: 'inline-block' }}>
                  {formatDate(item.date)}
                </Text>
              </div>
            )
          }
          return <MessageBubble key={item.data._id || `msg-${idx}`} message={item.data} />
        })
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
