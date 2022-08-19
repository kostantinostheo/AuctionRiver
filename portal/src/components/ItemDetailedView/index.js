import './index.css'
import Navigate from '../Navigate';
import Breadcrumb from '../CustomBreadcrumb';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { GetItemDetails, GetUserData, PostAsync } from '../../utils/Api';
import { BASE_URL, IMAGE_URL, POST_ITEM_URL } from '../../utils/Path';
import { decodeToken, getToken } from '../../utils/Common';


export default function ItemDetailedView() {

  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  
  const [itemData, getData] = useState([])
  const [images, getImages] = useState([])
  const [localDateStart, setLocalDateStarts] = useState('')
  const [localDateEnds, setLocalDateEnds] = useState('')
  const [bids, getBidsNum] = useState('')
  const [lastBid, getLastBid] = useState('')
  const [placeBid, setPlaceBid] = useState()

  const [seller, getSeller] = useState([])
  const [user, getUser] = useState([])


  const handleState = () => {
    if(getToken() === null){
      window.location.href='/login'
    }
    else{
      UpdateBid()
    }
  }
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
      PostAsync(BASE_URL+POST_ITEM_URL.NewBid+id, body).then(()=>{
        window.alert("Success")
        window.location.reload()
      })
    }
  }
  async function GetAllDetails(){
    GetItemDetails(id)
      .then((res) => {
        getData(res)
        getImages(res.images)
        if(res.started != null ) {
          setLocalDateStarts(new Date(res.started).toLocaleDateString("en-US") + " " + new Date(res.started).toLocaleTimeString("en-US"))
        }else{
          setLocalDateStarts('-')
        }
        if(res.ends != null ) {
          setLocalDateEnds(new Date(res.ends).toLocaleDateString("en-US") + " " + new Date(res.ends).toLocaleTimeString("en-US"))
        }else{
          setLocalDateEnds('-')
        }
        getBidsNum(res.bids.bid.length - 1)
        getLastBid(res.bids.bid[res.bids.bid.length-1].amount)
        GetSellerDetails(res.sellerId)
        GetUserDetails(decodeToken().userId)
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
      })
    }


    useEffect(()=> {
      GetAllDetails()
    }, [])
    return (
        <div className='item-detailed'>
          <Navigate/>
          <Breadcrumb value="2020-21 Panini Prizm Shaquille O'Neal SGC 10" />
          <Container className='main-content-item'>
            <Row>
              <Col md="auto">
                <Carousel>
                {images.map((image)=>{
                    return <DynamicCarousel url={image}/>
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
                <h4 className='item-title'>
                  {itemData.title}
                </h4>
                <Container className='item-main'>
                  <Row xs={true} className='item-main-row'>
                    <Col xs={2} className='item-price-col'>
                      <h6 className='price-title'>
                        Price:
                      </h6>
                    </Col>
                        { itemData.buyPrice != null &&
                        <Col xs={3}>
                          <h4 className='price-tag'>
                            ${itemData.buyPrice}
                          </h4>
                        </Col>
                        }
                        {itemData.buyPrice === null &&
                          <Col xs={3}>
                            <h4 className='price-tag'>
                              $-
                            </h4>
                        </Col>
                        }
                    <Col xs={3}>
                    {itemData.buyPrice === null &&
                      <Button className="buy-now-button" disabled>Buy It Now</Button>
                    }
                    {itemData.buyPrice != null &&
                      <Button className="buy-now-button">Buy It Now</Button>
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
                    <Col xs={3}>
                      <Form.Control placeholder='Place your bid' value={placeBid} onChange={(e)=>setPlaceBid(e.target.value)} style={{"width": "auto", "marginTop":"22px"}} />
                    </Col>
                    <Col>
                      <Button onClick={handleState} className="place-bid-button">Place Bid</Button>
                    </Col>

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
                            <li className='specifics-list-object'>Latitude:</li>
                            <li className='specifics-list-object'>Longitude:</li>
                          </b>
                          </ul>
                        </Col>
                        <Col className='item-specifics-col'>
                          <ul className='item-specifics-list'>
                            <li className='specifics-list-object'>{itemData.country}</li>
                            <li className='specifics-list-object'>{itemData.location}</li>
                            <li className='specifics-list-object'>{itemData.latitude}</li>
                            <li className='specifics-list-object'>{itemData.longitude}</li>
                          </ul>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div className='item-description'>
                    <strong><h5 id='item-header'>Item Description</h5></strong>
                    <div className='description-text'>
                    {itemData.description}
                    </div>
                  </div>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
    );
}

function DynamicCarousel(props){
  const [image] = useState(IMAGE_URL+props.url)
  return(
    <div>
        <img src={image} alt='product'/>
    </div>
  );
}