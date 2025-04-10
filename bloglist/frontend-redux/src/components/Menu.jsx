import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import storageService from '../services/storage'

import Togglable from './Togglable'
import LoginForm from './LoginForm'

const Menu = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  const padding = {
    paddingRight: 5
  }

  const handleLogout = (event) => {
    event.preventDefault()
    storageService.removeUser()
    dispatch(logOut())
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm />
      </Togglable>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {!loggedUser && loginForm()}
      {loggedUser &&
        <div>
          {loggedUser.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      }
    </div>
  )
}

export default Menu