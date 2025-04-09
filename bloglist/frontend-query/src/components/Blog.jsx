import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { update, remove } from '../services/blogs'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    margin: 4
  }

  const buttonStyle = {
    margin: 4
  }

  const deleteButtonStyle = {
    margin: 4,
    backgroundColor: 'red',
    color: 'white'
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'SET', payload: { message: 'blog updated successfully!', status: 'success' } })
    },
    onError: () => {
      notificationDispatch({ type: 'SET', payload: { message: 'blog failed to be updated', status: 'error' } })
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'SET', payload: { message: 'blog removed successfully!', status: 'success' } })
    },
    onError: () => {
      notificationDispatch({ type: 'SET', payload: { message: 'blog failed to be removed', status: 'error' } })
    }
  })

  const likeBlog = (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlogMutation.mutate(updatedBlog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog "${blog.title}" (by ${blog.author})?`)) {
      const removeBlog = {
        ...blog,
      }
      removeBlogMutation.mutate(removeBlog)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} - {blog.author}
      <button onClick={toggleDetails} style={buttonStyle} id='toggle-details'> view </button>
      <div>
        {showDetails &&
          <div>
            <div>
              <strong>url:</strong> <a href={blog.url}> {blog.url} </a>
            </div>
            <div>
              <strong>likes:</strong> {blog.likes}
              <button onClick={likeBlog} style={buttonStyle} id='like_blog'> like </button>
            </div>
            <div>
              <strong>author:</strong> {blog.author}
            </div>
            <button onClick={deleteBlog} style={deleteButtonStyle}> remove </button>
          </div>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog