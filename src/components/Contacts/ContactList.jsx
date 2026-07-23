import { useState } from 'react'
import { Tabs } from 'antd'
import { TeamOutlined, UserOutlined, SendOutlined, InboxOutlined } from '@ant-design/icons'
import FriendList from './FriendList'
import NotFriendList from './NotFriendList'
import RequestList from './RequestList'
import AcceptList from './AcceptList'

const ContactList = () => {
  const [subTab, setSubTab] = useState('friends')

  const items = [
    { key: 'friends', label: <span><TeamOutlined /> Bạn bè</span>, children: <FriendList /> },
    { key: 'discover', label: <span><UserOutlined /> Khám phá</span>, children: <NotFriendList /> },
    { key: 'requests', label: <span><SendOutlined /> Đã gửi</span>, children: <RequestList /> },
    { key: 'accept', label: <span><InboxOutlined /> Lời mời</span>, children: <AcceptList /> }
  ]

  return (
    <Tabs
      activeKey={subTab}
      onChange={setSubTab}
      items={items}
      size="small"
      style={{ padding: '0 12px' }}
      tabBarStyle={{ marginBottom: 0 }}
    />
  )
}

export default ContactList
