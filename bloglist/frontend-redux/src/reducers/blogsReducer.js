import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      console.log(updateBlog)
      return state.map(b => (b.id !== updatedBlog.id ? b : updatedBlog))
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
    dispatch(setNotification(`blog "${newBlog.title}" (by ${newBlog.author}) created successfully!`, 5, 'success'))
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject)
    dispatch(updateBlog(updatedBlog))
    dispatch(setNotification(`blog "${updatedBlog.title}" (by ${updatedBlog.author}) liked successfully!`, 5, 'success'))
  }
}

export const commentBlog = (commentObject) => {
  return async dispatch => {
    const commentedBlog = await blogService.comment(commentObject.id, commentObject.comment)
    dispatch(updateBlog(commentedBlog))
    dispatch(setNotification(`comment "${commentObject.comment}" added successfully!`, 5, 'success'))
  }
}

export const deleteBlog = (blogObject) => {
  return async dispatch => {
    await blogService.remove(blogObject.id)
    dispatch(removeBlog(blogObject.id))
    dispatch(setNotification(`blog "${blogObject.title}" (by ${blogObject.author}) removed successfully!`, 5, 'success'))
  }
}

export default blogSlice.reducer