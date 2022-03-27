import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { HouseFill } from 'react-bootstrap-icons'
import './index.css'



export default function Navigate(){
  
  return(
    <Navbar className='nav-bar-color' variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/"><HouseFill color='white'/></Nav.Link>
          <Nav.Link className='rounded'  href="/register">Register</Nav.Link>
          <Nav.Link className='rounded' href="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
