import './index.css'
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
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

=======
import { Form, Button, Row, Col, Card} from 'react-bootstrap'
import logo from '../../images/logo_dark.png'
import search from '../../images/search.png'
import { GetItemDetails, GetUserData, ItemIsAvailable, ItemSeller } from '../../utils/Api';
import { decodeToken, getToken, get_rand } from '../../utils/Common';
import Category from '../Category';
import { categoryType } from '../../utils/Const';
import { userType } from '../../utils/Const';
import { BASE_URL, IMAGE_URL, PATCH_ITEM_URL } from '../../utils/Path';
import { Grid } from '@mui/material';
import Footer from '../Footer';

export default function Home() {
  const [username, setUsername] = useState('');
  const [type, setType] = useState('');
  const [categories] = useState(Object.values(categoryType))
  const [lessCategories, setLessCateg] = useState([])
  const [bonus, getBonus] = useState([])
  const [state, setState] = useState(false)
>>>>>>> develop
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


<<<<<<< HEAD
=======
  async function GetRecommentations(){
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    };
    await fetch(BASE_URL + PATCH_ITEM_URL.Bonus + decodeToken().userId, options)
      .then(async res => {
        res.json().then(async data =>{
          //If the bonus returns 10+ items then save them in an array
          let available = []
          for (let i = 0; i < data.length; i++) {
            const isAvailable = await ItemIsAvailable(data[i])
            const isMine = await ItemSeller(data[i], decodeToken().userId)
            if (isAvailable && !isMine) {
              available.push(data[i])
            }
          }
          //console.log(available)
          let _THRESHOLD = 10

          if(data.length >= _THRESHOLD){
            let include = []
            //Display 4 Recommended Items
            for (let i = 0; i < 4; i++){
              let rand = get_rand(available) //Get a random index from 0-9
              include.push(rand)
            }
            getBonus(include)
            setState(true)
          }

        })
    })
  }

>>>>>>> develop
  useEffect(() => {
    const temp = []
    for (let i = 0; i < 4; i++) {
      temp.push(categories[i])
    }
    setLessCateg(temp)
    HandleUser()
<<<<<<< HEAD
=======
    GetRecommentations()
>>>>>>> develop
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
<<<<<<< HEAD
        <Row>
          <h3 id='cat-header'><a style={{"textDecoration": "none", "color" : "#32a89b"}} href='/category'>Categories</a></h3>
        </Row>
=======
        <h4 id='cat-header'><a id='cat-hover' style={{"textDecoration": "none", "color" : "rgb(82, 82, 82)"}} href='/category'>Categories</a></h4>
>>>>>>> develop
        <Row className="justify-content-md-center" id='categories-row'>
            {lessCategories.map((data)=>{ 
              return(
              <Col md="3">
                <Category title={data[0]} image={data[1]}/>
                <br/>
              </Col>
              )
            })}
<<<<<<< HEAD
        </Row>
      </Row>
=======
        </Row>
        { bonus.length >=3 && <>
        <h4 id='cat-header-2'>Just for you</h4>
        <Row className="justify-content-md-center" id='categories-row'>
            {bonus.map((id)=>{
              return <Col style={{"marginBottom" : "2em"}}><ItemComponenet id='recommend-card' itemId={id}/></Col>
            })}
        </Row>
        </>
        }
      </Row>
      <Footer/>
>>>>>>> develop
    </div>
  );
}

function ItemComponenet(props){


  const [item, getItem] = useState()
  const [state, setState] = useState(false)
  const [lastBid, getLastBid] = useState()


  async function GetItemRecommend(){
    GetItemDetails(props.itemId)
      .then(res => {
        getItem(res)
        getLastBid(res.bids.bid[0].amount)
        setState(true)
      })
      .catch(err => { return false})
  }
  useEffect(async () => {            
    GetItemRecommend()
  }, [state]);

  return(
      <Grid item xs={3}>
          <div className='card-item'>
              <Card id='product2'>
              <a href={`/item/${props.itemId}`} style={{"textDecoration": "none"}}>
              { state === true && 
                <img id='product-img' variant="top" src={IMAGE_URL+item.images[0]} alt='product-image'/> 
              }
              </a>
              <Card.Body id='product-body'>
                     { state === true &&
                      <a href={`/item/${props.itemId}`} style={{"textDecoration": "none", color : "black"}}>
                        <Card.Text id='product-title'>{item.name}</Card.Text> 
                      </a>
                     }
                  { state === true &&
                    <Card.Text id='product-sub-text'>{item.category}</Card.Text>
                  }
                  {   state === true &&
                    <Row>
                      {
                       typeof item.buyPrice === "undefined" ? 
                       <><h6 id='product-price'>Buy now:</h6> <h4 id='product-price'>${item.buyPrice}</h4> </>
                       : 
                       <><h6 id='product-price'>Buy now:</h6> <h4 id='product-price'>${item.buyPrice}</h4></>
                      }
                      <h6 id='product-price'>Bid starts at:</h6> <h4 id='product-price'>${lastBid}</h4>
                    </Row>  
                  }
              </Card.Body>
              </Card>
          </div>
      </Grid>
  );

}