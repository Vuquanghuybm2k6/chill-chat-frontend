import { useEffect, useRef, useMemo } from 'react'
import { Spin, Empty, Typography } from 'antd'
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
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Hôm qua'
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '12px 0', background: '#f0f0f0' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
      ) : list.length === 0 ? (
        <Empty description="Chưa có tin nhắn" style={{ marginTop: 60 }} />
      ) : (
        grouped.map((item, idx) => {
          if (item.type === 'date') {
            return (
              <div key={`date-${idx}`} style={{ textAlign: 'center', margin: '12px 0' }}>
                <Text style={{ fontSize: 12, color: '#999', background: '#e0e0e0', padding: '2px 12px', borderRadius: 10 }}>
                  {formatDate(item.date)}
                </Text>
              </div>
            )
          }
          return <MessageBubble key={item.data._id || idx} message={item.data} />
        })
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
