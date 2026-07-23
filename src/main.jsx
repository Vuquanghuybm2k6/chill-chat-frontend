import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#0068FF',
        colorBgLayout: '#EDEDED',
        borderRadius: 8,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 14,
        controlHeight: 36
      },
      components: {
        Layout: {
          bodyBg: '#EDEDED',
          siderBg: '#FFFFFF',
          headerBg: '#FFFFFF'
        },
        Tabs: {
          inkBarColor: '#0068FF',
          itemSelectedColor: '#0068FF',
          itemColor: '#666',
          fontSize: 14
        },
        List: {
          itemPaddingSM: '10px 16px'
        },
        Button: {
          controlHeight: 36,
          borderRadius: 8
        },
        Input: {
          controlHeight: 40,
          borderRadius: 20
        },
        Badge: {
          dotSize: 10
        }
      }
    }}
  >
    <App />
  </ConfigProvider>
)
