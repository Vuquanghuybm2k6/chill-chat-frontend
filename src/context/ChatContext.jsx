import { createContext, useContext, useState, useCallback } from 'react'

const ChatContext = createContext()

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('messages')
  const [conversations, setConversations] = useState([])
  const [activeRoomId, setActiveRoomId] = useState(null)
  const [messages, setMessages] = useState({})
  const [contacts, setContacts] = useState([])
  const [friends, setFriends] = useState([])

  const addMessage = useCallback((roomId, message) => {
    setMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), message]
    }))
  }, [])

  return (
    <ChatContext.Provider value={{
      activeTab, setActiveTab,
      conversations, setConversations,
      activeRoomId, setActiveRoomId,
      messages, setMessages, addMessage,
      contacts, setContacts,
      friends, setFriends
    }}>
      {children}
    </ChatContext.Provider>
  )
}
