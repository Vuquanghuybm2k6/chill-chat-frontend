import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Chào mừng, {user?.fullName}</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px' }}>Đăng xuất</button>
      </div>
      <div style={{ marginTop: 30, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div
          onClick={() => navigate('/users/not-friend')}
          style={{ padding: 20, border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', flex: 1, minWidth: 200 }}
        >
          <h3>Người dùng</h3>
          <p>Tìm bạn bè</p>
        </div>
        <div
          onClick={() => navigate('/users/friends')}
          style={{ padding: 20, border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', flex: 1, minWidth: 200 }}
        >
          <h3>Bạn bè</h3>
          <p>Danh sách bạn bè</p>
        </div>
        <div
          onClick={() => navigate('/rooms-chat')}
          style={{ padding: 20, border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', flex: 1, minWidth: 200 }}
        >
          <h3>Phòng chat</h3>
          <p>Phòng nhóm</p>
        </div>
      </div>
    </div>
  )
}

export default Home
