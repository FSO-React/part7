import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const User = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)

  if (!users || users.length === 0) {
    return <div>Loading...</div>
  }

  const user = users.find((user) => user.id === id)

  if (!user) {
    return <div><h2>User not found</h2></div>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User