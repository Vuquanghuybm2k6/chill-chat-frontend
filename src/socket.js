import { io } from 'socket.io-client'

const socket = io({
  auth: { token: localStorage.getItem('token') },
  autoConnect: false
})

export const connectSocket = () => {
  const token = localStorage.getItem('token')
  if (!token || socket.connected) return
  socket.auth = { token }
  socket.connect()
}

export const disconnectSocket = () => {
  socket.disconnect()
}

export default socket
