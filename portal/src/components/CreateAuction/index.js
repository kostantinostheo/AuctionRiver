import './index.css'
import Navigate from '../Navigate';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import ImageUploading from 'react-images-uploading';
import { decodeToken, getToken, tryGetToken } from '../../utils/Common';
import { categoryType, userType } from '../../utils/Const';
import { Col, Row } from 'react-bootstrap';
import Edit from '../../images/edit.png'
import Delete from '../../images/delete.png'
import { PostAsync } from '../../utils/Api';
import { BASE_URL, POST_ITEM_URL } from '../../utils/Path';

export default function CreateAuction() {

    const [images, setImages] = useState([])
    const [categories, setCategories] = useState(Object.keys(categoryType))

    const [value1, onChange1] = useState(new Date()); // Auction start date
    const [value2, onChange2] = useState(new Date()); // Auction end date
    const [imagesNames, setImagesNames] = useState([]) // Images Array of values
    const [selected, setSelected] = useState(); // Category value
    const [name, setName] = useState(); 
    const [description, setDescription] = useState(); 
    const [buyPrice, setBuyPrice] = useState();
    const [minBid, setMinBid] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();



    

    const handleChange = event => {
      console.log(event.target.value);
      setSelected(event.target.value);
    };


    async function onSubmit (e){
      e.preventDefault()
      const body = {
        name: name,
        description: description,
        category: selected,
        buyPrice: buyPrice,
        firstBid: minBid,
        started: value1,
        ends: value2,
        images: imagesNames,
        sellerId: decodeToken().userId,
        location: city,
        country: country,
      }

      const res = await PostAsync(BASE_URL + POST_ITEM_URL.Submit, body)

      if(res.status === 201){
        window.location.href = '/item'
      }

    }
    const maxNumber = 69;
    const minDate = new Date()
    const maxDate = new Date(minDate)
    maxDate.setDate(maxDate.getDate() + 15)

    //console.log(typeof new Date(value1))
    //console.log(typeof value1)

    const onChange = (imageList, addUpdateIndex) => {
      const imageArray = []     
      imageList.map((data)=>{
        imageArray.push(data.file.name)
      })
      setImages(imageList);
      setImagesNames(imageArray)
    }

    useEffect(()=> {
      setCategories(Object.keys(categoryType))
      
      if(getToken()===null){
        window.location.href = '/'
      }
      const token = decodeToken()
      if(token.userType === userType.Admin)
          window.location.href = '/'
  }, [])

    return (
      <div className='create-auction'>
        <Navigate/>
        <form className='main-content-auction' onSubmit={onSubmit}>
          <h3 id='auction-header'><b>Create your auction</b></h3>
          <div className='auction-details'>
            <h5><b>Auction details</b></h5>
            <div className='auction-row-first'>
              <h6 id='auction-row-title'><strong>*</strong>Item Title</h6>
              <div className='name-input-div'>
                <input placeholder='Title here' id='name-input' type="text" maxLength="90" value={name} onChange={(e)=>setName(e.target.value)} required></input>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Category</h6>
              <div className='name-input-div'>
                <div className='categories-div'>
                  <select value={selected} onChange={handleChange} className='categories-dropdown'>
                    <option value={false}>Select a category</option>
                    {
                      categories.map((category) => {
                        return(<option id='cat-type' value={category}>{category}</option>) 
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Photos</h6>
              <div className='name-input-div'>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <button
                      style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                      className='drop-images'
                    >
                      Click or Drop here
                    </button>
                    &nbsp;
                    <button onClick={onImageRemoveAll} className='drop-images'>Remove all images</button>
                    <Row>
                    {imageList.map((image, index) => (
                      <Col key={index} className="image-item">
                        <img src={image.data_url} alt="" width={70} height={70} style={{"objectFit": "contain"}}/>
                        <div className="image-item__btn-wrapper">
                          <button className='update-image' onClick={() => onImageUpdate(index)} ><img src={Edit} id='icon-show'/></button>
                          <button className='del-image' onClick={() => onImageRemove(index)}><img src={Delete} id='icon-show'/></button>
                        </div>
                      </Col>
                    ))}
                    </Row>
                  </div>
                )}
              </ImageUploading>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Item Description</h6>
              <div className='name-input-div'>
                <textarea id='description-text' maxLength="200" value={description} onChange={(e)=>setDescription(e.target.value)} required/>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'>Buy Now Price</h6>
              <div className='name-input-div'>
                <input placeholder='Buy now price' id='buynow-input' type="number" maxLength="90" value={buyPrice} onChange={(e)=>setBuyPrice(e.target.value)}/>
                &emsp;<b>$</b>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Minimum Bid</h6>
              <div className='name-input-div'>
                <input placeholder='Bid to start' id='buynow-input' type="number" maxLength="90" value={minBid} onChange={(e)=>setMinBid(e.target.value)} required/>
                &emsp;<b>$</b>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Country</h6>
              <div className='name-input-div'>
                <input placeholder='Set Country' id='buynow-input' type="text" maxLength="90" value={country} onChange={(e)=>setCountry(e.target.value)} required/>
              </div>
            </div>
            <div className='auction-row-location'>
              <h6 id='auction-row-title'><strong>*</strong>City</h6>
              <div className='name-input-div'>
                <div className='location-div-first'>
                  <input placeholder='Set City' id='location-input' type="text" maxLength="90" value={city} onChange={(e)=>setCity(e.target.value)} required/>
                </div>
              </div>
            </div>
            <br/>
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
              <button type='submit' className="create-button">Create Auction</button>
            </div>
          </div>
        </form>
      </div>
    )
}