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
    const d = new Date(t)
    return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', marginBottom: 8, padding: '0 16px' }}>
      <div style={{ maxWidth: '70%' }}>
        {!isMine && fullName && (
          <Text type="secondary" style={{ fontSize: 11, marginBottom: 2, display: 'block' }}>
            {fullName}
          </Text>
        )}
        <div style={{
          padding: imageUrl && !content ? '4px' : '8px 14px',
          borderRadius: 16,
          background: isMine ? '#0068FF' : '#fff',
          color: isMine ? '#fff' : '#000',
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
          borderBottomRightRadius: isMine ? 4 : 16,
          borderBottomLeftRadius: isMine ? 16 : 4,
          wordBreak: 'break-word'
        }}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="image"
              style={{ maxWidth: 240, borderRadius: 8, marginBottom: content ? 6 : 0, display: 'block', cursor: 'pointer' }}
              onClick={() => setPreviewVisible(true)}
            />
          )}
          {content && <Text style={{ color: isMine ? '#fff' : '#000', fontSize: 14, whiteSpace: 'pre-wrap' }}>{content}</Text>}
          <div style={{ textAlign: 'right', marginTop: content || imageUrl ? 4 : 0 }}>
            <Text style={{ color: isMine ? 'rgba(255,255,255,0.7)' : '#aaa', fontSize: 10 }}>
              {formatTime(time)}
            </Text>
          </div>
        </div>
      </div>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        centered
        width="auto"
        styles={{ body: { padding: 0, textAlign: 'center' } }}
      >
        <img src={imageUrl} alt="preview" style={{ maxWidth: '80vw', maxHeight: '80vh' }} />
      </Modal>
    </div>
  )
}

export default MessageBubble
