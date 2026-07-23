import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchBar = ({ placeholder = 'Tìm kiếm...', value, onChange }) => (
  <div style={{ padding: '8px 12px 4px' }}>
    <Input
      prefix={<SearchOutlined style={{ color: '#B0B0B0', fontSize: 16 }} />}
      placeholder={placeholder}
      variant="borderless"
      style={{ background: '#F0F0F0', borderRadius: 22, height: 36, fontSize: 14, padding: '4px 12px' }}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      allowClear
    />
  </div>
)

export default SearchBar
