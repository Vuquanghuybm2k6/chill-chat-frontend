import { useState } from 'react'
import { Typography, Modal } from 'antd'
import { useAuth } from '../../context/AuthContext'

const { Text } = Typography

const MessageBubble = ({ message }) => {
  const { user } = useAuth()
  const [previewVisible, setPreviewVisible] = useState(false)
  const isMine = message.userId === user?.id || message.user_id === user?.id
  const content = message.content || ''
  const imageUrl = message.imageUrl || (message.images && message.images[0])
  const fullName = message.fullName || ''
  const time = message.createdAt || message.timestamp

  const formatTime = (t) => {
    if (!t) return ''
    return new Date(t).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', marginBottom: 6, padding: '0 16px' }}>
      <div style={{ maxWidth: '65%' }}>
        {!isMine && fullName && (
          <Text style={{ fontSize: 12, color: '#666', marginBottom: 2, display: 'block', paddingLeft: 4 }}>
            {fullName}
          </Text>
        )}
        <div style={{
          padding: imageUrl && !content ? 4 : '7px 12px',
          borderRadius: 18,
          background: isMine ? '#0091FF' : '#fff',
          color: isMine ? '#fff' : '#333',
          boxShadow: isMine ? '0 1px 2px rgba(0,145,255,0.2)' : '0 1px 2px rgba(0,0,0,0.06)',
          borderBottomRightRadius: isMine ? 4 : 18,
          borderBottomLeftRadius: isMine ? 18 : 4,
          wordBreak: 'break-word',
          position: 'relative'
        }}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="image"
              style={{ maxWidth: 220, borderRadius: 12, marginBottom: content ? 4 : 0, display: 'block', cursor: 'pointer' }}
              onClick={() => setPreviewVisible(true)}
            />
          )}
          {content && <Text style={{ color: isMine ? '#fff' : '#333', fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: '20px' }}>{content}</Text>}
          <div style={{ textAlign: 'right', marginTop: 4, marginBottom: -2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
            <Text style={{ color: isMine ? 'rgba(255,255,255,0.65)' : '#B0B0B0', fontSize: 11, lineHeight: '14px' }}>
              {formatTime(time)}
            </Text>
          </div>
        </div>
      </div>
      <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)} centered width="auto" styles={{ body: { padding: 0, textAlign: 'center' } }}>
        <img src={imageUrl} alt="preview" style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: 8 }} />
      </Modal>
    </div>
  )
}

export default MessageBubble
