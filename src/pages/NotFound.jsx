import { Link } from 'react-router-dom'

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: 100 }}>
    <h1>404</h1>
    <p>Trang không tồn tại</p>
    <Link to="/">Về trang chủ</Link>
  </div>
)

export default NotFound
