import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

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
    <Card>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center', fontSize: '50px', marginBottom: '30px', fontStyle: 'italic' }}>{user.name}</Card.Title>
        <Card>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', fontSize: '30px', marginBottom: '30px', fontStyle: 'italic' }}>Added blogs</Card.Title>
            <ul>
              {user.blogs.map(blog =>
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
                </li>
              )}
            </ul>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
    // <div>
    //   <h1>{user.name}</h1>
    //   <h2>added blogs</h2>
    //   <ul>
    //     {user.blogs.map(blog =>
    //       <li key={blog.id}>
    //         <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
    //       </li>
    //     )}
    //   </ul>
    // </div>
  )
}

export default User