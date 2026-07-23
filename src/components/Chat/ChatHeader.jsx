import { Avatar, Typography, Badge, Button, Space, Dropdown } from 'antd'
import { UserOutlined, EllipsisOutlined, PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useChat } from '../../context/ChatContext'

const { Text } = Typography

const ChatHeader = ({ roomChatId, roomName, avatar, statusOnline }) => {
  const { typingUsers } = useChat()
  const typingInfo = typingUsers[roomChatId]
  const isOnline = statusOnline === 'online'

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#fff', borderBottom: '1px solid #E8E8E8', height: 60, flexShrink: 0 }}>
      <Space size={12}>
        <Badge dot color={isOnline ? '#0AC286' : '#ccc'} offset={[-2, 32]}>
          <Avatar size={40} src={avatar} icon={<UserOutlined />} />
        </Badge>
        <div>
          <Text strong style={{ fontSize: 15, color: '#333', lineHeight: '20px' }}>{roomName || 'Đoạn chat'}</Text>
          {typingInfo ? (
            <div style={{ fontSize: 12, color: '#0068FF', lineHeight: '16px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                {typingInfo.fullName} đang soạn
                <span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>
              </span>
            </div>
          ) : (
            <div style={{ fontSize: 12, color: isOnline ? '#0AC286' : '#999', lineHeight: '16px' }}>
              {isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}
            </div>
          )}
        </div>
      </Space>
      <Space size={2}>
        <Button type="text" icon={<PhoneOutlined style={{ fontSize: 20, color: '#0068FF' }} />} style={{ width: 40, height: 40 }} />
        <Button type="text" icon={<VideoCameraOutlined style={{ fontSize: 20, color: '#0068FF' }} />} style={{ width: 40, height: 40 }} />
        <Dropdown menu={{ items: [{ key: '1', label: 'Xem thông tin' }] }} trigger={['click']}>
          <Button type="text" icon={<EllipsisOutlined style={{ fontSize: 20, color: '#666' }} />} style={{ width: 40, height: 40 }} />
        </Dropdown>
      </Space>
    </div>
  )
}

export default ChatHeader
