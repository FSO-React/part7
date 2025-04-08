import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

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

  const handleLikeBlog = (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(updatedBlog))
  }

  const handleRemoveBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog "${blog.title}" (by ${blog.author})?`)) {
      dispatch(deleteBlog(blog))
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
              <button onClick={handleLikeBlog} style={buttonStyle} id='like_blog'> like </button>
            </div>
            <div>
              <strong>author:</strong> {blog.author}
            </div>
            <button onClick={handleRemoveBlog} style={deleteButtonStyle}> remove </button>
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