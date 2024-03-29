import './index.css'
import React, { useEffect, useState } from "react";
import Navigate from '../Navigate';
import UserInfo from '../UserInfo';
import CardListing from '../CardListing';
import { Col, Container, Row } from 'react-bootstrap';
import { decodeToken } from '../../utils/Common';
import { userType, userStatus} from '../../utils/Const';
import { PurchaseHistory } from '../PurchaseHistory';


export default function Dashboard() {

  const [page, setPage] = useState('Info')
  const [status] = useState(decodeToken().userStatus)
  const pageType = {
    Info: "Info",
    Purchase: "Purchase",
    Auctions: "Auctions"
  }

  useEffect(()=> {
    const token = decodeToken()
    if(token && token.userType === userType.Admin)
        window.location.href = '/'
}, [])

  function goToSellItem(){
    return window.location.href = '/sellitem'
  }



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
                <li >
                  <button className='button-text' onClick={()=>{setPage(pageType.Info)}}>Personal Information</button>
                </li>
                <li >
                  <button className='button-text' onClick={()=>{setPage(pageType.Auctions)}}>Selling</button>
                </li>
                <li>
                  <button className='button-text' onClick={()=>{setPage(pageType.Purchase)}}>Purchase History</button>
                </li>
                <li id='underline'/>
                <br/>
                <li >
                  { status === userStatus.Accept &&
                    <button className='button-text-create' onClick={()=>goToSellItem()}>Create New Auction</button>
                  }
                </li>
              </ul>
            </Col>
            <Col sm={true}>
                { 
                  page === pageType.Info && (<UserInfo/>)
                }
                {
                  page === pageType.Auctions && (<CardListing/>) 
                }
                {
                  page === pageType.Purchase && (<PurchaseHistory/>)
                }
            </Col>
          </Row>
        </Container >
      </div>
  );
}