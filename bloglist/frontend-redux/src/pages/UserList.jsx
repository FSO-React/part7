import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Table } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center', fontSize: '50px', marginBottom: '30px', fontStyle: 'italic' }}>Users</Card.Title>
        <Card>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', fontSize: '30px', marginBottom: '30px', fontStyle: 'italic' }}>Blogs created</Card.Title>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user =>
                  <tr key={user.id}>
                    <td>
                      <Link to={`/users/${user.id}`} >{user.username}</Link>
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  )
}

export default UserList