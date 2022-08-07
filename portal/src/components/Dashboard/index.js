import './index.css'
import React, { useEffect, useState } from "react";
import Navigate from '../Navigate';
import UserInfo from '../UserInfo';
import CardListing from '../CardListing';
import { Col, Container, Row } from 'react-bootstrap';
import { decodeToken } from '../../utils/Common';
import { userType } from '../../utils/Const';


export default function Dashboard() {

  const pageType = {
    Info: "Info",
    Bids: "Bids",
    Auctions: "Auctions"
  }

  useEffect(()=> {
    const token = decodeToken()
    if(token && token.userType === userType.Admin)
        window.location.href = '/'
}, [])

  const [page, setPage] = useState('Info')
  
  return (
    <div className='dashboard'>
      <Navigate/>
        <div className='top-nav-account'>
          <div className='account-header'>
            <h2>Your Account</h2>
          </div>
          <div className='account-messages'>
            <div className='fake-tabs'>
              <ul className='fake-tabs-items'>
                <li className='fake-tabs-first-item'>
                  <a  className='top-bar-link' href='/dashboard'>Account</a>
                </li>
                <li className='fake-tabs-second-item'>
                  <a className='top-bar-link' href='/messages'>Messages</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Container className='account-options'>
          <Row>
            <Col  sm={2} >
              <ul className='account-options-list'>
                <li className='account-options-item'>
                  <button className='button-text' onClick={()=>setPage(pageType.Info)}>Personal Information</button>
                </li>
                <li className='account-options-item'>
                  <button className='button-text' onClick={()=>setPage(pageType.Bids)}>Bids</button>
                </li>
                <li className='account-options-item'>
                  <button className='button-text' onClick={()=>setPage(pageType.Auctions)}>My Auctions</button>
                </li>
              </ul>
            </Col>
            <Col sm={true}>
                { 
                  page === pageType.Info && (<UserInfo/>)
                }
                { 
                  page === pageType.Bids && (<div>Bids</div>) 
                }
                {
                  page === pageType.Auctions && (<CardListing/>) 
                }
            </Col>
          </Row>
        </Container >
      </div>
  );
}