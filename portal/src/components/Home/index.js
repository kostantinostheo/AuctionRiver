import './index.css'
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col} from 'react-bootstrap'
import logo from '../../images/logo_dark.png'
import search from '../../images/search.png'
import { GetUserData } from '../../utils/Api';
import { decodeToken, getToken } from '../../utils/Common';
import Category from '../Category';
import { mockCategory } from '../../utils/Mocks';

export default function Home() {
  const [username, setUsername] = useState('');
  const [setType] = useState('');
  const [categories, setCategories] = useState([])

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
    console.log(categories)
    setCategories(mockCategory)
    HandleUser()
  },[categories]);

  return (
    <div>
      <Row>
        <Col xs={12} md={8}>
          <a href='/' ><img id='home-logo' href='/' src={logo} alt='logo' height={60} width={180}/></a>
        </Col>
        <Col>
          { 
            !getToken() && (<div><a href='/login' className='home-nav-login'> Login/Register </a></div>)
          }
          {
            getToken() && (<div className='home-nav-login' >Welcome <a href='/dashboard' className='home-nav-login-tag'> {username} </a></div>)
          }
        </Col>
      </Row>
        <Form id='home-search-form' className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button id='home-search-button' variant="light">
            <img src={search} alt="search-icon" width="15" height="15"/>
          </Button>
        </Form>
      <Row>
      <h3 id='cat-header'>Categories</h3>
        <Row className="justify-content-md-center" id='categories-row'>
            {categories.map((data)=>{ 
              return(
              <Col md="auto">
                <Category title={data.title} image={data.image}/>
              </Col>
              )
            })}
        </Row>
      </Row>
    </div>
  );
}
