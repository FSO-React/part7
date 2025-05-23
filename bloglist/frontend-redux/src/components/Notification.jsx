import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === null || notification === '') {
    return null
  }
  return (
    <div style={style} className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification