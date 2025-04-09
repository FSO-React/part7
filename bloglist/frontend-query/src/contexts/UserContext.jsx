import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'RESET':
    return null
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  console.log('UserContext value:', user)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userContext = useContext(UserContext)
  return userContext[0]
}

export const useUserDispatch = () => {
  const userContext = useContext(UserContext)
  return userContext[1]
}

export default UserContext