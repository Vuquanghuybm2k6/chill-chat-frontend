import { useEffect } from 'react'
import { List, Avatar, Button, Typography } from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons'
import { useChat } from '../../context/ChatContext'
import socket from '../../socket'
import { useAuth } from '../../context/AuthContext'

const { Text } = Typography

const NotFriendList = () => {
  const { contacts, fetchContacts } = useChat()
  const { user } = useAuth()

  useEffect(() => { fetchContacts() }, [fetchContacts])

  const handleAddFriend = (userId) => {
    socket.emit('CLIENT_ADD_FRIEND', userId)
  }

  return (
    <List
      dataSource={contacts}
      locale={{ emptyText: 'Không tìm thấy người dùng nào' }}
      renderItem={item => (
        <List.Item style={{ padding: '12px 16px' }}>
          <List.Item.Meta
            avatar={<Avatar size={44} src={item.avatar} icon={<UserOutlined />} />}
            title={<Text strong>{item.fullName}</Text>}
            description={<Text type="secondary">Người lạ</Text>}
          />
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => handleAddFriend(item.id)}>
            Kết bạn
          </Button>
        </List.Item>
      )}
    />
  )
}

export default NotFriendList
