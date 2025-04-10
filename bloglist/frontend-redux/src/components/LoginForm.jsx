import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const doLogin = (event) => {
    event.preventDefault()
    const loginObject = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    dispatch(loginUser(loginObject))
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <div>
      <h1>Log in to application</h1>

      <form onSubmit={doLogin}>
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