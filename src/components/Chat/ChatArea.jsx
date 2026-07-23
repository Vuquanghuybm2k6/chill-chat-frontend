import { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { useChat } from '../../context/ChatContext'
import { useAuth } from '../../context/AuthContext'
import socket from '../../socket'
import api from '../../api'

const ChatArea = ({ roomChatId }) => {
  const { fetchMessages, setActiveRoomId, friends } = useChat()
  const { user } = useAuth()
  const [roomInfo, setRoomInfo] = useState(null)

  useEffect(() => {
    if (!roomChatId) return
    setActiveRoomId(roomChatId)
    fetchMessages(roomChatId)
    socket.emit('CLIENT_JOIN_ROOM', roomChatId)
  }, [roomChatId, fetchMessages, setActiveRoomId])

  useEffect(() => {
    const friend = friends.find(f => f.roomChatId === roomChatId)
    if (friend) {
      setRoomInfo({ name: friend.fullName, avatar: friend.avatar, statusOnline: friend.statusOnline })
    }
  }, [roomChatId, friends])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatHeader roomChatId={roomChatId} roomName={roomInfo?.name} avatar={roomInfo?.avatar} />
      <MessageList roomChatId={roomChatId} />
      <MessageInput roomChatId={roomChatId} />
    </div>
  )
}

export default ChatArea
