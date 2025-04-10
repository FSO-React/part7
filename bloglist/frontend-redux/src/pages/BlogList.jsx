import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogsReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))

  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    margin: 4
  }

  if (!blogs) {
    return null
  }

  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList