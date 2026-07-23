import { useEffect, useRef } from 'react'
import { Spin, Empty } from 'antd'
import MessageBubble from './MessageBubble'
import { useChat } from '../../context/ChatContext'

const MessageList = ({ roomChatId }) => {
  const { messages, loading } = useChat()
  const bottomRef = useRef(null)
  const list = messages[roomChatId] || []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [list.length])

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '12px 0', background: '#f0f0f0' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
      ) : list.length === 0 ? (
        <Empty description="Chưa có tin nhắn" style={{ marginTop: 60 }} />
      ) : (
        list.map((msg, idx) => (
          <MessageBubble key={msg._id || idx} message={msg} />
        ))
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
