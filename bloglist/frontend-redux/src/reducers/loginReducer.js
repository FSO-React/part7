import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import storageService from '../services/storage'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    logIn(state, action) {
      return action.payload
    },
    logOut(state, action) {
      return null
    }
  }
})

export const { logIn, logOut } = loginSlice.actions

export const loginUser = (loginObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login(loginObject)
      if (user) {
        storageService.saveUser(user)
        blogService.setToken(user.token)
        dispatch(logIn(user))
        dispatch(setNotification('login successful!', 10, 'success'))
      }
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5, 'error'))
    }
  }
}
export const logoutUser = () => {
  return async dispatch => {
    try {
      storageService.removeUser()
      blogService.setToken(null)
      dispatch(logOut())
      dispatch(setNotification('logout successful!', 10, 'success'))
    } catch (exception) {
      dispatch(setNotification('error logging out', 5, 'error'))
    }
  }
}

export default loginSlice.reducer