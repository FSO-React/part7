import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogsReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import {
  Accordion,
  Button,
  Form,
  Card
} from 'react-bootstrap'


const BlogList = () => {
  const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))
  const loggedUser = useSelector(state => state.login)

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
      <Accordion defaultActiveKey="0" className='m-2 mt-4 mb-4'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Create a new blog</Accordion.Header>
          <Accordion.Body>
            <BlogForm />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', fontSize: '50px', marginBottom: '30px', fontStyle: 'italic' }}>Blogs</Card.Title>
          {blogs.map(blog =>
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default BlogList