import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'
import { connectSocket, disconnectSocket } from '../socket'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      connectSocket()
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/user/login', { email, password })
    const { token, user: userData } = res.data.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    connectSocket()
    return userData
  }

  const register = async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))
    const res = await api.post('/user/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    const { token, user: userData } = res.data.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    connectSocket()
    return userData
  }

  const logout = async () => {
    try { await api.get('/user/logout') } catch {}
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    disconnectSocket()
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
