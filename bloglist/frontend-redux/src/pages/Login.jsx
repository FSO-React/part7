import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Row,
  InputGroup,
  FormControl,
  FloatingLabel,
  Container,
  Card
} from 'react-bootstrap'

const Login = () => {
  const [validated, setValidated] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const loginObject = {
      username: username,
      password: password,
    }
    dispatch(loginUser(loginObject))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <Card className="justify-content-center align-content-center h-100 m-auto mt-5 mb-5" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', fontSize: '50px', marginBottom: '30px', fontStyle: 'italic' }}>BlogApp</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleLogin}>
            <InputGroup style={{ width: '50%', margin: 'auto', marginBottom: '10px' }}>
              <InputGroup.Text className='col' id="inputGroup-username">Username</InputGroup.Text>
              <Form.Control
                className='col'
                required
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </InputGroup>
            <InputGroup style={{ width: '50%', margin: 'auto', marginBottom: '10px' }}>
              <InputGroup.Text className='col' id="inputGroup-password">Password</InputGroup.Text>
              <Form.Control
                className='col'
                required
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </InputGroup>
            <div className="d-flex justify-content-center m-2 p-2">
              <Button type="submit">Login</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Login