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
  const [searchTerm, setSearchTerm] = useState('')

  const addMessage = useCallback((roomId, message) => {
    setMessages(prev => ({ ...prev, [roomId]: [...(prev[roomId] || []), message] }))
  }, [])

  const fetchFriends = useCallback(async () => {
    try { const res = await api.get('/users/friends'); setFriends(res.data.data.users || []) } catch {}
  }, [])

  const fetchContacts = useCallback(async () => {
    try { const res = await api.get('/users/not-friend'); setContacts(res.data.data.users || []) } catch {}
  }, [])

  const fetchRequests = useCallback(async () => {
    try { const res = await api.get('/users/request'); setRequestList(res.data.data.users || []) } catch {}
  }, [])

  const fetchAcceptList = useCallback(async () => {
    try { const res = await api.get('/users/accept'); setAcceptList(res.data.data.users || []) } catch {}
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
    if (!socket.connected) return

    socket.on('SERVER_RETURN_MESSAGE', (data) => {
      addMessage(data.room_chat_id, data)
    })

    socket.on('SERVER_RETURN_LENGTH_ACCEPT_FRIEND', () => { fetchAcceptList() })
    socket.on('SERVER_RETURN_INFO_ACCEPT_FRIEND', () => { fetchAcceptList() })
    socket.on('SERVER_RETURN_USER_ID_CANCEL_FRIEND', () => { fetchAcceptList(); fetchContacts() })
    socket.on('SERVER_RETURN_UNFRIEND', () => { fetchFriends(); fetchConversations() })
    socket.on('SERVER_RETURN_USER_ONLINE', (userId) => {
      setFriends(prev => prev.map(f => f.id === userId ? { ...f, statusOnline: 'online' } : f))
    })
    socket.on('SERVER_RETURN_USER_OFFLINE', (userId) => {
      setFriends(prev => prev.map(f => f.id === userId ? { ...f, statusOnline: 'offline' } : f))
    })

    return () => {
      socket.off('SERVER_RETURN_MESSAGE')
      socket.off('SERVER_RETURN_LENGTH_ACCEPT_FRIEND')
      socket.off('SERVER_RETURN_INFO_ACCEPT_FRIEND')
      socket.off('SERVER_RETURN_USER_ID_CANCEL_FRIEND')
      socket.off('SERVER_RETURN_UNFRIEND')
      socket.off('SERVER_RETURN_USER_ONLINE')
      socket.off('SERVER_RETURN_USER_OFFLINE')
    }
  }, [addMessage, fetchAcceptList, fetchContacts, fetchFriends, fetchConversations])

  useEffect(() => {
    if (socket.connected) {
      fetchFriends()
      fetchConversations()
    }
    socket.on('connect', () => {
      fetchFriends()
      fetchConversations()
    })
    return () => { socket.off('connect') }
  }, [fetchFriends, fetchConversations])

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
      searchTerm, setSearchTerm,
      fetchFriends, fetchContacts, fetchRequests, fetchAcceptList,
      fetchConversations, fetchMessages
    }}>
      {children}
    </ChatContext.Provider>
  )
}
