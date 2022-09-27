import './index.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Navigate from '../Navigate';
import Breadcrumb from '../CustomBreadcrumb';
<<<<<<< HEAD
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { GetItemDetails, GetUserData, PatchAsync, PostAsync } from '../../utils/Api';
import { BASE_URL, IMAGE_URL, PATCH_USER_URL, POST_ITEM_URL } from '../../utils/Path';
import { decodeToken, getToken } from '../../utils/Common';
import { userStatus } from '../../utils/Const';
import heart from '../../images/heart.png';
import heart_fill from '../../images/heart_fill.png';

=======
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { GetItemDetails, GetUserData, ItemIsAvailable, ItemSeller, PatchAsync, PostAsync } from '../../utils/Api';
import { BASE_URL, IMAGE_URL, PATCH_ITEM_URL, PATCH_USER_URL, POST_ITEM_URL } from '../../utils/Path';
import { decodeToken, getToken, get_rand } from '../../utils/Common';
import { userStatus } from '../../utils/Const';
import heart from '../../images/heart.png';
import heart_fill from '../../images/heart_fill.png';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
>>>>>>> develop


export default function ItemDetailedView() {

  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  
  const [itemData, getData] = useState([])
  const [images, getImages] = useState([])
  const [localDateStart, setLocalDateStarts] = useState('')
  const [localDateEnds, setLocalDateEnds] = useState('')
  const [bids, getBidsNum] = useState('')
  const [lastBid, getLastBid] = useState('')
  const [placeBid, setPlaceBid] = useState()
  const [lon, setLon] = useState()
  const [lat, setLat] = useState()
  const [seller, getSeller] = useState([])
  const [user, getUser] = useState([])
  const [savedItem, setSaved] = useState(false)
<<<<<<< HEAD
=======
  const [bonus, getBonus] = useState([])
  const [state, setState] = useState(false)

>>>>>>> develop

  
  var submitBid= () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>Do you want to place a bid of {placeBid}$?</p>
            <Button id='cancel-btn'onClick={onClose}>No</Button>
            &emsp;
            <Button id='confirm-btn'
              onClick={() => {
                handleState()
                this.handleClickDelete();
                onClose();
              }}
            >
              Yes
            </Button>
          </div>
        );
      }
    });
  };
  var submitBuy = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>Do you want to buy this item?</p>
            <Button id='cancel-btn'onClick={onClose}>No</Button>
            &emsp;
            <Button id='confirm-btn'
              onClick={() => {
<<<<<<< HEAD
=======
                handleBuyState();
>>>>>>> develop
                this.handleClickDelete();
                onClose();
              }}
            >
              Yes, Buy it!
            </Button>
          </div>
        );
      }
    });
  };
  var popUp = (title, message) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h5>{title}</h5>
            <p>{message}</p>
            <Button id='cancel-btn' onClick={() => {onClose(); window.location.reload()}}>Ok</Button>
          </div>
        );
      }
    });
  };

  const handleState = () => {
    if(getToken() === null){
      window.location.href='/login'
    }
    else{
      UpdateBid()
    }
  }
<<<<<<< HEAD
  const handleBuyState = () => {
    if(getToken() === null){
      window.location.href='/login'
    }
    else{
      //remove it from sale
    }
  }
=======
 
>>>>>>> develop
  async function UpdateBid(){
    if(placeBid > lastBid){
      const body = {
        bid : {
          userId: user.userId, 
          rating: user.rating, 
          time: new Date(),
          amount: placeBid, 
          bidder: {
              location: user.address, 
              country: user.country
          }  
        }
      }
      PostAsync(BASE_URL+POST_ITEM_URL.NewBid+id, body)
      .then(()=>{ 
        popUp("Success", "Your bid of " + placeBid + "$ was succefully added.").onClose(window.location.reload())
      })
    }
    else if (placeBid === null){
      popUp("Error", "No bid was given.")
    }
    else{
      popUp("Error", "The bid you gave is lower than current bid.")
    }
  }
<<<<<<< HEAD
=======
  const handleBuyState = () => {
    if(getToken() === null){
      window.location.href='/login'
    }
    else{
      UpdatePurchase()
    }
  }
  async function UpdatePurchase(){
    const item_id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const itemid_body = {
      itemId: item_id
    }
    const userid_body = {
      buyerId: decodeToken().userId
    }
    const id_user = decodeToken().userId

    PatchAsync(BASE_URL+PATCH_ITEM_URL.BuyUpdateItem + item_id, userid_body)
    .then((res) => {
      if(res.status === 204){
        PatchAsync(BASE_URL+PATCH_USER_URL.BuyUpdateItem + id_user, itemid_body)
        .then( ()=> window.location.href='/item')
      }
    })
  }
>>>>>>> develop
  async function GetAllDetails(){
  GetItemDetails(id)
    .then((res) => {
      getData(res)
      getImages(res.images)
      setLon(res.longitude)
      setLat(res.latitude)
      setLocalDateStarts(new Date(res.started).toLocaleDateString("el-GR") + " " + new Date(res.started).toLocaleTimeString("el-GR"))
      setLocalDateEnds(new Date(res.ends).toLocaleDateString("el-GR") + " " + new Date(res.ends).toLocaleTimeString("el-GR"))
      getBidsNum(res.bids.bid.length - 1)
      getLastBid(res.bids.bid[res.bids.bid.length-1].amount)
      GetSellerDetails(res.sellerId)
      GetUserDetails(decodeToken().userId)
      MonitorItem(res.itemId)
    })
  }
  async function GetSellerDetails(id){
    GetUserData(parseInt(id))
    .then((res) => {
      getSeller(res)
    })
  }
  async function GetUserDetails(id){
    GetUserData(parseInt(id))
    .then((res) => {
      getUser(res)
      const itemId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      if (res.saved.includes(parseInt(itemId))) {
        setSaved(true)
      }
      else{
        setSaved(false)
      }
    })
  }
  async function MonitorItem(id){
    const body = {
      itemId: id
    }
    await PatchAsync(BASE_URL + PATCH_USER_URL.MonitorItem + decodeToken().userId, body)
  }

  async function LikeItem(id){
    const body = {
      itemId: itemData.itemId
    }
    if(!savedItem){
      await PatchAsync(BASE_URL + PATCH_USER_URL.LikeItem + decodeToken().userId, body)
      .then(window.location.reload())
    }
    else{
      await PatchAsync(BASE_URL + PATCH_USER_URL.UnlikeItem + decodeToken().userId, body)
      .then(window.location.reload())
    }
  }
<<<<<<< HEAD

    useEffect(()=> {
      GetAllDetails()
      console.log(user.saved)
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
            for (let i = 0; i < 3; i++){
              let rand = get_rand(available) //Get a random index from 0-9
              include.push(rand)
            }
            getBonus(include)
            setState(true)
          }

        })
    })
  }


    useEffect(()=> {
      GetAllDetails()
      GetRecommentations()
>>>>>>> develop
    }, [])
    return (
        <div className='item-detailed'>
          <Navigate/>
          <Breadcrumb value={itemData.name} pathValues={["Item"]} />
          <Container className='main-content-item'>
            <Row>
              <Col md="auto">
                <Carousel>
                {images.map((image)=>{
<<<<<<< HEAD
                    return <DynamicCarousel url={image}/>
=======
                    return <DynamicCarousel isAvailable={itemData.isAvailable} url={image}/>
>>>>>>> develop
                })}
                </Carousel>
                <br/>
                <Col className='seller-info'>
                  <h5 id='seller-title'><b>Seller Information</b></h5>
                  <Row className='seller-main'>
                    <Col xs={4}>
                      <b>
                      <div>Username:</div>
                      <div>Rating:</div>
                      </b>
                    </Col>
                    <Col xs={true}>
                      <div>{seller.username}</div>
                      <div>{seller.rating}⭐ </div>
                    </Col>
                  </Row>
                  <div id='seller-contact' ><a href='/'>Contact seller</a> </div>
                </Col>
              </Col>
              <Col className='item-info' sm={7}>
                <Row xs>
                  <Col xs={6}>
                    <h4 className='item-title'>
                      {itemData.name}
                    </h4>
                  </Col>
                  <Col xs={1}>
                    <Button onClick={LikeItem} className='like-btn'>
                      {savedItem ? <img src={heart_fill} height={22} width={24}/> :<img src={heart} height={22} width={24}/>}
                    </Button>
                  </Col>
                </Row>

                <Container className='item-main'>
                  <Row xs={true} className='item-main-row'>
                    <Col xs={2} className='item-price-col'>
                      <h6 className='price-title'>
                        Price:
                      </h6>
                    </Col>
<<<<<<< HEAD
                        { itemData.buyPrice != null &&
=======
                        { itemData.buyPrice != null ?
>>>>>>> develop
                        <Col xs={3}>
                          <h4 className='price-tag'>
                            ${itemData.buyPrice}
                          </h4>
                        </Col>
<<<<<<< HEAD
                        }
                        {itemData.buyPrice === null &&
                          <Col xs={3}>
                            <h4 className='price-tag'>
                              $-
                            </h4>
                        </Col>
                        }
                    <Col xs={3}>
                    { itemData.buyPrice === null || new Date() < new Date(itemData.started) || user.userStatus !== userStatus.Accept
=======
                        :
                        <Col xs={3}>
                          <h4 className='price-tag'>
                            $-
                          </h4>
                        </Col>
                        }
                    <Col xs={3}>
                    { typeof itemData.buyPrice === 'undefined' || itemData.isAvailable === false || new Date() < new Date(itemData.started) || user.userStatus !== userStatus.Accept || decodeToken().userId === itemData.sellerId 
>>>>>>> develop
                      ? <Button className="buy-now-button" disabled>Buy It Now</Button> : <Button onClick={submitBuy} className="buy-now-button">Buy It Now</Button>
                    }
                    </Col>
                  </Row>
                  <Row xs={true} className='item-main-row'>
                    <Col xs={2}>
                      <h6 className='best-offer-title'>
                        Current Bid:
                      </h6>
                    </Col>
                    <Col xs={2}>
                      { bids === 0 && 
                        (
                        <div className='best-offer-tag'>
                          ${itemData.firstBid}
                        </div>
                        )
                      }
                      { bids > 0 && 
                        (
                        <div className='best-offer-tag'>
                          ${lastBid}
                        </div>
                        )
                      }
                    </Col>
<<<<<<< HEAD
                    { itemData.buyPrice === null || new Date() < new Date(itemData.started) || user.userStatus !== userStatus.Accept
=======
                    { new Date() < new Date(itemData.started) || user.userStatus !== userStatus.Accept || decodeToken().userId === itemData.sellerId  || itemData.isAvailable === false
>>>>>>> develop
                      ? 
                      <Row>
                        <Col xs={5}>
                          <Form.Control disabled placeholder='Place your bid' style={{"width": "auto", "marginTop":"22px", "marginLeft": "1em"}} />
                        </Col>
                        <Col  xs={5}>
                          <Button disabled className="place-bid-button">Place Bid</Button>
                        </Col>
                      </Row>
                    :
                    <Row>
                      <Col xs={5}>
                        <Form.Control placeholder='Place your bid' value={placeBid} onChange={(e)=>setPlaceBid(e.target.value)} style={{"width": "auto", "marginTop":"22px", "marginLeft": "1em"}} />
                      </Col>
                      <Col xs={5}>
                        <Button onClick={submitBid} className="place-bid-button">Place Bid</Button>
                      </Col>
                    </Row> 

                    }

                  </Row>
                  <div className='item-specifics'>
                    <strong><h5 id='item-header'>Item Details</h5></strong>
                    <Container fluid='true'>
                      <Row className='item-specifics-row'>
                        <Col xs={true}  className='item-specifics-col'>
                          <ul className='item-specifics-list'>
                          <b>
                            <li className='specifics-list-object'>Item ID:</li>
                            <li className='specifics-list-object'>Auction Starts:</li>
                            <li className='specifics-list-object'>Auction Ends:</li>
                            <li className='specifics-list-object'>Bids:</li>
                          </b>
                          </ul>
                        </Col>
                        <Col xs={true}className='item-specifics-col'>
                          <ul className='item-specifics-list'>
                            <li className='specifics-list-object'>{itemData.itemId}</li>
                            <li className='specifics-list-object'>{localDateStart.toString()} </li>
                            <li className='specifics-list-object'>{localDateEnds.toString()}</li>
                            <li className='specifics-list-object'>{bids}</li>
                          </ul>
                        </Col>
                        <Col xs={true}className='item-specifics-col'>
                          <ul className='item-specifics-list'>
                          <b>
                            <li className='specifics-list-object'>Country:</li>
                            <li className='specifics-list-object'>City:</li>
                          </b>
                          </ul>
                        </Col>
                        <Col className='item-specifics-col'>
                          <ul className='item-specifics-list'>
                            <li className='specifics-list-object'>{itemData.country}</li>
                            <li className='specifics-list-object'>{itemData.location}</li>
                          </ul>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <Col className='item-description'>
                    <strong><h5 id='item-header'>Item Description</h5></strong>
                    <div className='description-text'>
                    {itemData.description}
                    </div>
                  </Col>
                </Container>
              </Col>
            </Row>
            <iframe width="50%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style={{"border": "1px solid black", "marginLeft": "10em"}}
             src={"https://www.openstreetmap.org/export/embed.html?bbox="+lon+"%2C"+lat+"%2C"+"&layer=mapnik&marker="+(lon+0.153)+"%2C"+(lat+0.213)}>
            </iframe>
            <br/>
            <br/>
          </Container>
<<<<<<< HEAD
=======
          { bonus.length >=3 && <>
            <h4 style={{"textAlign": "left", "marginLeft" : "13em"}}>Similar items</h4>
            <br/>
            <Row style={{"width" : "60%", "margin": "auto", "marginBottom" : "10em"}}> 
            {bonus.map((id)=>{
              return <Col style={{"marginBottom" : "2em"}}><ItemComponenet id='recommend-card' itemId={id}/></Col>
            })}
            </Row>
            </>
          }
          <Footer/>
>>>>>>> develop
        </div>
    );
}

function DynamicCarousel(props){
  const [image] = useState(IMAGE_URL+props.url)
  return(
    <div>
<<<<<<< HEAD
        <img src={image} alt='product'/>
    </div>
  );
=======
        {props.isAvailable ? <img src={image} alt='product'/> : <img style={{"opacity": "60%"}} src={image} alt='product'/>}
    </div>
  );
}

function ItemComponenet(props){

  //const [image] = useState(IMAGE_URL+props.images[0])
  let navigate = useNavigate();
  const [item, getItem] = useState()
  const [state, setState] = useState(false)
  const [lastBid, getLastBid] = useState()

  const routeChange = () =>{ 
      let path = `/item/${props.itemId}`; // fix that change path
      navigate(path);
  }
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
    //console.log(item)
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

>>>>>>> develop
}