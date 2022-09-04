import './index.css'
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col} from 'react-bootstrap'
import logo from '../../images/logo_dark.png'
import search from '../../images/search.png'
import { GetUserData } from '../../utils/Api';
import { decodeToken, getToken } from '../../utils/Common';
import Category from '../Category';
import { categoryType } from '../../utils/Const';
import { userType } from '../../utils/Const';


export default function Home() {
  const [username, setUsername] = useState('');
  const [setType] = useState('');
  const [categories] = useState(Object.values(categoryType))
  const [lessCategories, setLessCateg] = useState([])

  const [searchValue, setSearchValue] = useState('')


  async function HandleUser(){
    if(getToken())
    {
      const token = decodeToken()
      const userData = await GetUserData(token.userId)
      setUsername(userData.username)
      setType(userData.userType)
    }

  }

  async function HandleSearch(e){
    e.preventDefault()
    
    if(searchValue === '')
      window.location.href = '/item'
    else
      window.location.href = '/item/found/search-for=' + searchValue

  }


  useEffect(() => {
    const temp = []
    for (let i = 0; i < 4; i++) {
      temp.push(categories[i])
    }
    setLessCateg(temp)
    HandleUser()
  },[categories]);

  return (
    <div>
      <Row>
        <Col xs={12} md={8}>
          <a href='/' ><img id='home-logo' href='/' src={logo} alt='logo' height={60} width={180}/></a>
        </Col>
        <Col>
          { !getToken() 
            ? <div><a href='/login' className='home-nav-login'> Login/Register </a></div> 
            : <>
            { decodeToken().userType === userType.User ? 
              <div className='home-nav-login' >Welcome <a href='/dashboard' className='home-nav-login-tag'> {username} </a></div>
              :
              <div className='home-nav-login' >Welcome <a href='/admindashboard' className='home-nav-login-tag'> {username} </a></div>
            }</>
          }

        </Col>
      </Row>
        <Form onSubmit={HandleSearch} id='home-search-form' className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
          />
          <Button onClick={HandleSearch} id='home-search-button' variant="light" >
            <img src={search} alt="search-icon" width="15" height="15"/>
          </Button>
        </Form>
      <Row>
        <Row>
          <h3 id='cat-header'><a style={{"textDecoration": "none", "color" : "#32a89b"}} href='/category'>Categories</a></h3>
        </Row>
        <Row className="justify-content-md-center" id='categories-row'>
            {lessCategories.map((data)=>{ 
              return(
              <Col md="3">
                <Category title={data[0]} image={data[1]}/>
                <br/>
              </Col>
              )
            })}
        </Row>
      </Row>
    </div>
  );
}
