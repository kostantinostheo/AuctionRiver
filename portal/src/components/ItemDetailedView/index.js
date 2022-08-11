import './index.css'
import Navigate from '../Navigate';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

export default function ItemDetailedView() {
    return (
        <div className='item-detailed'>
          <Navigate/>
          <Container className='main-content-item'>
            <Row>
              <Col md="auto">
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://i.ebayimg.com/images/g/aFcAAOSwUV1ijEWo/s-l500.jpg"
                      width = "300"
                      height = "480"
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://i.ebayimg.com/images/g/-xcAAOSwCwBijEWq/s-l500.jpg"
                      width = "300"
                      height = "480"
                      alt="Second slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col className='item-info' sm={7}>
                <h4 className='item-title'>
                  2020-21 Panini Prizm Shaquille O'Neal Shaq Choice Tiger Stripe Prizm SGC 10
                </h4>
                <Container className='item-main'>
                  <Row className='item-main-row'>
                    <Col className='item-price-col'>
                      <div className='price-title'>
                        Price:
                      </div>
                      <div className='price-tag'>
                        $499.99
                      </div>
                    </Col>
                    <Col>
                      <button class="buy-now-button">Buy It Now</button>
                    </Col>
                  </Row>
                  <Row className='item-main-row'>
                    <Col className='item-price-col'>
                      <div className='best-offer-title'>
                        Best Offer:
                      </div>
                      <div className='best-offer-tag'>
                        $400
                      </div>
                    </Col>
                    <Col>
                      <button class="place-bid-button">Place Bid</button>
                    </Col>
                  </Row>
                  <div className='item-specifics'>
                    <strong><h5 id='item-header'>Item Details</h5></strong>
                    <Container fluid='true'>
                      <Row className='item-specifics-row'>
                        <Col className='item-specifics-col'>
                          <ul className='item-specifics-list'>
                            <li className='specifics-list-object'><strong>Item ID:</strong> 12345</li>
                            <li className='specifics-list-object'><strong>Auction Starts:</strong> </li>
                            <li className='specifics-list-object'><strong>Auction Ends:</strong> </li>
                            <li className='specifics-list-object'><strong>Number of Bids:</strong> 8</li>
                          </ul>
                        </Col>
                        <Col className='item-specifics-col'>
                          <ul className='item-specifics-list'>
                            <li className='specifics-list-object'><strong>Country:</strong> United States</li>
                            <li className='specifics-list-object'><strong>City:</strong> New York</li>
                            <li className='specifics-list-object'><strong>Latitude:</strong> 40.730610</li>
                            <li className='specifics-list-object'><strong>Longitude:</strong> -73.935242</li>
                          </ul>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div className='item-description'>
                    <strong><h5 id='item-header'>Item Description</h5></strong>
                    <div className='description-text'>
                    6 FREE MONTHS INSTANT INK SUBSCRIPTION when you activate HP+ – Print up to 700 pages a month. Ink ships to you automatically so you never run out. After 6 months, monthly fee applies unless cancelled, and you'll save up to 50% on ink.
                    </div>
                  </div>
                </Container>
              </Col>
              <Col className='seller-info'>
                <div className='seller-title'>
                  <strong><u>Seller Information</u></strong>
                </div>
                <div className='seller-main'>
                  <strong>Username:</strong> user <br></br>
                  <strong>Rating:</strong> rating
                </div>
                <div className='seller-contact'>
                  <a href='#'>Contact seller</a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    );
}