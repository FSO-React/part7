import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    addUserBlog: (state, action) => {
      return state.map((user) => {
        return {
          ...user,
          blogs:
            user.id === action.payload.user.id
              ? user.blogs.concat(action.payload)
              : user.blogs,
        }
      })
    },
    removeUserBlog: (state, action) => {
      return state.map((user) => {
        return {
          ...user,
          blogs: user.blogs.filter((blog) => blog.id !== action.payload),
        }
      })
    },
  }
})

export const { setUsers, addUserBlog, removeUserBlog } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer