import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h1>Đăng nhập</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Mật khẩu</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Đăng nhập</button>
      </form>
      <p style={{ marginTop: 15 }}><Link to="/register">Đăng kí tài khoản</Link></p>
      <p><Link to="/forgot-password">Quên mật khẩu?</Link></p>
    </div>
  )
}

export default Login
