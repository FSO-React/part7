import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import { use } from 'react'

const store = configureStore(
  {
    reducer: {
      blogs: blogReducer,
      user: userReducer,
      login: loginReducer,
      notification: notificationReducer
    }
  }
)

export default store