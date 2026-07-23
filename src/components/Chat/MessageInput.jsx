import { useState, useRef, useCallback } from 'react'
import { Input, Button } from 'antd'
import { SendOutlined, PictureOutlined } from '@ant-design/icons'
import socket from '../../socket'
import api from '../../api'

const MessageInput = ({ roomChatId }) => {
  const [text, setText] = useState('')
  const fileRef = useRef(null)
  const typingTimer = useRef(null)

  const emitTyping = useCallback(() => {
    socket.emit('CLIENT_TYPING', roomChatId)
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      socket.emit('CLIENT_STOP_TYPING', roomChatId)
    }, 1500)
  }, [roomChatId])

  const handleChange = (e) => {
    setText(e.target.value)
    emitTyping()
  }

  const handleSend = () => {
    const content = text.trim()
    if (!content) return
    socket.emit('CLIENT_SEND_MESSAGE', { roomChatId, type: 'text', content })
    setText('')
    clearTimeout(typingTimer.current)
    socket.emit('CLIENT_STOP_TYPING', roomChatId)
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
        socket.emit('CLIENT_SEND_MESSAGE', { roomChatId, type: 'image', imageUrl: res.data.imageUrl, content: '' })
      }
    } catch {}
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', padding: '8px 12px', background: '#fff', borderTop: '1px solid #E8E8E8', gap: 8 }}>
      <input type="file" ref={fileRef} accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
      <Button type="text" icon={<PictureOutlined style={{ fontSize: 24, color: '#666' }} />} onClick={() => fileRef.current?.click()} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
      <div style={{ flex: 1, background: '#F0F0F0', borderRadius: 22, padding: '0 16px' }}>
        <Input.TextArea
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          variant="borderless"
          style={{ fontSize: 14, padding: '8px 0' }}
        />
      </div>
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        onClick={handleSend}
        disabled={!text.trim()}
        style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      />
    </div>
  )
}

export default MessageInput
