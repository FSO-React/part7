import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppProviders from './contexts/AppProviders'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient()}>
    <AppProviders>
      <App />
    </AppProviders>
  </QueryClientProvider>
)