import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useUserDispatch } from '../contexts/UserContext'
import { setToken } from '../services/blogs'
import { login } from '../services/login'

const LoginForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const loginObject = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    try {
      const user = await login(loginObject)
      if (user) {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        setToken(user.token)
        userDispatch({ type: 'SET', payload: user })
        notificationDispatch({ type: 'SET', payload: { message: 'login successful!', status: 'success' } })
        setTimeout(() => {
          notificationDispatch({ type: 'RESET' })
        }
        , 5000)
      }
    } catch (exception) {
      notificationDispatch({ type: 'SET', payload: { message: 'wrong username or password', status: 'error' } })
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' })
      }
      , 5000)
    }
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <div>
      <h1>Log in to application</h1>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            name="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm