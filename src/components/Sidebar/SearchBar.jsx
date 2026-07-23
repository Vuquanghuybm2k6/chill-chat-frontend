import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchBar = ({ placeholder = 'Tìm kiếm...' }) => (
  <div style={{ padding: '8px 12px' }}>
    <Input prefix={<SearchOutlined style={{ color: '#999' }} />} placeholder={placeholder} variant="borderless" style={{ background: '#f0f0f0', borderRadius: 20 }} />
  </div>
)

export default SearchBar
