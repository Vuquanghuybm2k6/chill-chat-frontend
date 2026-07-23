import { useEffect, useMemo } from 'react'
import { List, Avatar, Badge, Button, Typography, Modal } from 'antd'
import { UserOutlined, MessageOutlined, StopOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'
import socket from '../../socket'

const { Text } = Typography

const FriendList = ({ search }) => {
  const { friends, fetchFriends } = useChat()
  const navigate = useNavigate()

  useEffect(() => { fetchFriends() }, [fetchFriends])

  const filtered = useMemo(() => {
    if (!search) return friends
    return friends.filter(f => f.fullName?.toLowerCase().includes(search.toLowerCase()))
  }, [friends, search])

  const handleUnfriend = (item) => {
    Modal.confirm({
      title: 'Hủy kết bạn',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc muốn hủy kết bạn với ${item.fullName}?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => socket.emit('CLIENT_UNFRIEND', item.id)
    })
  }

  return (
    <List
      dataSource={filtered}
      locale={{ emptyText: search ? 'Không tìm thấy kết quả' : 'Chưa có bạn bè' }}
      renderItem={item => (
        <List.Item style={{ padding: '12px 16px' }}>
          <List.Item.Meta
            avatar={
              <Badge dot color={item.statusOnline === 'online' ? '#0AC286' : '#ccc'} offset={[-2, 32]}>
                <Avatar size={44} src={item.avatar} icon={<UserOutlined />} />
              </Badge>
            }
            title={<Text strong>{item.fullName}</Text>}
            description={<Text type="secondary">{item.statusOnline === 'online' ? 'Đang hoạt động' : 'Ngoại tuyến'}</Text>}
          />
          <div style={{ display: 'flex', gap: 4 }}>
            <Button icon={<MessageOutlined />} onClick={() => navigate(`/chat/${item.roomChatId}`)}>
              Nhắn tin
            </Button>
            <Button icon={<StopOutlined />} danger onClick={() => handleUnfriend(item)} />
          </div>
        </List.Item>
      )}
    />
  )
}

export default FriendList
