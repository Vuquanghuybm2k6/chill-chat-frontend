import { useEffect, useMemo } from 'react'
import { List, Avatar, Button, Typography, Space, message as antMsg } from 'antd'
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useChat } from '../../context/ChatContext'
import socket from '../../socket'

const { Text } = Typography

const AcceptList = ({ search }) => {
  const { acceptList, fetchAcceptList } = useChat()

  useEffect(() => { fetchAcceptList() }, [fetchAcceptList])

  const filtered = useMemo(() => {
    if (!search) return acceptList
    return acceptList.filter(u => u.fullName?.toLowerCase().includes(search.toLowerCase()))
  }, [acceptList, search])

  const handleAccept = (userId, fullName) => {
    socket.emit('CLIENT_ACCEPT_FRIEND', userId)
    antMsg.success(`Đã kết bạn với ${fullName}`)
  }

  const handleRefuse = (userId) => {
    socket.emit('CLIENT_REFUSE_FRIEND', userId)
  }

  return (
    <List
      dataSource={filtered}
      locale={{ emptyText: search ? 'Không tìm thấy kết quả' : 'Không có lời mời nào' }}
      renderItem={item => (
        <List.Item style={{ padding: '12px 16px' }}>
          <List.Item.Meta
            avatar={<Avatar size={44} src={item.avatar} icon={<UserOutlined />} />}
            title={<Text strong>{item.fullName}</Text>}
            description={<Text type="secondary">Đã gửi lời mời kết bạn cho bạn</Text>}
          />
          <Space>
            <Button type="primary" icon={<CheckOutlined />} onClick={() => handleAccept(item.id, item.fullName)}>
              Đồng ý
            </Button>
            <Button icon={<CloseOutlined />} onClick={() => handleRefuse(item.id)}>
              Từ chối
            </Button>
          </Space>
        </List.Item>
      )}
    />
  )
}

export default AcceptList
