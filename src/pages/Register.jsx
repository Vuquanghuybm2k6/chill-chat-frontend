import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng kí thất bại')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h1>Đăng kí tài khoản</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Họ tên</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Số điện thoại</label>
          <input name="phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Mật khẩu</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Đăng kí</button>
      </form>
      <p style={{ marginTop: 15 }}><Link to="/login">Đã có tài khoản? Đăng nhập</Link></p>
    </div>
  )
}

export default Register
