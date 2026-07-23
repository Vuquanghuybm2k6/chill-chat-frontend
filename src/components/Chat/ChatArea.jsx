import { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { useChat } from '../../context/ChatContext'
import socket from '../../socket'

const ChatArea = ({ roomChatId }) => {
  const { fetchMessages, setActiveRoomId } = useChat()

  useEffect(() => {
    if (!roomChatId) return
    setActiveRoomId(roomChatId)
    fetchMessages(roomChatId)
    socket.emit('CLIENT_JOIN_ROOM', roomChatId)
  }, [roomChatId, fetchMessages, setActiveRoomId])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatHeader roomChatId={roomChatId} />
      <MessageList roomChatId={roomChatId} />
      <MessageInput roomChatId={roomChatId} />
    </div>
  )
}

export default ChatArea
