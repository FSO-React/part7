import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

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
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id='title-input'
            data-testid='title-input'
            type="text"
            name="title"
          />
        </div>
        <div>
        author:
          <input
            id='author-input'
            data-testid='author-input'
            type="text"
            name="author"
          />
        </div>
        <div>
        url:
          <input
            id='url-input'
            data-testid='url-input'
            type="text"
            name="url"
          />
        </div>
        <button type="submit" id='save-button' data-testid='save-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm