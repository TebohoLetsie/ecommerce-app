import React from 'react'
import { Route } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Container,Navbar,Nav,NavDropdown} from 'react-bootstrap'
import SearchBox from './SearchBox'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userAction'



const Header = () =>{

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        dispatch(logout(dispatch))
    }
    return(
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <Navbar.Brand href="#">Spaza</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
               <Route render={({history})=><SearchBox history={history} />} />
              <Nav className="ml-auto">
                  <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                  {userInfo ? (<NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  
                     
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                     </NavDropdown>):<LinkContainer to='/login'><Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link></LinkContainer> }

                {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='admin'id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  
                     
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                )}    
              </Nav>

              </Navbar.Collapse>
              </Container>
            </Navbar>
        </header>
    )
}

export default Header;