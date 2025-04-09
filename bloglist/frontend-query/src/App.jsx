import { useState, useEffect } from 'react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from './contexts/NotificationContext'
import { useUserDispatch, useUserValue } from './contexts/UserContext'
import { getAllBlogs, setToken, create, update, remove } from './services/blogs'
import { login } from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
      setToken(user.token)
    }
  }, [userDispatch])

  const { status: blogStatus, data: unSortedBlogs, error: blogError } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
    retry: false,
    refetchOnWindowFocus: false
  })
  if ( blogStatus === 'loading' || blogStatus === 'idle' || blogStatus === 'pending' ) {
    return <div>loading...</div>
  }
  if ( blogStatus === 'error' ) {
    notificationDispatch({ type: 'SET', payload: { message: `error fetching blogs: ${blogError.message}`, status: 'error' } })
  }
  const blogs = unSortedBlogs.sort((a, b) => b.likes - a.likes)

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'RESET' })
    notificationDispatch({ type: 'SET', payload: { message: 'logout successful!', status: 'success' } })
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' })
    }
    , 5000)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog'>
        <BlogForm />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />

      {!user && loginForm()}
      {user &&
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
        </div>
      }

      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App