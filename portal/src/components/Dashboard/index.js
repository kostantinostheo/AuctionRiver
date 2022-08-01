import './index.css'
import React from "react";
import Navigate from '../Navigate';

export default function Home() {
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
                  <a href='#'>Account</a>
                </li>
                <li className='fake-tabs-second-item'>
                  <a href='#'>Messages</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='bottom-nav-account'>
          <div className='account-options'>
            <ul className='account-options-list'>
              <li className='account-options-first-item'>
                <a href='#'>Personal Information</a>
              </li>
              <li className='account-options-second-item'>
                <a href='#'>Bids</a>
              </li>
              <li className='account-options-third-item'>
                <a href='#'>My Auctions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}