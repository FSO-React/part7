import User from './pages/User'
import Blog from './pages/Blog'
import UserList from './pages/UserList'
import BlogList from './pages/BlogList'

import Menu from './components/Menu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

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
  useMatch,
} from 'react-router-dom'

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
  }, [])


  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog'>
        <BlogForm />
      </Togglable>
    )
  }

  const matchBlogs = useMatch('/blogs/:id')
  const blog = matchBlogs
    ? blogs.find(blog => blog.id === matchBlogs.params.id)
    : null


  return (
    <div>
      <Menu />
      <br />
      <h1>blogs</h1>
      <Notification />

      {user &&
        <div>
          {blogForm()}
        </div>
      }

      <br />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/*" element={<h1> 404 Page Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App