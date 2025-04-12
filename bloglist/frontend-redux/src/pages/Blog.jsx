import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogsReducer'
import { Card, Table, Form, Button } from 'react-bootstrap'

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
    margin: 25,
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

  const handleAddComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    const commentObject = {
      id: blog.id,
      comment
    }
    dispatch(commentBlog(commentObject))
    event.target.comment.value = ''
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
    <Card>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center', fontSize: '50px', marginBottom: '30px', fontStyle: 'italic' }}>&quot;{blog.title}&quot;</Card.Title>
        <Card style={{ margin: '30px' }}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', fontSize: '30px', marginBottom: '30px', fontStyle: 'italic' }}>About</Card.Title>
            <Card.Text>
              <strong>URL:</strong> <a href={blog.url}> {blog.url} </a>
            </Card.Text>
            <Card.Text>
              <strong>Likes:</strong> {blog.likes} likes
              <button onClick={handleLikeBlog} style={buttonStyle} id='like_blog'> like </button>
            </Card.Text>
            <Card.Text>
              <strong>Author:</strong> {blog.author}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ margin: '30px' }}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', fontSize: '30px', marginBottom: '30px', fontStyle: 'italic' }}>Comments</Card.Title>
            <Card.Text>
              <Form onSubmit={handleAddComment}>
                <Form.Control type="text" name="comment" id="comment" />
                <div className='d-flex justify-content-end'>
                  <Button type="submit">add comment</Button>
                </div>
              </Form>
            </Card.Text>
            <Card.Text>
              <ul>
                {blog.comments.map(comment =>
                  <li key={comment}>{comment}</li>
                )}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  )
}

export default Blog