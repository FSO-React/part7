import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore(
  {
    reducer: {
      blogs: blogReducer,
      users: usersReducer,
      login: loginReducer,
      notification: notificationReducer
    }
  }
)

export default store