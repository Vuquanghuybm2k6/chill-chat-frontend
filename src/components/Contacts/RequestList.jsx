import { useEffect } from 'react'
import { List, Avatar, Button, Typography } from 'antd'
import { UserOutlined, CloseOutlined } from '@ant-design/icons'
import { useChat } from '../../context/ChatContext'
import socket from '../../socket'

const { Text } = Typography

const RequestList = () => {
  const { requestList, fetchRequests } = useChat()

  useEffect(() => { fetchRequests() }, [fetchRequests])

  const handleCancel = (userId) => {
    socket.emit('CLIENT_CANCEL_FRIEND', userId)
  }

  return (
    <List
      dataSource={requestList}
      locale={{ emptyText: 'Chưa gửi lời mời nào' }}
      renderItem={item => (
        <List.Item style={{ padding: '12px 16px' }}>
          <List.Item.Meta
            avatar={<Avatar size={44} src={item.avatar} icon={<UserOutlined />} />}
            title={<Text strong>{item.fullName}</Text>}
            description={<Text type="secondary">Đã gửi lời mời kết bạn</Text>}
          />
          <Button icon={<CloseOutlined />} onClick={() => handleCancel(item.id)}>
            Hủy lời mời
          </Button>
        </List.Item>
      )}
    />
  )
}

export default RequestList
