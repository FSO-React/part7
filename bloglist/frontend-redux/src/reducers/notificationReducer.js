import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    cleanNotification() {
      return initialState
    }
  }
})

export const { setNotificationMessage, cleanNotification } = notificationSlice.actions

export const setNotification = (message, duration, type) => {
  return async dispatch => {
    dispatch(setNotificationMessage({ message, type }))
    setTimeout(() => {
      dispatch(cleanNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer