import './index.css'
import Navigate from '../Navigate';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { decodeToken, tryGetToken } from '../../utils/Common';
import { userType } from '../../utils/Const';
import { Button } from 'react-bootstrap';

export default function CreateAuction() {

    const { Uploader } = require("uploader");
    const [value1, onChange1] = useState(new Date());
    const [value2, onChange2] = useState(new Date());
    const [images, getImages] = useState([])
    
    const uploader = new Uploader({
    apiKey: "free"
    });

    const minDate = new Date()
    const maxDate = new Date(minDate)
    maxDate.setDate(maxDate.getDate() + 15)

    function handleUpload(){
      console.log()
    }
    console.log(new Date(value1).toLocaleDateString())

    useEffect(()=> {
      if(!tryGetToken()){
        window.location.href = '/'
      }
      const token = decodeToken()
      if(token.userType === userType.Admin)
          window.location.href = '/'
  }, [])

    return (
      <div className='create-auction'>
        <Navigate/>
        <div className='main-content-auction'>
          <h3 id='auction-header'>Create your auction</h3>
          <div className='auction-details'>
            <h4>Auction details</h4>
            <div className='auction-row-first'>
              <h6 id='auction-row-title'><strong>*</strong>Item Name</h6>
              <div className='name-input-div'>
                <input id='name-input' type="text" maxLength="90"></input>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Categories</h6>
              <div className='name-input-div'>
                <div className='categories-div'>
                  <select className='categories-dropdown'>
                    <option value>-</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Photos</h6>
              <div className='name-input-div'>
                <Button className='photo-button'
                        data-upload-complete='alert(
                          `Files uploaded:\n${event.files.map(x => x.fileId).join("\n")}`
                        )'
                        data-upload-config='{
                          "multi": true,
                          "mimeTypes": ["image/jpeg", "image/png", "image/webp"],
                          "editor": {
                            "images": {
                              "crop": false
                            }
                          }
                        }'>
                  Add Photos
                </Button>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Item Description</h6>
              <div className='name-input-div'>
                <textarea id='description-text' maxLength="200"></textarea>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'>Buy Now Price</h6>
              <div className='name-input-div'>
                <input id='buynow-input' type="text" maxLength="90"></input>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Minimum Bid</h6>
              <div className='name-input-div'>
                <input id='buynow-input' type="text" maxLength="90"></input>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Country</h6>
              <div className='name-input-div'>
                <input id='buynow-input' type="text" maxLength="90"></input>
              </div>
            </div>
            <div className='auction-row-location'>
              <h6 id='auction-row-title'>Location</h6>
              <div className='name-input-div'>
                <div className='location-div-first'>
                  <h6><strong>*</strong>City</h6>
                  <input id='location-input' type="text" maxLength="90"></input>
                </div>
                <div className='location-div'>
                  <h6>Latitude</h6>
                  <input id='location-input' type="text" maxLength="90"></input>
                </div>
                <div className='location-div'>
                  <h6>Longitude</h6>
                  <input id='location-input' type="text" maxLength="90"></input>
                </div>
              </div>
            </div>
            <div className='auction-row-auction-starts'>
              <h6 id='auction-row-title'><strong>*</strong>Auction Starts</h6>
              <div className='name-input-div'>
                <DateTimePicker format="dd/MM/y h:mm a" clearIcon={null} disableClock="true" minDate={minDate}
                                maxDate={maxDate} onChange={onChange1} value={value1} />
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Auction Ends</h6>
              <div className='name-input-div'>
                <DateTimePicker format="dd/MM/y h:mm a" clearIcon={null} disableClock="true" minDate={minDate}
                                maxDate={maxDate} onChange={onChange2} value={value2} />
              </div>
            </div>
            <div className='auction-row-final'>
              <button className="create-button">Create Auction</button>
            </div>
          </div>
        </div>
      </div>
    )
}