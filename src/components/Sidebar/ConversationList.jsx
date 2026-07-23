import { List, Avatar, Badge, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'

const { Text } = Typography

const ConversationList = () => {
  const navigate = useNavigate()
  const { conversations } = useChat()

  return (
    <List
      dataSource={conversations}
      locale={{ emptyText: 'Chưa có cuộc trò chuyện nào' }}
      renderItem={item => (
        <List.Item onClick={() => navigate(`/chat/${item.id}`)} style={{ cursor: 'pointer', padding: '12px 16px' }}>
          <List.Item.Meta
            avatar={<Badge dot color="#0AC286" offset={[-2, 28]}><Avatar size={44} icon={<UserOutlined />} /></Badge>}
            title={<Text strong>{item.name}</Text>}
            description={<Text type="secondary" ellipsis>{item.lastMessage}</Text>}
          />
        </List.Item>
      )}
    />
  )
}

export default ConversationList
