import React from 'react'
import { Container, Navbar, Form, Button} from 'react-bootstrap'
import './index.css'
import logo from '../../images/amazon_white_text.png'
import { getToken, logout } from '../../utils/Common';

export default function Navigate(){
  return(
    <div>
      {/* The top navigation starts here. Contains an image for logo. A form for search and a button for toggle search. And there is a button for login (after navbar.collapse in order to go full right) */}
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <a href='/'><img src={logo} width="100" height="30" alt="Amazon"/></a>
          <Navbar.Toggle  aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form id='search-form' className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button id='search-button' variant="light">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/500px-Search_Icon.svg.png" alt="search-icon" width="20" height="20"/>
              </Button>
            </Form>
          </Navbar.Collapse>
          {
            getToken() && ( <Button onClick={logout} className='nav-login' variant="dark"> <b>Logout</b> </Button>)
          }
          {
            !getToken() && ( <Button href='/login' className='nav-login' variant="dark"> <b>Login</b> </Button>)
          }
         
        </Container>
      </Navbar>
      {/* The button nav bar start here. Its component goes one after the other so the bottom bar will be underneath the top one*/}
      <Navbar id='nav-down' expand="lg">
        <Button id='linkings' variant="link">Today's Deals</Button>
        <Button id='linkings' variant="link">Customer Service</Button>
        <Button id='linkings' variant="link">Registry</Button>
        <Button id='linkings' variant="link">Sell</Button>
      </Navbar>
    </div>
  );
}
