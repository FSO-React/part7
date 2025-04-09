import { NotificationContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'

export default function AppProviders({ children }) {
  return (
    <UserContextProvider>
      <NotificationContextProvider>
        {children}
      </NotificationContextProvider>
    </UserContextProvider>
  )
}