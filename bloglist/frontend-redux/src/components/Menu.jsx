import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import storageService from '../services/storage'

import {
  Button,
  Container,
  Navbar,
  Nav
} from 'react-bootstrap'

const Menu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  const mp = {
    margin: 4,
    padding: 4,
  }

  const handleLogout = (event) => {
    event.preventDefault()
    storageService.removeUser()
    dispatch(logOut())
    navigate('/')
  }

  return (
    <>
      {loggedUser &&
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/" onClick={() => navigate('/')}>BlogApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className='justify-content-start'>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '140px' }}
                navbarScroll
              >
                <Nav.Link href="blogs" onClick={() => navigate('/blogs')}>Blogs</Nav.Link>
                <Nav.Link href="users" onClick={() => navigate('/users')}>Users</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
              <Navbar.Text style={mp}>{loggedUser.name}</Navbar.Text>
              <Button style={mp} onClick={handleLogout}>Logout</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      }
    </>
  )
}

export default Menu