import './index.css'
import React, { useState } from "react";
import Navigate from '../Navigate';
import Login from '../Login'
export default function Home() {

  const pageType = {
    Info: "Info",
    Bids: "Bids",
    Auctions: "Auctions"
  }

  const [page, setPage] = useState('Info')
  
  return (
    <div className='dashboard'>
      <Navigate/>
      <div className='main-content'>
        <div className='top-nav-account'>
          <div className='account-header'>
            <h2>Your Account</h2>
          </div>
          <div className='account-messages'>
            <div className='fake-tabs'>
              <ul className='fake-tabs-items'>
                <li className='fake-tabs-first-item'>
                  <a  className='top-bar-link' href='#'>Account</a>
                </li>
                <li className='fake-tabs-second-item'>
                  <a className='top-bar-link' href='#'>Messages</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='bottom-nav-account'>
          <div className='account-options'>
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
          </div>
        </div>
      </div>
      { 
        page === pageType.Info && (<div>Info</div>)
      }
      { 
        page === pageType.Bids && (<div>Bids</div>) 
      }
      {
        page === pageType.Auctions && (<div>Auctions</div>) 
      }
      </div>
  );
}