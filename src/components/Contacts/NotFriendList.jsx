import { useEffect, useMemo } from 'react'
import { List, Avatar, Button, Typography, message as antMsg } from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons'
import { useChat } from '../../context/ChatContext'
import socket from '../../socket'

const { Text } = Typography

const NotFriendList = ({ search }) => {
  const { contacts, fetchContacts } = useChat()

  useEffect(() => { fetchContacts() }, [fetchContacts])

  const filtered = useMemo(() => {
    if (!search) return contacts
    return contacts.filter(u => u.fullName?.toLowerCase().includes(search.toLowerCase()))
  }, [contacts, search])

  const handleAddFriend = (userId, fullName) => {
    socket.emit('CLIENT_ADD_FRIEND', userId)
    antMsg.success(`Đã gửi lời mời kết bạn đến ${fullName}`)
  }

  return (
    <List
      dataSource={filtered}
      locale={{ emptyText: search ? 'Không tìm thấy kết quả' : 'Không tìm thấy người dùng nào' }}
      renderItem={item => (
        <List.Item style={{ padding: '12px 16px' }}>
          <List.Item.Meta
            avatar={<Avatar size={44} src={item.avatar} icon={<UserOutlined />} />}
            title={<Text strong>{item.fullName}</Text>}
            description={<Text type="secondary">Người lạ</Text>}
          />
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => handleAddFriend(item.id, item.fullName)}>
            Kết bạn
          </Button>
        </List.Item>
      )}
    />
  )
}

export default NotFriendList
