import { useEffect, useMemo } from 'react'
import { List, Avatar, Button, Typography } from 'antd'
import { UserOutlined, CloseOutlined } from '@ant-design/icons'
import { useChat } from '../../context/ChatContext'
import socket from '../../socket'

const { Text } = Typography

const RequestList = ({ search }) => {
  const { requestList, fetchRequests } = useChat()

  useEffect(() => { fetchRequests() }, [fetchRequests])

  const filtered = useMemo(() => {
    if (!search) return requestList
    return requestList.filter(u => u.fullName?.toLowerCase().includes(search.toLowerCase()))
  }, [requestList, search])

  const handleCancel = (userId) => {
    socket.emit('CLIENT_CANCEL_FRIEND', userId)
  }

  return (
    <List
      dataSource={filtered}
      locale={{ emptyText: search ? 'Không tìm thấy kết quả' : 'Chưa gửi lời mời nào' }}
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
