import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogsReducer'

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
    <div className='blog'>
      <div style={{ display: 'flex' }}>
        <h1>{blog.title}</h1>
        <button onClick={handleRemoveBlog} style={deleteButtonStyle}> remove </button>
      </div>
      <div>
        <a href={blog.url}> {blog.url} </a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLikeBlog} style={buttonStyle} id='like_blog'> like </button>
      </div>
      <div>
        {blog.author}
      </div>
      <div>
        <h2>comments</h2>
        <form onSubmit={handleAddComment}>
          <div>
            <input type="text" name="comment" id="comment" />
            <button type="submit">add comment</button>
          </div>
        </form>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}>
              {comment}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog