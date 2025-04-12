import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import {
  Button,
  Form,
  Card,
} from 'react-bootstrap'
import { useState } from 'react'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(true)

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    dispatch(createBlog(blogObject))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <Form noValidate onSubmit={addBlog} validated={validated}>
      <Form.Group className="mb-3" controlId="formTitle">
        {/* <Form.Label>Title</Form.Label> */}
        <Form.Control
          required
          type="text"
          placeholder="Title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUrl">
        {/* <Form.Label>Url</Form.Label> */}
        <Form.Control
          required
          type="url"
          placeholder="Url" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAuthor">
        {/* <Form.Label>Author</Form.Label> */}
        <Form.Control
          required
          type="text"
          placeholder="Author" />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Add
        </Button>
      </div>
    </Form>
  )
}

export default BlogForm