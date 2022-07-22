import React from 'react'
import { Container, Navbar, Nav, Form, Button} from 'react-bootstrap'
import './index.css'



export default function Navigate(){
  
  return(
    <Navbar className='nav-bar' variant="dark">
      <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Form className="search-bar">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search"/>
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav className="me-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Sign-in</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}
