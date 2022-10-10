import React, { useEffect, useState } from 'react'
import { Container, Navbar, Form, Button} from 'react-bootstrap'
import './index.css'
import logo from '../../images/logo_dark.png'
import search from '../../images/search.png'

import { decodeToken, getToken } from '../../utils/Common';
import SplitButton from '../SplitButton';
import { GetUserData } from '../../utils/Api';

export default function Navigate(){

  const [username, setUsername] = useState('');
  const [usertype, setType] = useState('');
  const [searchValue, setSearchValue] = useState('')

  async function HandleSearch(e){
      e.preventDefault()
      
      if(searchValue === '')
        window.location.href = '/item'
      else
        window.location.href = '/item/found/search-for=' + searchValue
  
    }
  async function HandleUser(){
    if(getToken())
    {
      const token = decodeToken()
      const userData = await GetUserData(token.userId)
      setUsername(userData.username)
      setType(userData.userType)
    }

  }

  useEffect(() => {
      HandleUser()
  },[]);

  return(
    <div className='custom-nav-bar'>
      {/* The top navigation starts here. Contains an image for logo. A form for search and a button for toggle search. And there is a button for login (after navbar.collapse in order to go full right) */}
      <Navbar id='custom-nav' expand="lg">
        <Container fluid>
          <a href='/'><img id='nav-logo' src={logo} width="135" height="45" alt="Amazon"/></a>
          <Navbar.Toggle  aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form onSubmit={HandleSearch} id='search-form' className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>setSearchValue(e.target.value)}
              />
              <Button onClick={HandleSearch} id='search-button' variant="light">
                <img src={search} alt="search-icon" width="15" height="15"/>
              </Button>
            </Form>
          </Navbar.Collapse>
          {
            getToken() && ( <SplitButton username={username} userType={usertype} />)
          }
          {
            !getToken() && ( <div><a href='/login' className='home-nav-login-2'> Login/Register </a></div>)
          }
         
        </Container>
      </Navbar>
    </div>
  );
}
