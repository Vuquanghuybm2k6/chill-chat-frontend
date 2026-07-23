import { useState, useEffect } from 'react'
import { Modal, Form, Input, Select, Button, Avatar, message as antMsg } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'
import api from '../../api'
import { useNavigate } from 'react-router-dom'

const GroupChatModal = ({ open, onClose }) => {
  const [form] = Form.useForm()
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const fetchFriends = async () => {
      try {
        const res = await api.get('/rooms-chat/create')
        setFriends((res.data.data.listFriend || []).map(f => ({
          value: f.user_id,
          label: f.infoFriend?.fullName || f.user_id,
          avatar: f.infoFriend?.avatar
        })))
      } catch {}
    }
    fetchFriends()
  }, [open])

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const res = await api.post('/rooms-chat/create', {
        title: values.title,
        usersId: Array.isArray(values.usersId) ? values.usersId : [values.usersId]
      })
      antMsg.success('Tạo phòng thành công')
      onClose()
      form.resetFields()
      navigate(`/chat/${res.data.data.roomId}`)
    } catch (err) {
      antMsg.error(err.response?.data?.message || 'Tạo phòng thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={<span><TeamOutlined /> Tạo phòng chat</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Tên phòng" rules={[{ required: true, message: 'Vui lòng nhập tên phòng' }]}>
          <Input placeholder="Nhập tên phòng..." />
        </Form.Item>
        <Form.Item name="usersId" label="Thêm bạn bè" rules={[{ required: true, message: 'Vui lòng chọn bạn bè' }]}>
          <Select
            mode="multiple"
            placeholder="Chọn bạn bè..."
            options={friends}
            optionRender={(option) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar size={24} src={option.data.avatar} icon={<UserOutlined />} />
                <span>{option.data.label}</span>
              </div>
            )}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={loading}>Tạo phòng</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default GroupChatModal
