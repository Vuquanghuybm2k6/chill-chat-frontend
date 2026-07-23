import { useState, useEffect } from 'react'
import { Avatar, Typography, Badge, Button, Space, Dropdown } from 'antd'
import { UserOutlined, EllipsisOutlined, PhoneOutlined, VideoCameraOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { useAuth } from '../../context/AuthContext'

const { Text } = Typography

const ChatHeader = ({ roomChatId, roomName, avatar }) => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderBottom: '1px solid #e8e8e8' }}>
      <Space>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} className="back-btn" />
        <Badge dot color="#0AC286" offset={[-2, 32]}>
          <Avatar size={38} src={avatar} icon={<UserOutlined />} />
        </Badge>
        <div>
          <Text strong style={{ fontSize: 15 }}>{roomName || 'Đoạn chat'}</Text>
          <div><Text type="secondary" style={{ fontSize: 12 }}>Đang hoạt động</Text></div>
        </div>
      </Space>
      <Space>
        <Button type="text" icon={<PhoneOutlined style={{ fontSize: 18, color: '#0068FF' }} />} />
        <Button type="text" icon={<VideoCameraOutlined style={{ fontSize: 18, color: '#0068FF' }} />} />
        <Dropdown menu={{ items: [{ key: '1', label: 'Xem thông tin' }] }} trigger={['click']}>
          <Button type="text" icon={<EllipsisOutlined style={{ fontSize: 18, color: '#666' }} />} />
        </Dropdown>
      </Space>
    </div>
  )
}

export default ChatHeader
