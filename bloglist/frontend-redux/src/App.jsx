import PrivateRoutes from './components/PrivateRoutes'
import Login from './pages/Login'
import Menu from './components/Menu'

import blogService from './services/blogs'
import storageService from './services/storage'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logIn } from './reducers/loginReducer'
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import {
  Container,
} from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  useEffect(() => {
    if (loggedUser) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [loggedUser, dispatch])

  useEffect(() => {
    const user = storageService.getUser()
    if (user) {
      blogService.setToken(user.token)
      dispatch(logIn(user))
    }
  }, [dispatch])

  if (!loggedUser) {
    return (
      <Container className='m-auto'>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Container>
    )
  }

  return (
    <div>
      <Menu />
      <Container className='m-auto'>
        <PrivateRoutes />
      </Container>
    </div>
  )
}

export default App