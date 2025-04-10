import { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  if (!blogs || blogs.length === 0) {
    return <div>Loading...</div>
  }

  const blog = blogs.find(blog => blog.id === id)

  const buttonStyle = {
    margin: 4
  }

  const deleteButtonStyle = {
    margin: 4,
    backgroundColor: 'red',
    color: 'white'
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

  if (!blog) {
    return (
      <div>
        <h2>Blog not found</h2>
      </div>
    )
  }

  return (
    <div className='blog'>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}> {blog.url} </a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLikeBlog} style={buttonStyle} id='like_blog'> like </button>
      </div>
      <div>
        <strong>author:</strong> {blog.author}
      </div>
      <button onClick={handleRemoveBlog} style={deleteButtonStyle}> remove </button>
    </div>
  )
}

export default Blog