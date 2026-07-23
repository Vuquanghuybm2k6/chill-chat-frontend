import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import api from '../api'
import socket from '../socket'

const ChatContext = createContext()

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('messages')
  const [conversations, setConversations] = useState([])
  const [activeRoomId, setActiveRoomId] = useState(null)
  const [messages, setMessages] = useState({})
  const [contacts, setContacts] = useState([])
  const [friends, setFriends] = useState([])
  const [requestList, setRequestList] = useState([])
  const [acceptList, setAcceptList] = useState([])
  const [loading, setLoading] = useState(false)

  const addMessage = useCallback((roomId, message) => {
    setMessages(prev => ({ ...prev, [roomId]: [...(prev[roomId] || []), message] }))
  }, [])

  const fetchFriends = useCallback(async () => {
    try {
      const res = await api.get('/users/friends')
      setFriends(res.data.data.users || [])
    } catch {}
  }, [])

  const fetchContacts = useCallback(async () => {
    try {
      const res = await api.get('/users/not-friend')
      setContacts(res.data.data.users || [])
    } catch {}
  }, [])

  const fetchRequests = useCallback(async () => {
    try {
      const res = await api.get('/users/request')
      setRequestList(res.data.data.users || [])
    } catch {}
  }, [])

  const fetchAcceptList = useCallback(async () => {
    try {
      const res = await api.get('/users/accept')
      setAcceptList(res.data.data.users || [])
    } catch {}
  }, [])

  const fetchConversations = useCallback(async () => {
    try {
      const res = await api.get('/rooms-chat')
      setConversations(res.data.data.listRoomChat || [])
    } catch {}
  }, [])

  const fetchMessages = useCallback(async (roomId) => {
    try {
      const res = await api.get(`/chat/${roomId}`)
      setMessages(prev => ({ ...prev, [roomId]: res.data.data.chats || [] }))
    } catch {}
  }, [])

  useEffect(() => {
    socket.on('SERVER_RETURN_MESSAGE', (data) => {
      addMessage(data.room_chat_id, data)
    })
    return () => { socket.off('SERVER_RETURN_MESSAGE') }
  }, [addMessage])

  return (
    <ChatContext.Provider value={{
      activeTab, setActiveTab,
      conversations, setConversations,
      activeRoomId, setActiveRoomId,
      messages, setMessages, addMessage,
      contacts, setContacts,
      friends, setFriends,
      requestList, setRequestList,
      acceptList, setAcceptList,
      loading, setLoading,
      fetchFriends, fetchContacts, fetchRequests, fetchAcceptList,
      fetchConversations, fetchMessages
    }}>
      {children}
    </ChatContext.Provider>
  )
}
