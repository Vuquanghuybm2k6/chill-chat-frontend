import { useState } from 'react'
import { Tabs } from 'antd'
import { TeamOutlined, UserOutlined, SendOutlined, InboxOutlined } from '@ant-design/icons'
import FriendList from './FriendList'
import NotFriendList from './NotFriendList'
import RequestList from './RequestList'
import AcceptList from './AcceptList'

const ContactList = ({ search }) => {
  const [subTab, setSubTab] = useState('friends')

  const items = [
    { key: 'friends', label: <span><TeamOutlined /> Bạn bè</span>, children: <FriendList search={search} /> },
    { key: 'discover', label: <span><UserOutlined /> Khám phá</span>, children: <NotFriendList search={search} /> },
    { key: 'requests', label: <span><SendOutlined /> Đã gửi</span>, children: <RequestList search={search} /> },
    { key: 'accept', label: <span><InboxOutlined /> Lời mời</span>, children: <AcceptList search={search} /> }
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
