import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { setUser } from './userReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload
    }
  }
})

export const { setToken } = loginSlice.actions

export const loginUser = (loginObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login(loginObject)
      if (user) {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch(setUser(user))
        dispatch(setNotification('login successful!', 10))
      }
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
    }
  }
}
export const logoutUser = () => {
  return async dispatch => {
    try {
      dispatch(setUser(null))
      dispatch(setNotification('logout successful!', 10))
    } catch (exception) {
      dispatch(setNotification('error logging out', 5))
    }
  }
}

export default loginSlice.reducer