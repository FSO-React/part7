import { NotificationContextProvider, useNotificationValue } from '../contexts/NotificationContext'
import { useUserValue } from '../contexts/UserContext'

const Notification = () => {
  const notification = useNotificationValue()

  return (
    <div>
      {notification &&
        <div className={`${notification.status} notification`}>
          {notification.message}
        </div>
      }
    </div>
  )
}

export default Notification