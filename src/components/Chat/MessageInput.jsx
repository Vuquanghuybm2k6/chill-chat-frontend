import { useState, useRef } from 'react'
import { Input, Button } from 'antd'
import { SendOutlined, PictureOutlined, SmileOutlined } from '@ant-design/icons'
import socket from '../../socket'
import { useAuth } from '../../context/AuthContext'
import api from '../../api'

const MessageInput = ({ roomChatId }) => {
  const [text, setText] = useState('')
  const fileRef = useRef(null)
  const { user } = useAuth()

  const handleSend = () => {
    const content = text.trim()
    if (!content) return
    socket.emit('CLIENT_SEND_MESSAGE', {
      roomChatId,
      type: 'text',
      content
    })
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('avatar', file)
    try {
      const res = await api.post(`/chat/${roomChatId}/sendImage`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.data.success) {
        socket.emit('CLIENT_SEND_MESSAGE', {
          roomChatId,
          type: 'image',
          imageUrl: res.data.imageUrl,
          content: ''
        })
      }
    } catch {}
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', background: '#fff', borderTop: '1px solid #e8e8e8', gap: 8 }}>
      <input type="file" ref={fileRef} accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
      <Button type="text" icon={<PictureOutlined style={{ fontSize: 22, color: '#666' }} />} onClick={() => fileRef.current?.click()} />
      <Button type="text" icon={<SmileOutlined style={{ fontSize: 22, color: '#666' }} />} />
      <Input.TextArea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập tin nhắn..."
        autoSize={{ minRows: 1, maxRows: 4 }}
        variant="borderless"
        style={{ flex: 1, background: '#f0f0f0', borderRadius: 20, padding: '8px 16px' }}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        onClick={handleSend}
        disabled={!text.trim()}
        style={{ minWidth: 40, height: 40 }}
      />
    </div>
  )
}

export default MessageInput
