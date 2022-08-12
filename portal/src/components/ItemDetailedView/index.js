import './index.css'
import Navigate from '../Navigate';
import Breadcrumb from '../CustomBreadcrumb';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { mockItemInfo } from '../../utils/Mocks';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ItemDetailedView() {

  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  const item = mockItemInfo.find(x => x.itemId === parseFloat(id))

  const [itemData, getData] = useState(item)
  const [images, getImages] = useState(itemData.img)

      useEffect(()=> {
        const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        const item = mockItemInfo.find(x => x.itemId === parseFloat(id))
        getData(item)
        getImages(itemData.img)
    }, [])
    return (
        <div className='item-detailed'>
          <Navigate/>
          <Breadcrumb value="2020-21 Panini Prizm Shaquille O'Neal SGC 10" />
          <Container className='main-content-item'>
            <Row>
              <Col md="auto">
                <Carousel>
                {images.map((imageUrl)=>{
                        return <DynamicCarousel url={imageUrl}/>
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
                      <div><a href='/'>Lalakis123</a></div>
                      <div>4/5</div>
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
                    <Col xs={3}>
                      <h4 className='price-tag'>
                        ${itemData.price}
                      </h4>
                    </Col>
                    <Col xs={3}>
                      <button class="buy-now-button">Buy It Now</button>
                    </Col>
                  </Row>
                  <Row xs={true} className='item-main-row'>
                    <Col xs={2}>
                      <h6 className='best-offer-title'>
                        Current Bid:
                      </h6>
                    </Col>
                    <Col xs={2}>
                      <div className='best-offer-tag'>
                        $400
                      </div>
                    </Col>
                    <Col xs={3}>
                      <Form.Control placeholder='Place your bid' style={{"width": "auto", "marginTop":"22px"}} />
                    </Col>
                    <Col>
                      <button class="place-bid-button">Place Bid</button>
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
                            <li className='specifics-list-object'>12345</li>
                            <li className='specifics-list-object'>13:00PM </li>
                            <li className='specifics-list-object'>15:23AM </li>
                            <li className='specifics-list-object'>8</li>
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
                            <li className='specifics-list-object'>United States</li>
                            <li className='specifics-list-object'>New York</li>
                            <li className='specifics-list-object'>40.730610</li>
                            <li className='specifics-list-object'>-73.935242</li>
                          </ul>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div className='item-description'>
                    <strong><h5 id='item-header'>Item Description</h5></strong>
                    <div className='description-text'>
                    Dark Souls: The Card Game is a cooperative deck evolution card game for 1-4 players.
                    Players must explore the Encounters around them, defeating a myriad of enemies to gain Souls and Treasure. They must use these to evolve and adapt their deck to better fight their enemies.
                    When the players are ready, they must challenge the powerful bosses that lie within.
                    A misstep can be fatal, but the rewards of success are great. Adapt your deck, evolve your strategy, and prepare to die.
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
  return(
    <div>
        <img src={props.url}/>
    </div>
  );
}